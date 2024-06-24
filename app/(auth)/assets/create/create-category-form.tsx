'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, LoaderCircle, X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { LoadingButton } from '@/components/custom/loading-button';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import useCreateCategory from '@/features/category/useCreateCategory';
import useGetCategories from '@/features/category/useGetCategories';

import { createNewCategorySchema } from './schema';

type Props = { onClose: () => void; onSelect: (value: string) => void };

function CreateCategoryForm({ onClose, onSelect }: Props) {
  const { refetch: refetchCategories } = useGetCategories();
  const { mutateAsync: createCategory, isPending } = useCreateCategory();
  const form = useForm<z.infer<typeof createNewCategorySchema>>({
    resolver: zodResolver(createNewCategorySchema),
  });

  async function onSubmit(values: z.infer<typeof createNewCategorySchema>) {
    const createdCategory = await createCategory(values);
    toast({
      title: 'Category created',
      description: `Category ${createdCategory.name} has been created successfully.`,
      variant: 'success',
    });
    refetchCategories();
    onSelect(createdCategory.id.toString());
    form.reset();
    onClose();
  }

  return (
    <Form {...form}>
      <div className="flex max-w-xs items-center justify-center space-x-2">
        <div className="flex items-center space-x-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Bluetooth Mouse" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prefix"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="max-w-[64px]"
                      placeholder="BM"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .replaceAll(/[^A-Za-z]/g, '')
                            .slice(0, 2)
                            .toUpperCase(),
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex items-center space-x-1">
          <LoadingButton
            onClick={form.handleSubmit(onSubmit)}
            variant="ghost"
            size="icon"
            isLoading={isPending}
            disabled={!form.formState.isValid}
            loadingHolder={
              <LoaderCircle className="animate-spin text-primary" />
            }
          >
            <Check className="text-primary" />
          </LoadingButton>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            disabled={isPending}
          >
            <X />
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default CreateCategoryForm;
