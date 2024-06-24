'use client';

import { Check } from 'lucide-react';
import React from 'react';
import { useBoolean } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import useGetCategories from '@/features/category/useGetCategories';
import { cn } from '@/lib/utils';

import CreateCategoryForm from './create-category-form';

type Props = {
  fieldValue: string;
  onSelect: (value: string) => void;
};

function CategoryCommand({ fieldValue, onSelect }: Props) {
  const {
    value: isAddCategory,
    setTrue: openAddCategory,
    setFalse: closeAddCategory,
  } = useBoolean(false);
  const { data: categories, isPending } = useGetCategories();

  return (
    <Command
      filter={(value, search) => {
        const item = categories?.find(
          (category) => category.id === Number(value),
        );
        if (!item) return 0;
        if (
          item.name.includes(search) ||
          item.name.toLowerCase().includes(search) ||
          item.prefix.includes(search) ||
          item.prefix.toLowerCase().includes(search)
        )
          return 1;
        return 0;
      }}
    >
      <CommandInput placeholder="Search category..." />
      <CommandEmpty>
        {isPending ? 'Loading categories...' : 'No category found.'}
      </CommandEmpty>
      <CommandGroup>
        <CommandList>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <CommandItem
                value={category.id.toString()}
                key={category.prefix}
                onSelect={() => onSelect(category.id.toString())}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    'mr-2 size-4',
                    category.id.toString() === fieldValue
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                <span className="flex w-full items-center justify-between">
                  <span>{category.name}</span>
                  <span className="px-2 font-mono font-semibold">
                    {category.prefix}
                  </span>
                </span>
              </CommandItem>
            ))}
        </CommandList>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup>
        {isAddCategory ? (
          <CreateCategoryForm onClose={closeAddCategory} onSelect={onSelect} />
        ) : (
          <Button
            variant="link"
            size="sm"
            onClick={openAddCategory}
            className="w-full justify-start"
          >
            Add new category
          </Button>
        )}
      </CommandGroup>
    </Command>
  );
}

export default CategoryCommand;
