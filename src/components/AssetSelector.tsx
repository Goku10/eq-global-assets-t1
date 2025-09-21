import React from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Asset } from '../types/assets';

interface AssetSelectorProps {
  assets: Asset[];
  selectedAsset: string;
  onAssetSelect: (assetId: string) => void;
}

export const AssetSelector: React.FC<AssetSelectorProps> = ({
  assets,
  selectedAsset,
  onAssetSelect,
}) => {
  const sortedAssets = [...assets].sort((a, b) => 
    a.basic_info.name.localeCompare(b.basic_info.name)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center mb-3">
        <MapPin className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Navigate to Asset</h3>
      </div>
      
      <div className="relative">
        <select
          className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-900"
          value={selectedAsset}
          onChange={(e) => onAssetSelect(e.target.value)}
        >
          <option value="">Select an asset to view on map...</option>
          {sortedAssets.map(asset => (
            <option key={asset.asset_id} value={asset.asset_id}>
              {asset.basic_info.name} ({asset.basic_info.type}) - {asset.location.country}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
      
      {selectedAsset && (
        <div className="mt-3 text-sm text-gray-600 bg-blue-50 rounded-lg p-3">
          <span className="font-medium text-blue-800">Selected:</span> {
            assets.find(a => a.asset_id === selectedAsset)?.basic_info.name
          }
        </div>
      )}
    </div>
  );
};