import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Asset } from '../types/assets';

interface AssetMarkerProps {
  asset: Asset;
  color: string;
  onAssetClick: (asset: Asset) => void;
}

export const AssetMarker: React.FC<AssetMarkerProps> = ({ asset, color, onAssetClick }) => {
  const createCustomIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.2s ease;
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'under development': return 'bg-blue-100 text-blue-800';
      case 'under construction': return 'bg-yellow-100 text-yellow-800';
      case 'decommissioned': return 'bg-gray-100 text-gray-800';
      case 'pre-construction': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Marker
      position={[asset.location.coordinates.latitude, asset.location.coordinates.longitude]}
      icon={createCustomIcon(color)}
      eventHandlers={{
        click: () => onAssetClick(asset),
      }}
    >
      <Popup className="custom-popup" maxWidth={400}>
        <div className="p-4 max-w-sm">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 pr-2">{asset.basic_info.name}</h3>
            <span 
              className="inline-block w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0"
              style={{ backgroundColor: color }}
            ></span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Type:</span>
              <span className="text-gray-900">{asset.basic_info.type}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Location:</span>
              <span className="text-gray-900">{asset.location.country}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(asset.operational_data.current_status)}`}>
                {asset.operational_data.current_status}
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Capacity:</span>
              <span className="text-gray-900">{asset.operational_data.production_capacity}</span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Year:</span>
              <span className="text-gray-900">{asset.operational_data.year_commissioned}</span>
            </div>

            <div className="flex items-center">
              <span className="font-medium text-gray-600 w-20">Share:</span>
              <span className="text-gray-900">{asset.ownership.equinor_share}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              <strong>Region:</strong> {asset.location.region}
            </p>
            {asset.location.nearby_cities && (
              <p className="text-xs text-gray-600 mt-1">
                <strong>Nearby:</strong> {asset.location.nearby_cities}
              </p>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};