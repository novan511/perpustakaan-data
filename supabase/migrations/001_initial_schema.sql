-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  role text default 'user' check (role in ('admin', 'editor', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- CATEGORIES
-- ============================================
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  color text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;
create policy "Categories are viewable by everyone" on public.categories for select using (true);
create policy "Admins can manage categories" on public.categories for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- DATASETS
-- ============================================
create table public.datasets (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.categories on delete cascade,
  name text not null,
  slug text unique not null,
  source text,
  source_url text,
  unit text,
  description text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.datasets enable row level security;
create policy "Published datasets are viewable by everyone" on public.datasets for select using (is_published = true);
create policy "Admins can manage datasets" on public.datasets for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- DATA_POINTS (actual data values)
-- ============================================
create table public.data_points (
  id uuid default uuid_generate_v4() primary key,
  dataset_id uuid references public.datasets on delete cascade,
  period text not null,
  value numeric not null,
  label text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.data_points enable row level security;
create policy "Data points viewable when dataset is published" on public.data_points for select using (
  exists (select 1 from public.datasets where id = data_points.dataset_id and is_published = true)
);
create policy "Admins can manage data points" on public.data_points for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- QA_ITEMS (Tanya Data)
-- ============================================
create table public.qa_items (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  question text not null,
  answer text not null,
  category text not null,
  source text,
  source_url text,
  data_points jsonb default '[]'::jsonb,
  related_slugs text[] default '{}',
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.qa_items enable row level security;
create policy "Published QA items viewable by everyone" on public.qa_items for select using (is_published = true);
create policy "Admins can manage QA items" on public.qa_items for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- FUN_FACTS
-- ============================================
create table public.fun_facts (
  id uuid default uuid_generate_v4() primary key,
  headline text not null,
  summary text not null,
  detail text not null,
  source text,
  source_url text,
  category text,
  icon text,
  is_published boolean default false,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.fun_facts enable row level security;
create policy "Published fun facts viewable by everyone" on public.fun_facts for select using (is_published = true);
create policy "Admins can manage fun facts" on public.fun_facts for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- DOCUMENTS (PDF uploads)
-- ============================================
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  file_url text,
  file_path text,
  file_name text not null,
  file_size integer,
  category text,
  source text,
  source_url text,
  uploaded_by uuid references auth.users,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.documents enable row level security;
create policy "Documents viewable by everyone" on public.documents for select using (true);
create policy "Admins can manage documents" on public.documents for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Create storage bucket for PDFs
insert into storage.buckets (id, name, public) values ('documents', 'documents', true);

-- Storage policies
create policy "Documents are publicly accessible" on storage.objects for select using (bucket_id = 'documents');
create policy "Authenticated users can upload documents" on storage.objects for insert with check (bucket_id = 'documents' and auth.role() = 'authenticated');
create policy "Admins can delete documents" on storage.objects for delete using (bucket_id = 'documents' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
