import React from 'react';
import { Marker } from 'react-leaflet';
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

  return (
    <Marker
      position={[asset.location.coordinates.latitude, asset.location.coordinates.longitude]}
      icon={createCustomIcon(color)}
      eventHandlers={{
        click: () => onAssetClick(asset),
      }}

    />
  );
};