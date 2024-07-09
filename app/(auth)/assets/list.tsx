'use client';

import {
  ArrowDownAZ,
  ArrowUpAZ,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from 'nuqs';
import { useEffect, useState } from 'react';

import { CustomCell } from '@/components/custom/custom-cell';
import { MultipleSelect } from '@/components/custom/multiple-select';
import Pagination from '@/components/custom/pagination';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  MobileCard,
  MobileCardActions,
  MobileCardContainer,
  MobileCardContent,
  MobileCardHeader,
  MobileCardStatus,
} from '@/components/ui/mobile-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  type Asset,
  type AssetSortField,
  assetSortFields,
} from '@/features/asset/asset.types';
import useGetAsset from '@/features/asset/useGetAsset';
import useGetAssets from '@/features/asset/useGetAssets';
import useGetCategories from '@/features/category/useGetCategories';
import { AssetState, Order } from '@/lib/@types/api';
import {
  AssetStateColors as colors,
  AssetStateOptions,
} from '@/lib/constants/asset';
import { PAGE_SIZE } from '@/lib/constants/pagination';
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';
import usePagination from '@/lib/hooks/usePagination';

import { ColorsBox } from '../components/colors-box';
import DeleteAssetDialog from '../components/delete-asset-dialog';
import DetailedAssetDialog from '../components/show-detailed-asset-dialog';

const columns = [
  { label: 'Asset Code', key: 'assetCode' },
  { label: 'Asset Name', key: 'name' },
  { label: 'Category', key: 'category' },
  { label: 'State', key: 'state' },
];

const ItemDropDownMenu = ({
  row,
  editLink,
  deleteClick,
}: {
  row: Asset;
  editLink: string;
  deleteClick: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          asChild
          disabled={row.state === AssetState.ASSIGNED}
        >
          <Link href={editLink}>
            <Pencil className="mr-4 size-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={row.state === AssetState.ASSIGNED}
          className="cursor-pointer"
          onClick={deleteClick}
        >
          <Trash2 className="mr-4 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function AssetList() {
  const isDesktop = useIsDesktop();
  const [newAssetId] = useQueryState(
    'newAssetId',
    parseAsInteger.withDefault(-1),
  );
  const { data: newAsset } = useGetAsset(newAssetId, { pinned: true });
  const statesParser = parseAsArrayOf(
    parseAsStringEnum<AssetState>(Object.values(AssetState)),
  );
  const [selectedAssetStates, setSelectedAssetStates] = useQueryState(
    'states',
    statesParser.withDefault([
      AssetState.ASSIGNED,
      AssetState.AVAILABLE,
      AssetState.NOT_AVAILABLE,
    ]),
  );
  const categoryIdsParser = parseAsArrayOf(parseAsString);
  const [selectedCategoryIds, setSelectedCategoryIds] = useQueryState(
    'categoryIds',
    categoryIdsParser.withDefault([] as string[]),
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletedAsset, setDeletedAsset] = useState<Asset | null>(null);
  const pagination = usePagination({
    sortFields: assetSortFields,
    defaultSortField: 'name',
    additionalParamsParsers: {
      states: statesParser,
      categoryIds: categoryIdsParser,
    },
  });
  const { page, searchValue, sortField, sortOrder } = pagination.metadata;
  const { handlePageChange, handleSearch, handleSortColumn, serialize } =
    pagination.handlers;
  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    if (searchValue === '') {
      setInputValue('');
    }
  }, [searchValue]);

  const getAssetsOptions = {
    page,
    take: isDesktop ? PAGE_SIZE : 5,
    search: searchValue,
    states: selectedAssetStates as string[],
    categoryIds: selectedCategoryIds,
    sortField,
    sortOrder,
  };

  const getAssetsQueryKey = serialize({ ...getAssetsOptions });

  const { data: assets, isPending } = useGetAssets(
    getAssetsOptions,
    getAssetsQueryKey,
    newAsset,
  );

  const { data: categories } = useGetCategories();

  const handleSetSelectedAssetStates = (selectedItems: string[]) => {
    setSelectedAssetStates(selectedItems as AssetState[]);
    handlePageChange(1);
  };

  const handleSetSelectedCategoryIds = (selectedItems: string[]) => {
    setSelectedCategoryIds(selectedItems);
    handlePageChange(1);
  };

  const handleOpenDialog = (assetId: number) => {
    setSelectedAssetId(assetId);
    setDialogOpen(true);
  };

  const handleDeleteDialog = (asset: Asset) => {
    setDeletedAsset(asset);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <MultipleSelect
            title="State"
            items={[
              {
                label: AssetStateOptions[AssetState.ASSIGNED],
                value: AssetState.ASSIGNED,
              },
              {
                label: AssetStateOptions[AssetState.AVAILABLE],
                value: AssetState.AVAILABLE,
              },
              {
                label: AssetStateOptions[AssetState.NOT_AVAILABLE],
                value: AssetState.NOT_AVAILABLE,
              },
              {
                label: AssetStateOptions[AssetState.WAITING_FOR_RECYCLING],
                value: AssetState.WAITING_FOR_RECYCLING,
              },
              {
                label: AssetStateOptions[AssetState.RECYCLED],
                value: AssetState.RECYCLED,
              },
            ]}
            selectedItems={selectedAssetStates as string[]}
            setSelectedItems={handleSetSelectedAssetStates}
          />
        </div>
        <div className="lg:col-span-1">
          <MultipleSelect
            title="Category"
            items={categories?.map((category) => ({
              label: category.name,
              value: category.id.toString(),
            }))}
            selectedItems={selectedCategoryIds as string[]}
            setSelectedItems={handleSetSelectedCategoryIds}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, asset code"
              className="rounded-md border pr-10"
              onChange={(e) => {
                setInputValue(e.target.value);
                handleSearch(e.target.value);
              }}
              value={inputValue}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-4 py-2"
              disabled
            >
              <Search className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <Button variant="default" className="lg:col-span-1" asChild>
          <Link href={`/assets/create${getAssetsQueryKey}`}>
            Create new asset
          </Link>
        </Button>
      </div>

      {!isDesktop && (
        <>
          <ColorsBox texts={AssetStateOptions} colors={colors} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {assets && assets.data.length > 0 ? (
              assets.data.map((row: Asset) => (
                <MobileCard
                  key={row.id}
                  onClick={() => handleOpenDialog(row.id)}
                >
                  <MobileCardActions>
                    <ItemDropDownMenu
                      row={row}
                      editLink={`/assets/${row.id}${getAssetsQueryKey}`}
                      deleteClick={() => handleDeleteDialog(row)}
                    />
                  </MobileCardActions>
                  <MobileCardStatus
                    color={colors[row.state]}
                    className="rounded-b-none"
                  />
                  <MobileCardContainer>
                    <MobileCardHeader>{row.assetCode}</MobileCardHeader>
                    <MobileCardContent>
                      <p>{row.category.name}</p>
                      <p>{row.name}</p>
                    </MobileCardContent>
                  </MobileCardContainer>
                </MobileCard>
              ))
            ) : (
              <div>{isPending ? 'Loading...' : 'No assets to display.'}</div>
            )}
          </div>
        </>
      )}

      <div className="hidden rounded-md border lg:block">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      handleSortColumn(column.key as AssetSortField)
                    }
                  >
                    {column.label}
                    {sortField === column.key &&
                      (sortOrder === Order.ASC ? (
                        <ArrowDownAZ className="ml-2 inline size-4" />
                      ) : (
                        <ArrowUpAZ className="ml-2 inline size-4" />
                      ))}
                  </Button>
                </TableHead>
              ))}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets && assets.data.length > 0 ? (
              assets.data.map((row: Asset) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleOpenDialog(row.id)}
                  data-state={row?.pinned && 'selected'}
                  className="cursor-pointer"
                >
                  <CustomCell value={row.assetCode} />
                  <CustomCell value={row.name} />
                  <CustomCell value={row.category.name} />
                  <CustomCell value={AssetStateOptions[row.state]} />
                  <TableCell className="py-2 pl-8">
                    <ItemDropDownMenu
                      row={row}
                      editLink={`/assets/${row.id}${getAssetsQueryKey}`}
                      deleteClick={() => handleDeleteDialog(row)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-2 text-center text-gray-400"
                >
                  No assets to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        totalPages={assets?.pagination.totalPages || 0}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      {selectedAssetId && (
        <DetailedAssetDialog
          isOpen={dialogOpen}
          onOpenChange={setDialogOpen}
          assetId={selectedAssetId}
        />
      )}

      {deletedAsset && (
        <DeleteAssetDialog
          asset={deletedAsset}
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </div>
  );
}
