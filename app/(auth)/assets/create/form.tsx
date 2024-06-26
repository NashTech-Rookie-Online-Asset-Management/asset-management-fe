'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean, useOnClickOutside } from 'usehooks-ts';
import type { z } from 'zod';

import { LoadingButton } from '@/components/custom/loading-button';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import type { CreateAssetRequest } from '@/features/asset/asset.types';
import useCreateAsset from '@/features/asset/useCreateAsset';
import useGetCategories from '@/features/category/useGetCategories';
import { AssetState } from '@/lib/@types/api';
import { AssetStateOptions } from '@/lib/constants/asset';
import { cn } from '@/lib/utils';

import CategoryCommand from './category-command';
import { createNewAssetSchema } from './schema';

function CreateAssetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryRef = React.useRef<HTMLDivElement>(null);
  const { mutateAsync: createAsset, isPending } = useCreateAsset();
  const { data: categories } = useGetCategories();
  const {
    value: isCategoryOpen,
    setFalse: closeCategory,
    toggle: toggleCategory,
  } = useBoolean(false);
  const form = useForm<z.infer<typeof createNewAssetSchema>>({
    resolver: zodResolver(createNewAssetSchema),
    defaultValues: {
      state: AssetState.AVAILABLE,
    },
  });

  async function onSubmit({
    category,
    installedDate,
    ...values
  }: z.infer<typeof createNewAssetSchema>) {
    const data: CreateAssetRequest = {
      categoryId: parseInt(category, 10),
      installedDate: new Date(installedDate),
      ...values,
    };
    const { id } = await createAsset(data);
    router.push(`/assets?${searchParams.toString()}&newAssetId=${id}`);
  }

  useOnClickOutside(categoryRef, closeCategory);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="required">Name</span>
              </FormLabel>
              <div>
                <FormControl>
                  <Input autoFocus {...field} placeholder="Enter asset name" />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="required">Category</span>
              </FormLabel>
              <Popover open={isCategoryOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="open_category_list_btn"
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                      onClick={toggleCategory}
                    >
                      {field.value
                        ? categories?.find(
                            (category) =>
                              category.id.toString() === field.value,
                          )?.name
                        : 'Select category'}
                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="popover-content-width-full p-0"
                  id="category_list"
                  ref={categoryRef}
                >
                  <CategoryCommand
                    fieldValue={field.value}
                    onSelect={(value: string) => {
                      form.setValue('category', value);
                      closeCategory();
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="required">Specification</span>
              </FormLabel>
              <div>
                <FormControl>
                  <Textarea
                    autoFocus
                    className="min-h-48 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="installedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="required">Installed Date</span>
              </FormLabel>
              <div>
                <FormControl>
                  <Input type="date" className="block" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="required">State</span>
              </FormLabel>
              <div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {createNewAssetSchema.shape.state.options.map((option) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={option}
                      >
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">
                          {AssetStateOptions[option]}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="mt-2 flex w-full justify-end space-x-2">
          <LoadingButton
            type="submit"
            isLoading={isPending}
            disabled={!form.formState.isValid}
          >
            Save
          </LoadingButton>
          <Button variant="secondary" asChild>
            <Link href={`/assets?${searchParams.toString()}`}>Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateAssetForm;
