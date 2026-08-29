import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AppShell>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="am-kicker mb-2">Dasbor</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Halo{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Kelola sesi verifikasi akun Alight Motion dari sini. Tidak ada password
          yang disimpan di akun ini.
        </p>
      </motion.div>

      <div className="am-panel mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-11 items-center justify-center border border-primary text-primary">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight">
              Mulai sesi verifikasi
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Email → magic link → tautan verifikasi → selesai.
            </p>
          </div>
        </div>
        <Button className="rounded-sm" onClick={() => navigate("/verify")}>
          Mulai Verifikasi
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="am-panel p-5 lg:col-span-2">
          <h2 className="font-display text-base font-bold">Aktivitas</h2>
          <div className="mt-4 space-y-3">
            {[
              {
                title: "Belum ada sesi aktif",
                time: "Mulai verifikasi untuk membuat jobId baru",
                done: false,
              },
              {
                title: "Kunci API hanya di server",
                time: "Tidak pernah dikirim ke browser",
                done: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 border border-border px-3 py-3"
              >
                <div
                  className={`mt-0.5 flex size-7 items-center justify-center ${
                    item.done
                      ? "bg-chart-2/15 text-chart-2"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {item.done ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : (
                    <Clock className="size-3.5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="am-panel p-5">
          <h2 className="font-display text-base font-bold">Email sesi</h2>
          <p className="mt-3 truncate text-sm text-muted-foreground">
            {user?.email || "Belum terhubung"}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Email ini hanya untuk masuk ke dasbor, terpisah dari alur verifikasi
            Alight Motion.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
