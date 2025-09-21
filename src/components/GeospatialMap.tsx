import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, LayersControl, useMapEvents } from 'react-leaflet';
import { Asset, MarkerColors } from '../types/assets';
import { AssetMarker } from './AssetMarker';
import { AssetDetailPanel } from './AssetDetailPanel';
import 'leaflet/dist/leaflet.css';

interface GeospatialMapProps {
  assets: Asset[];
  assetTypeColors: MarkerColors;
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
}

export const GeospatialMap: React.FC<GeospatialMapProps> = ({
  assets,
  assetTypeColors,
  selectedAsset,
  setSelectedAsset,
}) => {
  const [mapCenter] = useState<[number, number]>([60, 5]); // Center on Norway
  const [mapZoom] = useState<number>(4);

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleCloseDetail = () => {
    setSelectedAsset(null);
  };

  // Component to handle map clicks (close detail panel when clicking on empty space)
  const MapClickHandler = () => {
    useMapEvents({
      click: () => {
        if (selectedAsset) {
          setSelectedAsset(null);
        }
      },
    });
    return null;
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full rounded-lg"
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <MapClickHandler />
        
        <LayersControl position="topleft">
          <LayersControl.BaseLayer checked name="ESRI Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              maxZoom={19}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="ESRI Streets">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="ESRI Topographic">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {assets.map((asset) => (
          <AssetMarker
            key={asset.asset_id}
            asset={asset}
            color={assetTypeColors[asset.basic_info.type] || '#666666'}
            onAssetClick={handleAssetClick}
          />
        ))}
      </MapContainer>

      {selectedAsset && (
        <AssetDetailPanel
          asset={selectedAsset}
          onClose={handleCloseDetail}
          assetColor={assetTypeColors[selectedAsset.basic_info.type] || '#666666'}
        />
      )}
    </div>
  );
};