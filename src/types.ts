import { Moment } from "moment";

export type TechRadarEntry = {
  label: string;
  quadrant: number;
  ring: number;
  moved: number;
  active: boolean;
};

export type TechRadarHistory = {
  date: Moment;
  entries: TechRadarEntry[];
};

export type InputErrors = {
  [key: string]: boolean;
};

export type ComboBoxOption = {
  value: string;
  label: string;
};
