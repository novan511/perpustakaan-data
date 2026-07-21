export interface DataPoint {
  period: string;
  value: number;
  label?: string;
}

export interface KPIData {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
  source: string;
  description: string;
}

export interface SectorData {
  id: string;
  name: string;
  description: string;
  source: string;
  sourceUrl: string;
  kpis: KPIData[];
  chartData: DataPoint[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
  example?: string;
  category: string;
}
