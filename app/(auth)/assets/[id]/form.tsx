'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import type { Asset } from '@/features/asset/asset.types';
import useGetAsset from '@/features/asset/useGetAsset';
import useUpdateAsset from '@/features/asset/useUpdateAsset';
import useGetCategories from '@/features/category/useGetCategories';
import { AssetState } from '@/lib/@types/api';
import { AssetStateOptions } from '@/lib/constants/asset';
import { cn } from '@/lib/utils';
import { inputDateConvert } from '@/lib/utils/date';

import { editAssetSchema } from './schema';

type Props = {
  initialAsset: Asset;
};

function EditAssetForm({ initialAsset }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: asset, isPending: isAssetPending } = useGetAsset(
    initialAsset.id,
    {
      initialData: initialAsset,
    },
  );
  const { mutateAsync: updateAsset, isPending, isSuccess } = useUpdateAsset();
  const { data: categories } = useGetCategories();
  const form = useForm<z.infer<typeof editAssetSchema>>({
    resolver: zodResolver(editAssetSchema),
    mode: 'onChange',
    defaultValues: {
      ...initialAsset,
      category: initialAsset.category.id.toString(),
      installedDate: initialAsset.installedDate.toString(),
      state:
        initialAsset.state === AssetState.ASSIGNED
          ? undefined
          : (initialAsset.state as Exclude<AssetState, AssetState.ASSIGNED>),
      updatedAt: initialAsset.updatedAt.toString(),
    },
  });
  const isAbleToEdit = asset?.state !== AssetState.ASSIGNED;
  const isNotAbleToSave =
    !form.formState.isValid ||
    isAssetPending ||
    isPending ||
    isSuccess ||
    !isAbleToEdit;

  const nameValue = form.watch('name');
  const nameError = form.getFieldState('name').error;
  const specificationValue = form.watch('specification');
  const specificationError = form.getFieldState('specification').error;

  React.useEffect(() => {
    if (!nameError) return;
    if (!nameValue) {
      form.clearErrors('name');
    }
  }, [nameValue, form, nameError]);
  React.useEffect(() => {
    if (!specificationError) return;
    if (!specificationValue) {
      form.clearErrors('specification');
    }
  }, [specificationValue, form, specificationError]);

  async function onSubmit(values: z.infer<typeof editAssetSchema>) {
    const { assetCode, id: assetId } = await updateAsset({
      ...values,
      id: initialAsset.id,
      installedDate: new Date(values.installedDate),
    });
    toast({
      title: 'Edit Asset',
      description: `Successfully edited asset ${assetCode}`,
      variant: 'success',
    });
    router.push(`/assets?${searchParams.toString()}&newAssetId=${assetId}`);
  }

  React.useEffect(() => {
    if (!isAbleToEdit) {
      toast({
        title: 'Asset cannot be edited',
        description: 'The asset is currently assigned to an employee',
        variant: 'destructive',
      });
      router.push('/assets');
    }
  }, [isAbleToEdit, router]);

  React.useEffect(() => {
    form.trigger();
  }, [form]);

  if (!asset && !isAssetPending) {
    return <div>Asset not found</div>;
  }

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
                  {isAssetPending ? (
                    <Skeleton className="h-8 w-full rounded-md" />
                  ) : (
                    <Input
                      disabled={!isAbleToEdit}
                      autoFocus
                      {...field}
                      placeholder="Enter asset name"
                    />
                  )}
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
              <FormControl>
                {isAssetPending ? (
                  <Skeleton className="h-8 w-full rounded-md" />
                ) : (
                  <Button
                    id="open_category_list_btn"
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'w-full justify-between',
                      !field.value && 'text-muted-foreground',
                    )}
                    disabled
                  >
                    {field.value
                      ? categories?.find(
                          (category) => category.id.toString() === field.value,
                        )?.name
                      : 'No category'}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                )}
              </FormControl>
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
                  {isAssetPending ? (
                    <Skeleton className="h-48 w-full rounded-md" />
                  ) : (
                    <Textarea
                      className="min-h-48 resize-none"
                      disabled={!isAbleToEdit}
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="installedDate"
          render={({ field }) => {
            const value = inputDateConvert(field.value);
            return (
              <FormItem>
                <FormLabel>
                  <span className="required">Installed Date</span>
                </FormLabel>
                <div>
                  <FormControl>
                    {isAssetPending ? (
                      <Skeleton className="h-8 w-full rounded-md" />
                    ) : (
                      <Input
                        {...field}
                        disabled={!isAbleToEdit}
                        type="date"
                        className="block"
                        value={value}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
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
                  {isAssetPending ? (
                    <Skeleton className="h-24 w-48 rounded-md" />
                  ) : (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={!isAbleToEdit}
                    >
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={AssetState.AVAILABLE}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={AssetState.AVAILABLE}
                            checked={field.value === AssetState.AVAILABLE}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">
                          {AssetStateOptions[AssetState.AVAILABLE]}
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={AssetState.NOT_AVAILABLE}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={AssetState.NOT_AVAILABLE}
                            checked={field.value === AssetState.NOT_AVAILABLE}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">
                          {AssetStateOptions[AssetState.NOT_AVAILABLE]}
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={AssetState.WAITING_FOR_RECYCLING}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={AssetState.WAITING_FOR_RECYCLING}
                            checked={
                              field.value === AssetState.WAITING_FOR_RECYCLING
                            }
                          />
                        </FormControl>
                        <FormLabel className=" cursor-pointer font-normal">
                          {AssetStateOptions[AssetState.WAITING_FOR_RECYCLING]}
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={AssetState.RECYCLED}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={AssetState.RECYCLED}
                            checked={field.value === AssetState.RECYCLED}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">
                          {AssetStateOptions[AssetState.RECYCLED]}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  )}
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
            disabled={isNotAbleToSave}
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

export default EditAssetForm;
