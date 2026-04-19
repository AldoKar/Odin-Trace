import { CalendarDays, Clock, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <header id="dashboard-header" className="mb-6">
      <div className="flex items-center justify-between">
        {/* Left — Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold tracking-tight text-text-primary">
              Argos
            </h1>
            <p className="text-[11px] text-text-tertiary">Security Dashboard</p>
          </div>
        </div>

        {/* Right — Status + Time + Notifications */}
        <div className="flex items-center gap-3">
          {/* Live indicator */}
          <div className="hidden items-center gap-2 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            <span className="text-[11px] font-medium text-emerald-400">Live</span>
          </div>

          {/* Date + Time */}
          <div className="hidden items-center gap-1.5 rounded-lg border border-white/[0.06] bg-surface-card px-3 py-1.5 sm:flex">
            <CalendarDays size={12} className="text-text-tertiary" />
            <span className="text-[11px] text-text-secondary">{formattedDate}</span>
            <span className="mx-1 text-white/10">|</span>
            <Clock size={12} className="text-blue-400" />
            <span className="font-mono text-[11px] font-medium text-text-primary">{formattedTime}</span>
          </div>

          {/* User avatar + notification */}
          <button
            id="notifications-btn"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-surface-card text-text-tertiary transition-colors hover:border-white/[0.1] hover:text-text-secondary"
          >
            <Bell size={15} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface-secondary bg-red-500" />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-semibold text-white">
            AO
          </div>
        </div>
      </div>
    </header>
  );
}
