"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggler } from "./theme-toggle";
import React from "react";

const navItems = {
  "/": {
    name: "home",
  },
  "#experience": {
    name: "experience",
  },
  "/blog": {
    name: "blog",
  },
  "/projects": {
    name: "projects",
  },
};

export function Header() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <header className="mb-10 tracking-tight mt-10">
      <div className=" lg:sticky lg:top-20">
        <>
          <nav
            className="fade relative scroll-pr-6  px-0 pb-0 md:relative md:overflow-auto"
            id="nav"
          >
            <div className="flex w-full flex-row justify-between items-center">
              <div className="flex flex-row justify-between">
                {Object.entries(navItems).map(([path, { name }]) => {
                  const isHashLink = path.startsWith("#");
                  const isActive = !isHashLink && path === pathname;
                  return (
                    <Link
                      key={path}
                      href={path}
                      scroll={isHashLink ? true : undefined} // evita cambiar de página
                      className={cn(
                        "flex align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200",
                        !isActive && "text-neutral-500",
                      )}
                    >
                      <span className="relative px-2 py-1">{name}</span>
                    </Link>
                  );
                })}
              </div>

              <div>
                <ThemeToggler />
              </div>
            </div>
          </nav>
        </>
      </div>
    </header>
  );
}
