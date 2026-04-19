import { serverLogs } from "@/lib/mock-data";
import { ScrollText, Filter, Download, RefreshCw } from "lucide-react";
import { useState } from "react";

const levelStyles: Record<string, { bg: string; text: string; dot: string }> = {
  CRITICAL: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  ERROR: { bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-400" },
  WARN: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  INFO: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
};

export default function LogTable() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filters = ["ALL", "CRITICAL", "ERROR", "WARN", "INFO"];

  const filteredLogs =
    activeFilter === "ALL"
      ? serverLogs
      : serverLogs.filter((log) => log.level === activeFilter);

  return (
    <div
      id="log-table"
      className="animate-fade-in-up rounded-xl border border-white/[0.06] bg-surface-card"
      style={{ animationDelay: "300ms" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-white/[0.04] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
            <ScrollText size={16} className="text-blue-400" />
          </div>
          <div>
            <h2 className="font-heading text-base font-semibold text-text-primary">
              Server Logs
            </h2>
            <p className="text-[11px] text-text-tertiary">Real-time security event feed</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Level filters */}
          <div className="flex items-center gap-0.5 rounded-lg border border-white/[0.06] bg-surface-tertiary p-0.5">
            {filters.map((filter) => (
              <button
                key={filter}
                id={`log-filter-${filter.toLowerCase()}`}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-surface-card text-text-primary shadow-sm"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="ml-1 flex items-center gap-0.5">
            <button
              id="log-filter-btn"
              className="flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-white/[0.05] hover:text-text-secondary"
              aria-label="Filter"
            >
              <Filter size={13} />
            </button>
            <button
              id="log-download-btn"
              className="flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-white/[0.05] hover:text-text-secondary"
              aria-label="Download"
            >
              <Download size={13} />
            </button>
            <button
              id="log-refresh-btn"
              className="flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-white/[0.05] hover:text-text-secondary"
              aria-label="Refresh"
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.04] bg-white/[0.02]">
              <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
                Timestamp
              </th>
              <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
                Level
              </th>
              <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
                Source
              </th>
              <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
                Message
              </th>
              <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {filteredLogs.map((log, index) => {
              const style = levelStyles[log.level];
              return (
                <tr
                  key={log.id}
                  id={`log-row-${log.id}`}
                  className="group animate-fade-in-up transition-colors hover:bg-white/[0.02]"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-[11px] text-text-tertiary">
                    {log.timestamp}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                      {log.level}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <span className="font-mono text-[11px] text-text-secondary">{log.source}</span>
                  </td>
                  <td className="max-w-md px-5 py-3">
                    <span className="line-clamp-1 text-[12px] text-text-secondary group-hover:text-text-primary transition-colors">
                      {log.message}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 font-mono text-[11px] text-text-tertiary">
                    {log.ip}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/[0.04] px-5 py-3">
        <span className="text-[11px] text-text-tertiary">
          Showing <span className="font-semibold text-text-secondary">{filteredLogs.length}</span> of{" "}
          <span className="font-semibold text-text-secondary">{serverLogs.length}</span> entries
        </span>
        <div className="flex items-center gap-1">
          <button className="rounded-md px-3 py-1.5 text-[11px] font-medium text-text-tertiary transition-colors hover:bg-white/[0.05] hover:text-text-secondary">
            Previous
          </button>
          <button className="rounded-md bg-blue-primary px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-blue-hover">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
