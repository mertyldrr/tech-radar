import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ComboBoxVariant } from "../enums";
import { ComboBoxOption } from "../types";

type Props = {
  value: string;
  variant: ComboBoxVariant;
  onChange: (value: string) => void;
};

export function Combobox({ value, variant, onChange }: Props) {
  const [open, setOpen] = useState(false);
  let options: ComboBoxOption[] = [];
  let defaultLabel = "";
  if (variant === ComboBoxVariant.Quadrant) {
    options = [
      { value: "0", label: "0" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ];
    defaultLabel = "Select quadrant";
  } else if (variant === ComboBoxVariant.Ring) {
    options = [
      { value: "0", label: "0" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ];
    defaultLabel = "Select ring";
  } else if (variant === ComboBoxVariant.Active) {
    options = [
      { value: "true", label: "true" },
      { value: "false", label: "false" },
    ];
    defaultLabel = "Select active";
  } else if (variant === ComboBoxVariant.Moved) {
    options = [
      { value: "-1", label: "-1" },
      { value: "0", label: "0" },
      { value: "1", label: "1" },
    ];
    defaultLabel = "Select moved";
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : defaultLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput />
          <CommandEmpty>{`No ${variant} value found`}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
