import LogTable from "@/components/LogTable";
import { ScrollText } from "lucide-react";

export default function LogsPage() {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <ScrollText size={20} className="text-blue-400" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-text-primary">
              Security Logs
            </h1>
            <p className="text-sm text-text-tertiary">
              Real-time server event monitoring
            </p>
          </div>
        </div>
      </div>
      <LogTable />
    </>
  );
}
