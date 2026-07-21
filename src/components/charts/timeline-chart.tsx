"use client";

import { motion } from "motion/react";

interface TimelineProps {
  events: Array<{ date: string; title: string; description: string; icon?: string }>;
  title: string;
}

export default function Timeline({ events, title }: TimelineProps) {
  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900" role="img" aria-label={title}>
      <h2 className="mb-8 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 sm:left-1/2 sm:-translate-x-px" />

        {events.map((event, i) => {
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={i}
              className={`relative mb-10 flex items-start ${
                isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
              } flex-row`}
              initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={`hidden sm:block sm:w-1/2 ${isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left"}`} />

              <div className="absolute left-4 z-10 -translate-x-1/2 sm:left-1/2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-500 shadow-md dark:border-gray-900">
                  {event.icon ? (
                    <span className="text-xs">{event.icon}</span>
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  )}
                </div>
              </div>

              <div className={`ml-12 flex-1 sm:ml-0 ${isLeft ? "sm:w-1/2 sm:pr-12 sm:text-right" : "sm:w-1/2 sm:pl-12 sm:text-left"}`}>
                <div
                  className={`rounded-xl bg-gray-50 p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800 ${
                    isLeft ? "sm:mr-0" : "sm:ml-0"
                  }`}
                >
                  <span className="mb-1 inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                    {event.date}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
