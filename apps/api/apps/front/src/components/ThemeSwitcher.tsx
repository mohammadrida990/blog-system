"use client";

import { useTheme } from "@/app/context/ThemeProvider";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

type Props = {
  showOutline?: boolean;
};

export default function ThemeToggle({ showOutline = true }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(" rounded-full cursor-pointer w-8 h-8", {
        "outline-primary outline-2": showOutline,
        "text-black": !showOutline,
      })}
    >
      {theme === "dark" ? (
        <MoonIcon className="w-8 h-8 " />
      ) : (
        <SunIcon className="text-orange-500 w-8 h-8" />
      )}
    </button>
  );
}
