import { Suspense, useEffect, useState } from "react";
import { Globe, Building2, MapPin, Loader2 } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import Earth from "../Earth";
import { loadSimpleMarkers } from "../simpleMarkers";
import type { MarkerData } from "../simpleMarkers";

type ViewMode = "cities" | "countries";

const DATASETS: Record<ViewMode, string> = {
  cities: "/data/traffic_with_coordinates.json",
  countries: "/data/traffic_by_country_with_coords.json",
};

export default function Map3DPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("cities");
  const [markers, setMarkers] = useState<MarkerData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setMarkers(null);
    setError(null);
    setLoading(true);

    loadSimpleMarkers(DATASETS[viewMode], 1)
      .then((data) => {
        if (!cancelled) setMarkers(data);
      })
      .catch((err) => {
        console.error("Error loading markers:", err);
        if (!cancelled) {
          setMarkers([]);
          setError(String(err));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [viewMode]);

  const markerCount = markers?.length ?? 0;

  return (
    <>
      {/* Page Header */}
      <div className="mb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <Globe size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-semibold tracking-tight text-text-primary">
                3D Threat Globe
              </h1>
              <p className="text-sm text-text-tertiary">
                Real-time geospatial threat visualization
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-surface-card/80 p-1 backdrop-blur-sm">
            <button
              id="toggle-cities"
              onClick={() => setViewMode("cities")}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                viewMode === "cities"
                  ? "bg-blue-500/15 text-blue-400 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)]"
                  : "text-text-tertiary hover:text-text-secondary"
              }`}
            >
              <Building2 size={14} />
              Cities
            </button>
            <button
              id="toggle-countries"
              onClick={() => setViewMode("countries")}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                viewMode === "countries"
                  ? "bg-blue-500/15 text-blue-400 shadow-[inset_0_0_12px_rgba(59,130,246,0.1)]"
                  : "text-text-tertiary hover:text-text-secondary"
              }`}
            >
              <MapPin size={14} />
              Countries
            </button>
          </div>
        </div>
      </div>

      {/* Globe Container */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black shadow-[0_0_60px_-12px_rgba(59,130,246,0.15)]">
        {/* Canvas */}
        <div className="h-[55vh] sm:h-[65vh] lg:h-[72vh] w-full">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 size={28} className="animate-spin text-blue-400" />
                  <span className="text-xs text-text-tertiary font-mono">
                    Loading globe…
                  </span>
                </div>
              </div>
            }
          >
            <Canvas style={{ width: "100%", height: "100%" }}>
              <Suspense fallback={null}>
                <Earth markers={markers ?? []} />
              </Suspense>
            </Canvas>
          </Suspense>
        </div>

        {/* Overlay: Status bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/[0.06] bg-black/70 px-4 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400">LIVE</span>
          </div>

          <div className="flex items-center gap-4">
            {loading && (
              <div className="flex items-center gap-1.5">
                <Loader2 size={12} className="animate-spin text-blue-400" />
                <span className="text-[11px] font-mono text-text-tertiary">
                  Loading…
                </span>
              </div>
            )}
            {error && (
              <span className="text-[11px] font-mono text-red-400">
                Error loading data
              </span>
            )}
            {!loading && !error && (
              <span className="text-[11px] font-mono text-text-tertiary">
                <span className="text-blue-400">{markerCount}</span>{" "}
                {viewMode === "cities" ? "cities" : "countries"} tracked
              </span>
            )}
          </div>

          <span className="text-[11px] font-mono text-text-tertiary uppercase">
            {viewMode}
          </span>
        </div>
      </div>

      {/* Info Cards Row */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/[0.06] bg-surface-card/60 p-4 backdrop-blur-sm">
          <p className="text-[11px] font-mono uppercase text-text-tertiary mb-1">
            Data Source
          </p>
          <p className="text-sm font-medium text-text-primary">
            Traffic Analysis Feed
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-surface-card/60 p-4 backdrop-blur-sm">
          <p className="text-[11px] font-mono uppercase text-text-tertiary mb-1">
            Active Markers
          </p>
          <p className="text-sm font-medium text-blue-400 font-mono">
            {loading ? "—" : markerCount}
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-surface-card/60 p-4 backdrop-blur-sm">
          <p className="text-[11px] font-mono uppercase text-text-tertiary mb-1">
            Interaction
          </p>
          <p className="text-sm font-medium text-text-primary">
            Orbit · Zoom · Hover
          </p>
        </div>
      </div>
    </>
  );
}
