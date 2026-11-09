import {
  Bot,
  Boxes,
  Cloud,
  Cpu,
  Film,
  Gamepad2,
  Network,
  NotebookPen,
  Radio,
  Rocket,
  Server,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Lista cerrada: el bundle solo incluye estos íconos. Se eligen en el frontmatter (`icon`).
const BLOG_ICONS: Record<string, LucideIcon> = {
  bot: Bot,
  boxes: Boxes,
  cloud: Cloud,
  cpu: Cpu,
  film: Film,
  gamepad: Gamepad2,
  network: Network,
  radio: Radio,
  rocket: Rocket,
  server: Server,
  terminal: Terminal,
};

export function BlogIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && BLOG_ICONS[name]) || NotebookPen;

  return (
    <div
      className={cn(
        "flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200 transition-colors dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700",
        className,
      )}
    >
      <Icon aria-hidden className="h-5 w-5" />
    </div>
  );
}

export function BlogTags({ tags, className }: { tags?: string[]; className?: string }) {
  if (!tags?.length) return null;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
