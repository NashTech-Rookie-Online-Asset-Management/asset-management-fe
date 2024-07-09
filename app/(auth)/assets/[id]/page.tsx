import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import assetApi from '@/features/asset/asset.service';
import { AssetState } from '@/lib/@types/api';
import CookieKeys from '@/lib/constants/cookieKeys';

import EditAssetForm from './form';

export const metadata = {
  title: 'Edit Asset',
};

export const dynamic = 'force-dynamic';

async function getAsset(id: number) {
  const accessToken = cookies().get(CookieKeys.ACCESS_TOKEN)?.value!;
  assetApi.setBearerToken(accessToken).useServer();

  try {
    const asset = await assetApi.getAsset(id);
    if (asset.state === AssetState.ASSIGNED) {
      throw new Error();
    }
    return asset;
  } catch (error) {
    return redirect('/assets');
  }
}

async function EditAssetPage({ params }: { params: { id: string } }) {
  const asset = await getAsset(Number(params.id));

  return (
    <div className="w-full max-w-xl py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">Edit Asset</h3>
      <EditAssetForm initialAsset={asset} />
    </div>
  );
}

export default EditAssetPage;
