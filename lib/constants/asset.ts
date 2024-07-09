import { AssetState } from '../@types/api';

export const AssetStateOptions = {
  [AssetState.AVAILABLE]: 'Available',
  [AssetState.NOT_AVAILABLE]: 'Not Available',
  [AssetState.ASSIGNED]: 'Assigned',
  [AssetState.WAITING_FOR_RECYCLING]: 'Waiting for recycling',
  [AssetState.RECYCLED]: 'Recycled',
};

export const AssetStateColors = {
  [AssetState.AVAILABLE]: 'bg-green-500',
  [AssetState.NOT_AVAILABLE]: 'bg-red-500',
  [AssetState.ASSIGNED]: 'bg-yellow-500',
  [AssetState.WAITING_FOR_RECYCLING]: 'bg-orange-500',
  [AssetState.RECYCLED]: 'bg-blue-500',
};
