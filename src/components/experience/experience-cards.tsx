import React from "react";

interface ExperienceCardProps {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string[];
}

export function ExperienceCard({
  company,
  role,
  start,
  end,
  description,
}: ExperienceCardProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold">
        {role} @ {company}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {start} — {end}
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
        {description.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
