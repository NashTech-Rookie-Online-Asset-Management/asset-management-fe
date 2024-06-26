'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
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
import useGetAsset from '@/features/asset/useGetAsset';
import useUpdateAsset from '@/features/asset/useUpdateAsset';
import useGetCategories from '@/features/category/useGetCategories';
import { AssetState } from '@/lib/@types/api';
import { AssetStateOptions } from '@/lib/constants/asset';
import { cn } from '@/lib/utils';

import { editAssetSchema } from './schema';

function EditAssetForm({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: asset, isPending: isAssetPending } = useGetAsset(Number(id));
  const { mutateAsync: updateAsset, isPending, isSuccess } = useUpdateAsset();
  const { data: categories } = useGetCategories();
  const form = useForm<z.infer<typeof editAssetSchema>>({
    resolver: zodResolver(editAssetSchema),
  });
  const isAbleToEdit = asset?.state !== AssetState.ASSIGNED;

  async function onSubmit(values: z.infer<typeof editAssetSchema>) {
    const { assetCode, id: assetId } = await updateAsset({
      ...values,
      id: Number(id),
      installedDate: new Date(values.installedDate),
    });
    toast({
      title: 'Edit Asset',
      description: `Successfully edited asset ${assetCode}`,
      variant: 'success',
    });
    router.push(`/assets?${searchParams.toString()}&newAssetId=${assetId}`);
  }

  useEffect(() => {
    if (!isAbleToEdit) {
      toast({
        title: 'Asset cannot be edited',
        description: 'The asset is currently assigned to an employee',
        variant: 'destructive',
      });
      router.push('/assets');
    }
  }, [isAbleToEdit, router]);

  useEffect(() => {
    if (!asset) return;
    form.reset({
      name: asset.name,
      specification: asset.specification,
      category: asset.category.id.toString(),
      installedDate: new Date(asset?.installedDate).toISOString().split('T')[0],
      state:
        asset.state === AssetState.ASSIGNED
          ? undefined
          : (asset.state as Exclude<AssetState, AssetState.ASSIGNED>),
    });
  }, [asset, form]);

  if (!asset && !isAssetPending) {
    return <div>Asset not found</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                    <Input disabled={!isAbleToEdit} autoFocus {...field} />
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
                      autoFocus
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
          render={({ field }) => (
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
                      disabled={!isAbleToEdit}
                      type="date"
                      className="block"
                      autoFocus
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
                        <FormLabel className="font-normal">
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
                        <FormLabel className="font-normal">
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
                        <FormLabel className="font-normal">
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
                        <FormLabel className="font-normal">
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
            disabled={isPending || isAssetPending || !isAbleToEdit || isSuccess}
          >
            Save
          </LoadingButton>
          <Button variant="secondary" asChild>
            <Link href="/assets">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditAssetForm;
