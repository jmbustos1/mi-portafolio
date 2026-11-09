import Image from "next/image";
import { Code2 } from "lucide-react";
import { Experience, PRESENT } from "@/app/data/experience";

function CompanyLogo({ company, logo }: Pick<Experience, "company" | "logo">) {
  return (
    <div className="flex h-11 w-11 flex-none items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700">
      {logo ? (
        <Image
          src={logo}
          alt={`${company} logo`}
          width={44}
          height={44}
          className="h-full w-full object-contain p-1"
        />
      ) : (
        <Code2 aria-hidden className="h-5 w-5 text-zinc-600" />
      )}
    </div>
  );
}

export function ExperienceCard({
  company,
  tagline,
  location,
  url,
  logo,
  roles,
}: Experience) {
  return (
    <article className="relative flex gap-4 pb-10 group-last:pb-0">
      {/* Línea de tiempo: une el logo con la siguiente empresa. */}
      <div
        aria-hidden
        className="absolute bottom-0 left-[21px] top-12 w-px bg-zinc-200 group-last:hidden dark:bg-zinc-800"
      />
      <CompanyLogo company={company} logo={logo} />

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold leading-tight">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {company}
            </a>
          ) : (
            company
          )}
        </h3>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          {tagline} <span className="whitespace-nowrap">· {location}</span>
        </p>

        <div className="mt-4 space-y-6">
          {roles.map((role) => (
            <section key={`${role.title}-${role.start}`}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h4 className="font-medium">{role.title}</h4>
                <p className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  {role.end === PRESENT && (
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full bg-emerald-500"
                    />
                  )}
                  {role.start} — {role.end}
                </p>
              </div>

              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-gray-700 marker:text-zinc-400 dark:text-gray-300">
                {role.description.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              {role.tech && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {role.tech.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
