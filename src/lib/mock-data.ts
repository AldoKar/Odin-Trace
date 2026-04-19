// ─── Threat Locations for World Map ──────────────────────────────
export interface ThreatLocation {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  severity: "critical" | "high" | "medium" | "low";
  type: string;
  timestamp: string;
}

export const threatLocations: ThreatLocation[] = [
  { id: "t1", city: "Moscow", country: "Russia", lat: 55.75, lng: 37.62, severity: "critical", type: "Brute Force", timestamp: "2 min ago" },
  { id: "t2", city: "Beijing", country: "China", lat: 39.91, lng: 116.39, severity: "high", type: "SQL Injection", timestamp: "5 min ago" },
  { id: "t3", city: "São Paulo", country: "Brazil", lat: -23.55, lng: -46.63, severity: "medium", type: "Port Scan", timestamp: "8 min ago" },
  { id: "t4", city: "Lagos", country: "Nigeria", lat: 6.52, lng: 3.38, severity: "high", type: "Phishing Attempt", timestamp: "12 min ago" },
  { id: "t5", city: "Tehran", country: "Iran", lat: 35.69, lng: 51.39, severity: "critical", type: "Ransomware", timestamp: "15 min ago" },
  { id: "t6", city: "Pyongyang", country: "North Korea", lat: 39.02, lng: 125.75, severity: "critical", type: "APT Activity", timestamp: "18 min ago" },
  { id: "t7", city: "Mumbai", country: "India", lat: 19.08, lng: 72.88, severity: "low", type: "DDoS Attempt", timestamp: "22 min ago" },
  { id: "t8", city: "Bucharest", country: "Romania", lat: 44.43, lng: 26.10, severity: "medium", type: "Credential Stuffing", timestamp: "25 min ago" },
  { id: "t9", city: "Jakarta", country: "Indonesia", lat: -6.21, lng: 106.85, severity: "low", type: "Suspicious Login", timestamp: "30 min ago" },
  { id: "t10", city: "Caracas", country: "Venezuela", lat: 10.49, lng: -66.88, severity: "medium", type: "Malware Download", timestamp: "35 min ago" },
  { id: "t11", city: "Berlin", country: "Germany", lat: 52.52, lng: 13.40, severity: "low", type: "Port Scan", timestamp: "40 min ago" },
  { id: "t12", city: "Hanoi", country: "Vietnam", lat: 21.03, lng: 105.85, severity: "high", type: "XSS Attack", timestamp: "45 min ago" },
];

// ─── KPI Data ────────────────────────────────────────────────────
export interface KpiData {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  trend: "up" | "down" | "neutral";
  severity?: "critical" | "warning" | "success" | "info";
}

export const kpiData: KpiData[] = [
  {
    label: "Active Threats",
    value: 24,
    change: 12,
    changeLabel: "vs last hour",
    icon: "shield-alert",
    trend: "up",
    severity: "critical",
  },
  {
    label: "System Health",
    value: "98.7%",
    change: 0.3,
    changeLabel: "vs yesterday",
    icon: "activity",
    trend: "up",
    severity: "success",
  },
  {
    label: "Events / sec",
    value: "12.4K",
    change: -2.1,
    changeLabel: "vs avg",
    icon: "zap",
    trend: "down",
    severity: "info",
  },
  {
    label: "Blocked IPs",
    value: 847,
    change: 23,
    changeLabel: "last 24h",
    icon: "ban",
    trend: "up",
    severity: "warning",
  },
];

// ─── Server Logs ─────────────────────────────────────────────────
export interface ServerLog {
  id: string;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "CRITICAL";
  source: string;
  message: string;
  ip: string;
}

export const serverLogs: ServerLog[] = [
  { id: "log-001", timestamp: "2026-04-19 17:24:31", level: "CRITICAL", source: "fw-gateway-01", message: "Unauthorized access attempt detected from suspicious IP range", ip: "185.220.101.34" },
  { id: "log-002", timestamp: "2026-04-19 17:24:28", level: "ERROR", source: "auth-service", message: "Multiple failed login attempts — account lockout triggered", ip: "103.152.220.18" },
  { id: "log-003", timestamp: "2026-04-19 17:24:25", level: "WARN", source: "ids-node-03", message: "Anomalous traffic pattern detected on port 443", ip: "91.240.118.172" },
  { id: "log-004", timestamp: "2026-04-19 17:24:22", level: "INFO", source: "load-balancer", message: "Health check passed — all upstream servers responding", ip: "10.0.1.1" },
  { id: "log-005", timestamp: "2026-04-19 17:24:19", level: "WARN", source: "dns-resolver", message: "DNS query to known malicious domain intercepted and blocked", ip: "198.51.100.23" },
  { id: "log-006", timestamp: "2026-04-19 17:24:15", level: "ERROR", source: "vpn-gateway", message: "TLS handshake failure — potential downgrade attack", ip: "203.0.113.45" },
  { id: "log-007", timestamp: "2026-04-19 17:24:12", level: "INFO", source: "siem-collector", message: "Log ingestion rate normalized after spike event", ip: "10.0.2.15" },
  { id: "log-008", timestamp: "2026-04-19 17:24:08", level: "CRITICAL", source: "endpoint-agent", message: "Ransomware signature detected — quarantine initiated", ip: "172.16.0.142" },
  { id: "log-009", timestamp: "2026-04-19 17:24:05", level: "INFO", source: "patch-manager", message: "Security patch KB2026-0419 deployed to 342 endpoints", ip: "10.0.3.1" },
  { id: "log-010", timestamp: "2026-04-19 17:24:01", level: "WARN", source: "mail-gateway", message: "Phishing email quarantined — spoofed sender domain detected", ip: "45.33.32.156" },
  { id: "log-011", timestamp: "2026-04-19 17:23:58", level: "ERROR", source: "db-monitor", message: "Unusual query pattern detected — possible SQL injection attempt", ip: "123.45.67.89" },
  { id: "log-012", timestamp: "2026-04-19 17:23:55", level: "INFO", source: "cert-manager", message: "SSL certificate renewal completed for *.argos-sec.io", ip: "10.0.1.5" },
];

// ─── Navigation Items ────────────────────────────────────────────
export interface NavItem {
  label: string;
  icon: string;
  href: string;
  badge?: number;
  active?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", icon: "layout-dashboard", href: "#", active: true },
  { label: "Threats", icon: "shield-alert", href: "#", badge: 24 },
  { label: "Logs", icon: "scroll-text", href: "#" },
  { label: "Network", icon: "network", href: "#" },
  { label: "Endpoints", icon: "monitor", href: "#" },
  { label: "Reports", icon: "file-bar-chart", href: "#" },
  { label: "Settings", icon: "settings", href: "#" },
];
