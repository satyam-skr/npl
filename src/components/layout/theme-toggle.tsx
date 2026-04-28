"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button variant="outline" size="icon" aria-label="Toggle theme" onClick={() => setTheme(isDark ? "light" : "dark")}>
      <motion.span animate={{ rotate: isDark ? 360 : 0 }} transition={{ duration: 0.35 }}>
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.span>
    </Button>
  );
}
