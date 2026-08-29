import { AppShell } from "@/components/AppShell";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock,
  Shield,
  Users,
} from "lucide-react";

const stats = [
  { label: "Sesi hari ini", value: "47", icon: Activity },
  { label: "Berhasil", value: "41", icon: CheckCircle2 },
  { label: "Menunggu", value: "4", icon: Clock },
  { label: "Pengguna dasbor", value: "128", icon: Users },
];

const recent = [
  { id: "JOB-001", email: "user1@example.com", status: "completed", date: "29 Agu 2026" },
  { id: "JOB-002", email: "user2@example.com", status: "pending", date: "29 Agu 2026" },
  { id: "JOB-003", email: "user3@example.com", status: "completed", date: "28 Agu 2026" },
  { id: "JOB-004", email: "user4@example.com", status: "failed", date: "28 Agu 2026" },
];

const statusStyles: Record<string, string> = {
  completed: "text-chart-2",
  pending: "text-primary",
  failed: "text-destructive",
};

const statusLabel: Record<string, string> = {
  completed: "Berhasil",
  pending: "Menunggu",
  failed: "Gagal",
};

export default function Admin() {
  return (
    <AppShell>
      <p className="am-kicker mb-2">Admin</p>
      <h1 className="font-display text-3xl font-bold tracking-tight">Monitor sesi</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Ringkasan operasional. Tautan verifikasi dan API key tidak ditampilkan di sini.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.04 }}
            className="am-panel p-4"
          >
            <stat.icon className="mb-3 size-4 text-primary" />
            <p className="font-display text-2xl font-bold">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="am-panel p-5 lg:col-span-2">
          <h2 className="font-display text-base font-bold">Sesi terbaru</h2>
          <div className="mt-4 divide-y divide-border">
            {recent.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-muted-foreground">{row.id}</p>
                  <p className="truncate text-sm font-medium">{row.email}</p>
                </div>
                <span className={`text-xs font-semibold ${statusStyles[row.status]}`}>
                  {statusLabel[row.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="am-panel p-5">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="size-4 text-primary" />
            <h2 className="font-display text-base font-bold">Kontrol</h2>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              "Rate limiting aktif",
              "API key hanya di environment",
              "Mock adapter jika API resmi tidak tersedia",
              "Tidak ada log tautan produksi",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-chart-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
