import { useState, useRef, useEffect } from "react";
import WorldMap from "react-svg-worldmap";
import { threatLocations } from "@/lib/mock-data";
import { Globe, Maximize2 } from "lucide-react";

// Convert threat locations to country code + value format for react-svg-worldmap
const countryData = threatLocations.map((t) => {
  const countryMap: Record<string, string> = {
    Russia: "ru",
    China: "cn",
    Brazil: "br",
    Nigeria: "ng",
    Iran: "ir",
    "North Korea": "kp",
    India: "in",
    Romania: "ro",
    Indonesia: "id",
    Venezuela: "ve",
    Germany: "de",
    Vietnam: "vn",
  };
  return {
    country: countryMap[t.country] || "us",
    value: t.severity === "critical" ? 100 : t.severity === "high" ? 75 : t.severity === "medium" ? 50 : 25,
  };
});

const severityColors: Record<string, string> = {
  critical: "#EF4444",
  high: "#F59E0B",
  medium: "#3B82F6",
  low: "#10B981",
};

export default function ThreatMap() {

  const containerRef = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setMapWidth(containerRef.current.clientWidth - 32);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Strip native SVG <title> elements to prevent duplicate browser tooltips
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new MutationObserver(() => {
      containerRef.current?.querySelectorAll("svg title").forEach((el) => el.remove());
    });
    observer.observe(containerRef.current, { childList: true, subtree: true });
    // Initial cleanup
    containerRef.current.querySelectorAll("svg title").forEach((el) => el.remove());
    return () => observer.disconnect();
  }, [mapWidth]);



  return (
    <div
      id="threat-map"
      className="animate-fade-in-up rounded-xl border border-white/[0.06] bg-surface-card"
      style={{ animationDelay: "200ms" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
            <Globe size={16} className="text-blue-400" />
          </div>
          <div>
            <h2 className="font-heading text-base font-semibold text-text-primary">
              Global Threat Map
            </h2>
            <p className="text-[11px] text-text-tertiary">Real-time geographic intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-4 text-[11px] text-text-tertiary sm:flex">
            {(["critical", "high", "medium", "low"] as const).map((severity) => (
              <div key={severity} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: severityColors[severity] }}
                />
                <span className="capitalize">{severity}</span>
              </div>
            ))}
          </div>
          <button
            id="threat-map-expand"
            className="ml-2 flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-white/[0.05] hover:text-text-secondary"
            aria-label="Expand map"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div ref={containerRef} className="w-full overflow-hidden px-4 py-4">
        {mapWidth > 0 && (
        <WorldMap
          color="#3B82F6"
          backgroundColor="transparent"
          borderColor="#1E293B"
          size={mapWidth}
          data={countryData}
          valueSuffix="threat level"
          tooltipTextFunction={(context) => {
            const threat = threatLocations.find((t) => {
              const countryMap: Record<string, string> = {
                Russia: "ru", China: "cn", Brazil: "br", Nigeria: "ng",
                Iran: "ir", "North Korea": "kp", India: "in", Romania: "ro",
                Indonesia: "id", Venezuela: "ve", Germany: "de", Vietnam: "vn",
              };
              return countryMap[t.country] === context.countryCode.toLowerCase();
            });
            if (threat) {
              return `${threat.city}, ${threat.country} — ${threat.type} (${threat.severity})`;
            }
            return `${context.countryName}: No active threats`;
          }}

          styleFunction={(context) => {
            const threat = threatLocations.find((t) => {
              const countryMap: Record<string, string> = {
                Russia: "ru", China: "cn", Brazil: "br", Nigeria: "ng",
                Iran: "ir", "North Korea": "kp", India: "in", Romania: "ro",
                Indonesia: "id", Venezuela: "ve", Germany: "de", Vietnam: "vn",
              };
              return countryMap[t.country] === context.countryCode?.toLowerCase();
            });

            if (threat) {
              const color = severityColors[threat.severity];
              return {
                fill: color,
                stroke: color,
                strokeWidth: 0.5,
                strokeOpacity: 0.6,
                fillOpacity: context.minValue === context.countryValue ? 0.7 : 0.85,
                cursor: "pointer",
              };
            }

            // Default countries — dark style
            return {
              fill: "#1A1A2E",
              stroke: "#2A2A42",
              strokeWidth: 0.3,
              strokeOpacity: 0.5,
              fillOpacity: 0.8,
              cursor: "default",
            };
          }}
        />
        )}
      </div>



      {/* Footer stats */}
      <div className="flex items-center justify-between border-t border-white/[0.04] px-5 py-3">
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-text-tertiary">
            <span className="font-semibold text-text-secondary">{threatLocations.length}</span> active sources
          </span>
          <span className="text-[11px] text-text-tertiary">
            <span className="font-semibold text-red-400">
              {threatLocations.filter((t) => t.severity === "critical").length}
            </span>{" "}
            critical
          </span>
        </div>
        <span className="text-[10px] text-text-tertiary">Updated 30s ago</span>
      </div>
    </div>
  );
}
