// ... imports
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Earth from './Earth';
import { loadSimpleMarkers } from './simpleMarkers';
import type { MarkerData } from './simpleMarkers';

// ... (props definition remains similar)
type HomePageProps = {
  selectedDataset?: string;
  earthTextureUrl?: string;
};

const EarthPage: React.FC<HomePageProps> = ({
  selectedDataset: propSelectedDataset,
  earthTextureUrl,
}) => {
  const [selectedDataset, setSelectedDataset] = React.useState(
    propSelectedDataset || '/data/traffic_with_coordinates.json'
  );

  // CHANGED: markers state is now MarkerData[]
  const [markers, setMarkers] = React.useState<MarkerData[] | null>(null);
  const [_loadingMarkers, setLoadingMarkers] = React.useState(false);
  const [_markersError, setMarkersError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (propSelectedDataset) {
      setSelectedDataset(propSelectedDataset);
    }
  }, [propSelectedDataset]);

  React.useEffect(() => {
    let cancelled = false;

    setMarkers(null);
    setMarkersError(null);
    setLoadingMarkers(true);

    // CHANGED: loadSimpleMarkers now returns Promise<MarkerData[]>
    loadSimpleMarkers(selectedDataset, 1)
      .then((data) => {
        console.log('Marcadores cargados:', data && data.length);
        if (!cancelled) {
          setMarkers(data);
        }
      })
      .catch((err) => {
        console.error('Problema cargando marcadores:', err);
        if (!cancelled) {
          setMarkers([]);
          setMarkersError(String(err));
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingMarkers(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDataset]);

  return (
    <Suspense fallback={null}>
      <div
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          display: 'flex',
          background: 'black',
          overflow: 'hidden',
        }}
      >
        <Canvas style={{ width: '100%', height: '100%' }}>
          <Suspense fallback={null}>
            <Earth
              markers={markers ?? []} // CHANGED: Passing plain data
              earthTextureUrl={earthTextureUrl}
            />
          </Suspense>
        </Canvas>
      </div>
    </Suspense>
  );
};

export default EarthPage;
