import {
  LayoutDashboard,
  ScrollText,
  Globe,
  BarChart3,
  Map,
  type LucideIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Logs", icon: ScrollText, path: "/logs" },
  { label: "Map 2D", icon: Globe, path: "/map-2d" },
  { label: "Map 3D", icon: Map, path: "/map-3d" },
  { label: "Stats", icon: BarChart3, path: "/stats" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.08] bg-[#0A0A0F]/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.label}
              id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              to={item.path}
              className={`group relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 transition-all duration-200 ${
                isActive
                  ? "text-blue-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {/* Active indicator glow */}
              {isActive && (
                <span className="absolute -top-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              )}

              <span className="relative">
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className="transition-all duration-200"
                />
                {/* Badge */}
                {item.badge !== undefined && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-[0_0_6px_rgba(239,68,68,0.5)]">
                    {item.badge}
                  </span>
                )}
              </span>

              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-400"
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* Safe area spacer for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
