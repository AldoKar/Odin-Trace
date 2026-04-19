import { Routes, Route } from "react-router-dom";
import BottomNav from "@/components/Sidebar";
import DashboardPage from "@/pages/Dashboard";
import LogsPage from "@/pages/Logs";
import Map2DPage from "@/pages/Map2D";
import Map3DPage from "@/pages/Map3D";
import StatsPage from "@/pages/Stats";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-secondary">
      {/* Main Content — full width, padding bottom for bottom nav */}
      <main className="flex-1 pb-24">
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/map-2d" element={<Map2DPage />} />
            <Route path="/map-3d" element={<Map3DPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default App;
