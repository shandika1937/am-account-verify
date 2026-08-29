import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Fingerprint,
  KeyRound,
  Link2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const steps = [
  {
    n: "01",
    icon: Mail,
    title: "Masukkan email",
    body: "Isi email akun Alight Motion kamu. Format divalidasi sebelum dikirim ke server.",
  },
  {
    n: "02",
    icon: Mail,
    title: "Buka magic link",
    body: "Kami mengirim tautan ke inbox. Tidak ada password yang diminta di halaman ini.",
  },
  {
    n: "03",
    icon: Link2,
    title: "Tempel tautan",
    body: "Salin URL verifikasi dari email, lalu kirim. Backend yang memproses, bukan browser.",
  },
  {
    n: "04",
    icon: ShieldCheck,
    title: "Selesai",
    body: "Jika sukses, kamu melihat status Verifikasi Berhasil beserta email yang diverifikasi.",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  return (
    <div className="relative min-h-screen bg-background">
      <AmbientBackdrop />
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="am-kicker mb-6">
              <span className="size-1.5 bg-primary" />
              Verifikasi akun resmi
            </p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              Bantu proses verifikasi akun{" "}
              <span className="text-primary">Alight Motion</span>.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              AM Account Verification menuntun kamu dari email, magic link, hingga
              konfirmasi — dengan API di sisi server. Tanpa password di frontend,
              tanpa klaim Premium.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-sm px-7 text-sm font-semibold tracking-wide"
                onClick={() =>
                  navigate(!isLoading && isAuthenticated ? "/dashboard" : "/verify")
                }
              >
                {!isLoading && isAuthenticated ? "Dasbor" : "Mulai Verifikasi"}
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-sm px-7 text-sm"
                onClick={() =>
                  document.getElementById("alur")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Lihat alur
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="am-panel am-scan p-5 sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span>Signal console</span>
              <span className="flex items-center gap-1.5 text-chart-2">
                <span className="am-pulse size-1.5 rounded-full bg-chart-2" />
                Siap
              </span>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Email", state: "Menunggu input" },
                { label: "Verifikasi Email", state: "Magic link" },
                { label: "Verifikasi Link", state: "Server proxy" },
                { label: "Selesai", state: "Status aman" },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border border-border bg-background/60 px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-primary">
                      0{i + 1}
                    </span>
                    <span className="text-sm font-medium">{row.label}</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {row.state}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] text-muted-foreground">
              jobId · disimpan sementara · tautan tidak dicatat
            </p>
          </motion.div>
        </div>
      </section>

      <section id="alur" className="relative border-t">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 max-w-xl"
          >
            <p className="am-kicker mb-3">Alur utama</p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Empat langkah, satu jalur yang jelas.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Email → Verifikasi Email → Verifikasi Link → Selesai.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="am-panel p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-primary/70">
                    {step.n}
                  </span>
                  <step.icon className="size-4 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="keamanan" className="relative border-t">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="am-panel p-8 sm:p-12"
          >
            <p className="am-kicker mb-3">Keamanan</p>
            <h2 className="font-display max-w-lg text-3xl font-bold tracking-tight">
              Kunci API tidak pernah keluar dari server.
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  icon: KeyRound,
                  title: "Proxy backend",
                  body: "Semua request API lewat server. ALIGHT_MOTION_API_KEY hanya di environment.",
                },
                {
                  icon: Lock,
                  title: "Tanpa password",
                  body: "Frontend tidak menampilkan atau menyimpan credential akun.",
                },
                {
                  icon: Fingerprint,
                  title: "Input bersih",
                  body: "Email dan URL divalidasi. Rate limit aktif. Tautan tidak dicatat di konsol produksi.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <item.icon className="mb-3 size-5 text-primary" />
                  <h3 className="font-display text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Siap memulai verifikasi?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Prosesnya linear, bisa di HP, dan menampilkan status yang jelas di setiap langkah.
            </p>
            <Button
              size="lg"
              className="mt-8 h-12 rounded-sm px-8 font-semibold"
              onClick={() => navigate("/verify")}
            >
              Mulai Verifikasi
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
