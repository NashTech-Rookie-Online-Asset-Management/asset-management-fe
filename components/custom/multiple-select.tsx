'use client';

import { Filter } from 'lucide-react';
import React from 'react';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Command, CommandGroup, CommandList } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface Item {
  value: string;
  label: string;
}

interface MultipleSelectProps {
  title?: string;
  items?: Item[];
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}

export function MultipleSelect({
  title = 'Select items',
  items,
  selectedItems,
  setSelectedItems,
}: MultipleSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleCheckboxChange = (value: string) => {
    const newSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    setSelectedItems(newSelectedItems);
  };

  const handleSelectAllChange = () => {
    if (items && selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items?.map((item) => item.value) || []);
    }
  };

  const allSelected = items && selectedItems.length === items.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedItems.length === 0
            ? title
            : `${selectedItems.length} ${title.toLowerCase()} selected`}

          <Filter className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popover-content-width-full max-h-80 overflow-y-auto p-0">
        <Command>
          {items && items.length > 0 ? (
            <CommandList>
              <CommandGroup>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-2"
                  onClick={handleSelectAllChange}
                >
                  <Checkbox
                    id="select-all"
                    checked={allSelected}
                    onCheckedChange={handleSelectAllChange}
                  />
                  All
                </Button>
              </CommandGroup>

              {items.map((item) => (
                <CommandGroup key={item.value}>
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-2"
                    onClick={() => handleCheckboxChange(item.value)}
                  >
                    <Checkbox checked={selectedItems.includes(item.value)} />
                    {item.label}
                  </Button>
                </CommandGroup>
              ))}
            </CommandList>
          ) : (
            <div className="p-4 text-center text-xs text-gray-400">
              No {title.toLowerCase()} to display.
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
