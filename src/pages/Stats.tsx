import { BarChart3 } from "lucide-react";
import KpiCards from "@/components/KpiCards";
import { threatLocations } from "@/lib/mock-data";

const severityColors: Record<string, string> = {
  critical: "#EF4444",
  high: "#F59E0B",
  medium: "#3B82F6",
  low: "#10B981",
};

export default function StatsPage() {
  const severityCounts = {
    critical: threatLocations.filter((t) => t.severity === "critical").length,
    high: threatLocations.filter((t) => t.severity === "high").length,
    medium: threatLocations.filter((t) => t.severity === "medium").length,
    low: threatLocations.filter((t) => t.severity === "low").length,
  };

  const total = threatLocations.length;

  // Group attacks by type
  const attackTypes = threatLocations.reduce<Record<string, number>>((acc, t) => {
    acc[t.type] = (acc[t.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <BarChart3 size={20} className="text-blue-400" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-text-primary">
              Statistics
            </h1>
            <p className="text-sm text-text-tertiary">
              Threat analysis & system metrics
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <KpiCards />

      {/* Stats Grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Severity Breakdown */}
        <div className="rounded-xl border border-white/[0.06] bg-surface-card p-6">
          <h3 className="font-heading text-base font-semibold text-text-primary mb-5">
            Threat Severity Breakdown
          </h3>
          <div className="space-y-4">
            {(["critical", "high", "medium", "low"] as const).map((severity) => {
              const count = severityCounts[severity];
              const pct = Math.round((count / total) * 100);
              return (
                <div key={severity} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize text-text-secondary">{severity}</span>
                    <span className="font-mono text-xs text-text-tertiary">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/[0.04]">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: severityColors[severity],
                        boxShadow: `0 0 8px ${severityColors[severity]}40`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attack Types */}
        <div className="rounded-xl border border-white/[0.06] bg-surface-card p-6">
          <h3 className="font-heading text-base font-semibold text-text-primary mb-5">
            Attack Type Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(attackTypes)
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => (
                <div
                  key={type}
                  className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/[0.08]"
                >
                  <span className="text-sm text-text-secondary">{type}</span>
                  <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Top Threat Origins */}
      <div className="mt-5 rounded-xl border border-white/[0.06] bg-surface-card p-6">
        <h3 className="font-heading text-base font-semibold text-text-primary mb-5">
          Top Threat Origins
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {threatLocations.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-3"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: severityColors[t.severity] }}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">{t.city}</p>
                <p className="truncate text-[11px] text-text-tertiary">{t.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
