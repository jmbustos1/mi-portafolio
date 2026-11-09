"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./icons";
import { useEffect, useState } from "react";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Mientras no estamos en el cliente, renderizamos un botón neutro (sin ícono dinámico)
    return (
      <button
        aria-label="Toggle theme"
        className="rounded-xs p-1 opacity-0 pointer-events-none"
      />
    );
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xs p-1 hover:bg-gray-200 dark:hover:bg-[#313131]"
    >
      {theme === "dark" ? (
        <span className="sun-icon">
          <SunIcon height={25} width={25} />
        </span>
      ) : (
        <span className="moon-icon">
          <MoonIcon height={25} width={25} />
        </span>
      )}
    </button>
  );
}
