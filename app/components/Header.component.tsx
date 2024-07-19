import { Link } from "@remix-run/react";
import React, { useState } from "react";
import Logo from "~/components/Logo.component";
import ThemeSwitch from "~/components/ThemeSwitch.component";

type Props = {
  className?: string;
  navigation: {
    text: string;
    to: string;
    icon?: string;
  }[];
};

export default function Header({ className = "", navigation }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`z-40 h-16 flex flex-wrap lg:justify-center lg:flex-nowrap w-full bg-white shadow-sm border-b border-gray-200 dark:bg-zinc-900 dark:border-b-black/80 text-sm lg:py-4 ${className}`}
    >
      <nav
        className="relative w-full h-full lg:flex lg:items-center lg:justify-between"
        aria-label={"Global"}
      >
        <div className="px-4 landscape:pl-10 py-2 lg:py-0 flex items-center justify-between relative z-40 bg-white dark:bg-zinc-900">
          <Link
            className="text-xl font-semibold flex !text-gray-700"
            to="/"
            aria-label={"Logo"}
          >
            <Logo className="h-10 dark:fill-amber-50" />
          </Link>
          <div className="lg:hidden flex items-center justify-center gap-y-2">
            <ThemeSwitch />
            <button
              type="button"
              className="p-2 inline-flex justify-center items-center gap-2 rounded-md font-medium align-middle"
              aria-controls="navbar-collapse-with-animation"
              aria-label={"Toggle navigation"}
              onClick={() => setIsOpen(!isOpen)}
            >
              <i className="icon-menu text-2xl dark:text-amber-50" />
            </button>
          </div>
        </div>
        <div
          className={`grow overflow-x-auto flex flex-col lg:flex-row-reverse lg:items-center justify-between lg:gap-y-0  lg:mt-0 lg:pl-7
          bg-white dark:bg-gray-950/95 lg:bg-transparent dark:lg:bg-transparent 
           transition-transform transform duration-200 text-lg lg:text-sm
           dark:text-amber-50
          ${isOpen ? "" : "-translate-y-full"} lg:translate-y-0`}
        >
          <div className="hidden sm:flex p-4  landscape:px-10 lg:flex-row-reverse items-center justify-between lg:justify-start gap-x-2">
            <ThemeSwitch />
            <form method="GET" action="/@goker">
              <input
                name="search"
                placeholder="search"
                className="w-full px-4 py-1 border border-neutral-400 rounded-full outline-0 text-neutral-500"
              />
            </form>
          </div>
          <div className="flex flex-col lg:flex-row">
            {navigation.map(({ text, to, ...i }, k) => (
              <Link
                key={k}
                to={to}
                className="py-3 px-4 landscape:px-10 border-t border-black/10 dark:border-white/20 lg:border-0"
                onClick={() => setIsOpen(false)}
              >
                {i?.icon && <i className={i.icon} />}
                {text}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
