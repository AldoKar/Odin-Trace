import EarthPage from './EarthPage.tsx';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';

const initialState = 0;

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

export default function App() {
  const [viewMode, setViewMode] = React.useState<'countries' | 'cities'>(
    'cities'
  );

  const [selectedDataset, setSelectedDataset] = React.useState(
    '/data/traffic_with_coordinates.json'
  );

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const earthTextureUrl = state === 67 ? '/THE BIG STAINN.webp' : undefined;

  React.useEffect(() => {
    if (viewMode === 'cities') {
      setSelectedDataset('/data/traffic_with_coordinates.json');
    } else {
      setSelectedDataset('/data/traffic_by_country_with_coords.json');
    }
  }, [viewMode]);

  useEffect(() => {
    if (state == 67) {
      toast.loading('Wey LA CAGASTE BRO, DESINSTALANDO WINDOWS 11...');
    }
  }, [state]);
  return (
    <div className="min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-7xl flex flex-col items-center gap-4">
        {/* Controles centrados */}
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/60 px-3 py-2 shadow-lg">
          <Button
            variant={viewMode === 'cities' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('cities')}
            className="px-4 sm:px-6 text-xs sm:text-sm"
          >
            Cities
          </Button>
          <Button
            variant={viewMode === 'countries' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('countries')}
            className="px-4 sm:px-6 text-xs sm:text-sm"
          >
            Countries
          </Button>
        </div>
        <div className="w-full h-[75vh] sm:h-[80vh] rounded-2xl border border-white/10 bg-black/60 shadow-lg">
          <EarthPage
            selectedDataset={selectedDataset}
            earthTextureUrl={earthTextureUrl}
          />
        </div>
        <h1 className="text-white"> {state}</h1>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="text-xs sm:text-sm text-white/60 hover:text-white"
            onClick={() => dispatch({ type: 'decrement' })}
          >
            (Click to decrement)
          </Button>
          <Button
            size="sm"
            className="text-xs sm:text-sm text-white/60 hover:text-white"
            onClick={() => dispatch({ type: 'increment' })}
          >
            (Click to increment)
          </Button>
        </div>
        {state == 10 && (
          <span className="text-purple-800 text-xl sm:text-sm font-bold">
            Bro eres una maquina crack mastodonte dios supremo maximo YEIPI
            HESUCNDICDNCIDCIN DIGNO DEL DIOS VETSIFY
          </span>
        )}
      </div>
      <div className="grid grid-cols-5 grid-rows-5 gap-4 border border-white/10 p-4 rounded-lg mt-6 max-w-md text-white">
        <div className="col-span-2 row-span-2 border border-white/10 rounded-lg justify-content-center">
          1
        </div>
        <div className="col-span-2 row-span-2 col-start-3 border border-white/10 rounded-lg">
          2
        </div>
        <div className="row-span-5 col-start-5 border border-white/10 rounded-lg">
          3
        </div>
        <div className="col-span-2 row-span-3 row-start-3 border border-white/10 rounded-lg">
          4
        </div>
        <div className="col-span-2 row-span-2 col-start-3 row-start-3 border border-white/10 rounded-lg">
          5
        </div>
        <div className="col-span-2 col-start-3 row-start-5 border border-white/10 rounded-lg">
          6
        </div>
      </div>
    </div>
  );
}
