import {
  ShieldAlert,
  Activity,
  Zap,
  Ban,
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { kpiData } from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  "shield-alert": ShieldAlert,
  activity: Activity,
  zap: Zap,
  ban: Ban,
};

const severityStyles: Record<string, { bg: string; text: string; icon: string; glow: string }> = {
  critical: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    icon: "text-red-400",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
  },
  warning: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    icon: "text-amber-400",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
  success: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    icon: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  info: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    icon: "text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
};

export default function KpiCards() {
  return (
    <div id="kpi-cards" className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {kpiData.map((kpi, index) => {
        const Icon = iconMap[kpi.icon] || Activity;
        const style = severityStyles[kpi.severity || "info"];

        return (
          <div
            key={kpi.label}
            id={`kpi-${kpi.label.toLowerCase().replace(/\s+/g, "-")}`}
            className={`group animate-fade-in-up rounded-xl border border-white/[0.06] bg-surface-card p-4 sm:p-5 transition-all duration-300 hover:border-white/[0.1] ${style.glow}`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-[11px] font-medium tracking-wider text-text-tertiary uppercase">
                  {kpi.label}
                </p>
                <p className="font-heading text-2xl font-semibold tracking-tight text-text-primary animate-count-up sm:text-3xl">
                  {kpi.value}
                </p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.bg} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={19} className={style.icon} />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5">
              {kpi.trend === "up" ? (
                <TrendingUp size={13} className={kpi.severity === "critical" ? "text-red-400" : "text-emerald-400"} />
              ) : (
                <TrendingDown size={13} className="text-text-tertiary" />
              )}
              <span
                className={`text-[11px] font-semibold ${
                  kpi.severity === "critical" && kpi.trend === "up"
                    ? "text-red-400"
                    : kpi.trend === "up"
                    ? "text-emerald-400"
                    : "text-text-tertiary"
                }`}
              >
                {kpi.change > 0 ? "+" : ""}
                {kpi.change}%
              </span>
              <span className="text-[11px] text-text-tertiary">{kpi.changeLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
