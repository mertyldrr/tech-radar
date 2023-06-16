import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TechRadarEntry } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildConfig(entries: TechRadarEntry[], darkMode?: boolean) {
  return {
    svg_id: "radar",
    width: 1450,
    height: 900,
    colors: {
      background: `${darkMode ? "#262626" : "#fff"}`,
      grid: `${darkMode ? "#fff" : "#000"}`,
      inactive: `${darkMode ? "#fff" : "#000"}`,
    },
    title: "BMW Tech Radar",
    date: "2023.06",
    quadrants: [
      { name: "Languages" },
      { name: "Infrastructure" },
      { name: "Datastores" },
      { name: "Data Management" },
    ],
    rings: [
      { name: "ADOPT", color: `${darkMode ? "#CDF0EA" : "#5ba300"}` },
      { name: "TRIAL", color: `${darkMode ? "#F9F9F9" : "#009eb0"}` },
      { name: "ASSESS", color: `${darkMode ? "#F7DBF0" : "#c7ba00"}` },
      { name: "HOLD", color: `${darkMode ? "#BEAEE2" : "#e09b96"}` },
    ],
    print_layout: true,
    links_in_new_tabs: true,
    entries: entries,
    darkMode: darkMode,
  };
}
