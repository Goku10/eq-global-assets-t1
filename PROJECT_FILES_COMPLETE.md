# Complete Project Files for Equinor Assets Dashboard

Copy each section below into the corresponding file in your local project.

## package.json
```json
{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "deploy": "npm run build"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.57.4",
    "leaflet": "^1.9.4",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-leaflet": "^4.2.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/leaflet": "^1.9.12",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

## index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Interactive Geospatial Analytics Dashboard for Equinor Assets</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/eq-global-assets-t1/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

## tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

## tsconfig.app.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

## tsconfig.node.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

## eslint.config.js
```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
```

## src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## src/main.tsx
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## src/App.tsx
```typescript
import React from 'react';
import { Dashboard } from './components/Dashboard';

function App() {
  return <Dashboard />;
}

export default App;
```

## src/vite-env.d.ts
```typescript
/// <reference types="vite/client" />
```

## src/types/assets.ts
```typescript
export interface AssetCoordinates {
  latitude: number;
  longitude: number;
}

export interface AssetLocation {
  country: string;
  region: string;
  coordinates: AssetCoordinates;
  water_depth: string;
  nearby_cities: string;
}

export interface AssetBasicInfo {
  name: string;
  type: string;
  classification: string;
  production_type: string;
}

export interface AssetOperationalData {
  production_capacity: string;
  year_commissioned: number;
  current_status: string;
  development_phase: string;
  estimated_workforce: string;
}

export interface AssetOwnership {
  equinor_share: string;
  primary_contact: string;
}

export interface AssetEnvironmental {
  co2_emissions_intensity: string;
  certifications: string;
}

export interface Asset {
  asset_id: string;
  basic_info: AssetBasicInfo;
  location: AssetLocation;
  operational_data: AssetOperationalData;
  ownership: AssetOwnership;
  environmental: AssetEnvironmental;
  data_quality: string;
}

export interface AssetsSummaryStatistics {
  assets_by_country: Record<string, number>;
  assets_by_type: Record<string, number>;
  assets_by_status: Record<string, number>;
  production_types: Record<string, number>;
}

export interface AssetsMetadata {
  title: string;
  description: string;
  version: string;
  last_updated: string;
  total_assets: number;
  countries: number;
  asset_types: number;
  data_sources: string[];
}

export interface AssetsDatabase {
  metadata: AssetsMetadata;
  summary_statistics: AssetsSummaryStatistics;
  assets: Asset[];
}

export interface MarkerColors {
  [key: string]: string;
}
```

## src/utils/assetUtils.ts
```typescript
import { Asset, MarkerColors } from '../types/assets';

export const generateAssetTypeColors = (assets: Asset[]): MarkerColors => {
  const assetTypes = [...new Set(assets.map(asset => asset.basic_info.type))];
  
  // Predefined colors for common asset types
  const predefinedColors: Record<string, string> = {
    'Oil Field': '#dc2626', // Red
    'Gas Field': '#2563eb', // Blue
    'Offshore Wind Farm': '#16a34a', // Green
    'Solar Plant': '#eab308', // Yellow
    'Floating Wind Farm': '#059669', // Emerald
    'Gas Processing Plant': '#7c3aed', // Purple
    'Oil Terminal': '#ea580c', // Orange
    'LNG Terminal': '#0891b2', // Cyan
    'Refinery': '#be123c', // Rose
    'Methanol Plant': '#7c2d12', // Amber
    'Gas Project': '#4338ca', // Indigo
    'NGL Plant': '#9333ea', // Violet
    'Oil Development': '#c2410c', // Orange-red
    'Oil Platform': '#b91c1c', // Red-600
  };

  // Fallback colors for any additional types
  const fallbackColors = [
    '#f59e0b', '#10b981', '#f97316', '#06b6d4', '#8b5cf6',
    '#ef4444', '#14b8a6', '#f59e0b', '#3b82f6', '#84cc16'
  ];

  const colors: MarkerColors = {};
  let fallbackIndex = 0;

  assetTypes.forEach(type => {
    if (predefinedColors[type]) {
      colors[type] = predefinedColors[type];
    } else {
      colors[type] = fallbackColors[fallbackIndex % fallbackColors.length];
      fallbackIndex++;
    }
  });

  return colors;
};

export const filterAssets = (assets: Asset[], searchTerm: string, selectedCountry: string, selectedType: string): Asset[] => {
  return assets.filter(asset => {
    const matchesSearch = !searchTerm || 
      asset.basic_info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.basic_info.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.operational_data.current_status.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = !selectedCountry || asset.location.country === selectedCountry;
    const matchesType = !selectedType || asset.basic_info.type === selectedType;
    
    return matchesSearch && matchesCountry && matchesType;
  });
};

export const calculateStatistics = (assets: Asset[]) => {
  const countries = new Set(assets.map(asset => asset.location.country));
  const assetTypes = new Set(assets.map(asset => asset.basic_info.type));
  const operationalAssets = assets.filter(asset => 
    asset.operational_data.current_status === 'Operational'
  );

  return {
    totalAssets: assets.length,
    totalCountries: countries.size,
    totalAssetTypes: assetTypes.size,
    operationalAssets: operationalAssets.length,
  };
};
```

## src/components/Dashboard.tsx
```typescript
import React, { useState, useMemo } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Asset, AssetsDatabase } from '../types/assets';
import { generateAssetTypeColors, filterAssets } from '../utils/assetUtils';
import { SearchPanel } from './SearchPanel';
import { StatisticsPanel } from './StatisticsPanel';
import { AssetLegend } from './AssetLegend';
import { GeospatialMap } from './GeospatialMap';
import assetsData from '../data/equinor_assets_database.json';

export const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const database = assetsData as AssetsDatabase;
  const assets = database.assets;

  const assetTypeColors = useMemo(() => generateAssetTypeColors(assets), [assets]);

  const filteredAssets = useMemo(() => 
    filterAssets(assets, searchTerm, selectedCountry, selectedType),
    [assets, searchTerm, selectedCountry, selectedType]
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Globe className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{database.metadata.title}</h1>
            <p className="text-sm text-gray-600 hidden sm:block">{database.metadata.description}</p>
          </div>
        </div>
        <div className="text-sm text-gray-600 hidden md:block">
          Last updated: {database.metadata.last_updated}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:relative z-20 lg:z-0
          w-80 lg:w-96 bg-white shadow-lg lg:shadow-none
          h-full lg:h-auto flex-shrink-0
          border-r border-gray-200
        `}>
          <div className="p-6 h-full overflow-y-auto">
            <SearchPanel
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              assets={assets}
              filteredAssets={filteredAssets}
            />
            
            <AssetLegend assetTypeColors={assetTypeColors} />
            
            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Quick Stats</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Total Assets: {database.metadata.total_assets}</div>
                <div>Countries: {database.metadata.countries}</div>
                <div>Asset Types: {database.metadata.asset_types}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 bg-white border-b border-gray-200">
            <StatisticsPanel assets={assets} filteredAssets={filteredAssets} />
          </div>
          
          <div className="flex-1 p-6">
            <GeospatialMap
              assets={filteredAssets}
              assetTypeColors={assetTypeColors}
              selectedAsset={selectedAsset}
              setSelectedAsset={setSelectedAsset}
            />
          </div>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
```

## src/components/SearchPanel.tsx
```typescript
import React from 'react';
import { Search, MapPin, Factory, Filter } from 'lucide-react';
import { Asset } from '../types/assets';

interface SearchPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  assets: Asset[];
  filteredAssets: Asset[];
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedType,
  setSelectedType,
  assets,
  filteredAssets,
}) => {
  const countries = [...new Set(assets.map(asset => asset.location.country))].sort();
  const assetTypes = [...new Set(assets.map(asset => asset.basic_info.type))].sort();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
      </div>
      
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets, locations, countries..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Country Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Asset Type Filter */}
        <div className="relative">
          <Factory className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Asset Types</option>
            {assetTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Results Summary */}
        <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          Showing <span className="font-semibold text-blue-600">{filteredAssets.length}</span> of{' '}
          <span className="font-semibold">{assets.length}</span> assets
        </div>
      </div>
    </div>
  );
};
```

## src/components/StatisticsPanel.tsx
```typescript
import React from 'react';
import { BarChart3, Globe, Factory, Power } from 'lucide-react';
import { Asset } from '../types/assets';
import { calculateStatistics } from '../utils/assetUtils';

interface StatisticsPanelProps {
  assets: Asset[];
  filteredAssets: Asset[];
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ assets, filteredAssets }) => {
  const totalStats = calculateStatistics(assets);
  const filteredStats = calculateStatistics(filteredAssets);

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    filteredValue, 
    color 
  }: { 
    icon: React.ComponentType<any>, 
    title: string, 
    value: number, 
    filteredValue: number, 
    color: string 
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4" style={{ borderColor: color }}>
      <div className="flex items-center">
        <Icon className="h-8 w-8 mr-3" style={{ color }} />
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {filteredValue}
            {filteredValue !== value && (
              <span className="text-sm text-gray-500 font-normal ml-1">/ {value}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Asset Statistics</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Factory}
          title="Total Assets"
          value={totalStats.totalAssets}
          filteredValue={filteredStats.totalAssets}
          color="#dc2626"
        />
        <StatCard
          icon={Globe}
          title="Countries"
          value={totalStats.totalCountries}
          filteredValue={filteredStats.totalCountries}
          color="#2563eb"
        />
        <StatCard
          icon={BarChart3}
          title="Asset Types"
          value={totalStats.totalAssetTypes}
          filteredValue={filteredStats.totalAssetTypes}
          color="#16a34a"
        />
        <StatCard
          icon={Power}
          title="Operational"
          value={totalStats.operationalAssets}
          filteredValue={filteredStats.operationalAssets}
          color="#eab308"
        />
      </div>
    </div>
  );
};
```

## src/components/AssetLegend.tsx
```typescript
import React from 'react';
import { MarkerColors } from '../types/assets';
import { Layers } from 'lucide-react';

interface AssetLegendProps {
  assetTypeColors: MarkerColors;
}

export const AssetLegend: React.FC<AssetLegendProps> = ({ assetTypeColors }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Layers className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Asset Types Legend</h3>
      </div>
      
      <div className="space-y-2">
        {Object.entries(assetTypeColors).map(([type, color]) => (
          <div key={type} className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm mr-3 flex-shrink-0"
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-sm text-gray-700">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## src/components/GeospatialMap.tsx
```typescript
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ZoomControl, LayersControl } from 'react-leaflet';
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

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full rounded-lg"
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        
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
```

## src/components/AssetMarker.tsx
```typescript
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
```

## src/components/AssetDetailPanel.tsx
```typescript
import React from 'react';
import { X, MapPin, Factory, Calendar, Users, Zap, Award, Gauge } from 'lucide-react';
import { Asset } from '../types/assets';

interface AssetDetailPanelProps {
  asset: Asset | null;
  onClose: () => void;
  assetColor: string;
}

export const AssetDetailPanel: React.FC<AssetDetailPanelProps> = ({ asset, onClose, assetColor }) => {
  if (!asset) return null;

  const DetailRow = ({ icon: Icon, label, value }: { icon: React.ComponentType<any>, label: string, value: string }) => (
    <div className="flex items-start py-2">
      <Icon className="h-4 w-4 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <span className="text-sm font-medium text-gray-600">{label}:</span>
        <span className="text-sm text-gray-900 ml-2">{value}</span>
      </div>
    </div>
  );

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
          <div className="flex items-start">
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm mr-3 mt-0.5 flex-shrink-0"
              style={{ backgroundColor: assetColor }}
            ></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{asset.basic_info.name}</h2>
              <p className="text-sm text-gray-600">{asset.basic_info.type} • {asset.location.country}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <DetailRow icon={Factory} label="Asset Type" value={asset.basic_info.type} />
              <DetailRow icon={MapPin} label="Classification" value={asset.basic_info.classification} />
              <DetailRow icon={Zap} label="Production Type" value={asset.basic_info.production_type} />
              <div className="flex items-start py-2">
                <Gauge className="h-4 w-4 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(asset.operational_data.current_status)}`}>
                    {asset.operational_data.current_status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <DetailRow icon={MapPin} label="Country" value={asset.location.country} />
              <DetailRow icon={MapPin} label="Region" value={asset.location.region} />
              <DetailRow icon={MapPin} label="Coordinates" value={`${asset.location.coordinates.latitude}, ${asset.location.coordinates.longitude}`} />
              <DetailRow icon={MapPin} label="Water Depth" value={asset.location.water_depth} />
              <DetailRow icon={MapPin} label="Nearby Cities" value={asset.location.nearby_cities} />
            </div>
          </div>

          {/* Operational Data */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Operational Data</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <DetailRow icon={Gauge} label="Production Capacity" value={asset.operational_data.production_capacity} />
              <DetailRow icon={Calendar} label="Year Commissioned" value={asset.operational_data.year_commissioned.toString()} />
              <DetailRow icon={Factory} label="Development Phase" value={asset.operational_data.development_phase} />
              <DetailRow icon={Users} label="Estimated Workforce" value={asset.operational_data.estimated_workforce} />
            </div>
          </div>

          {/* Ownership & Environmental */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ownership</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <DetailRow icon={Factory} label="Equinor Share" value={asset.ownership.equinor_share} />
                <DetailRow icon={Users} label="Primary Contact" value={asset.ownership.primary_contact} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <DetailRow icon={Zap} label="CO2 Emissions" value={asset.environmental.co2_emissions_intensity} />
                <DetailRow icon={Award} label="Certifications" value={asset.environmental.certifications} />
              </div>
            </div>
          </div>

          {/* Data Quality */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Quality</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-gray-500 mr-3" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  asset.data_quality === 'High' ? 'bg-green-100 text-green-800' :
                  asset.data_quality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {asset.data_quality} Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Setup Pages
      uses: actions/configure-pages@v4

    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './dist'

    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false
```

## .gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## README.md
```markdown
# Interactive Geospatial Analytics Dashboard for Equinor Assets

A comprehensive dashboard for visualizing and analyzing Equinor's global asset portfolio with interactive mapping capabilities.

## Features

- **Interactive Map**: Visualize assets on multiple map layers (Satellite, Street, Topographic)
- **Advanced Filtering**: Search and filter by country, asset type, and keywords
- **Real-time Statistics**: Dynamic statistics panel showing asset counts and operational status
- **Detailed Asset Information**: Comprehensive asset details with operational data
- **Responsive Design**: Optimized for desktop and mobile devices
- **Asset Type Legend**: Color-coded visualization of different asset types

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Mapping**: Leaflet with React-Leaflet
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Goku10/eq-global-assets-t1.git
cd eq-global-assets-t1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. Every push to the `main` branch will trigger a new deployment.

### Manual Deployment

To deploy manually:

1. Build the project:
```bash
npm run build
```

2. The built files in the `dist/` directory can be deployed to any static hosting service.

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard component
│   ├── GeospatialMap.tsx # Map component
│   ├── AssetMarker.tsx  # Individual asset markers
│   ├── AssetDetailPanel.tsx # Asset detail modal
│   ├── SearchPanel.tsx  # Search and filter panel
│   ├── StatisticsPanel.tsx # Statistics display
│   └── AssetLegend.tsx  # Asset type legend
├── data/               # Asset database
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # CSS styles
```

## Asset Data Structure

The application uses a comprehensive asset database with the following structure:

- **Basic Information**: Name, type, classification, production type
- **Location Data**: Coordinates, country, region, water depth
- **Operational Data**: Capacity, commissioning year, status, development phase
- **Ownership**: Equinor share, primary contact
- **Environmental**: CO2 emissions, certifications
- **Data Quality**: Quality assessment metrics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Live Demo

Visit the live application: [https://goku10.github.io/eq-global-assets-t1/](https://goku10.github.io/eq-global-assets-t1/)
```

---

## Instructions for Setup

1. Create a new folder on your computer for the project
2. Copy each section above into the corresponding file path
3. You'll need to get the `src/data/equinor_assets_database.json` file separately (it's not shown in the file list but exists in the project)
4. Run `npm install` to install dependencies
5. Run `npm run dev` to start the development server
6. Push to your GitHub repository and enable GitHub Pages

The project is now ready for GitHub deployment with automatic GitHub Actions workflow!