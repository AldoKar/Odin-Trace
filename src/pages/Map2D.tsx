import ThreatMap from "@/components/ThreatMap";
import { Globe } from "lucide-react";

export default function Map2DPage() {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <Globe size={20} className="text-blue-400" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-text-primary">
              2D Threat Map
            </h1>
            <p className="text-sm text-text-tertiary">
              Global geographic threat intelligence
            </p>
          </div>
        </div>
      </div>
      <ThreatMap />
    </>
  );
}
