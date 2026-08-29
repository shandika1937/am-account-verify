import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background">
      <AmbientBackdrop />
      <SiteHeader />
      <div className="relative flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="am-panel max-w-md p-8 text-center"
        >
          <p className="font-display text-6xl font-extrabold text-primary/30">404</p>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-tight">
            Halaman tidak ditemukan
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Alamat ini tidak ada di AM Account Verification.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button variant="outline" className="rounded-sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="size-4" />
              Kembali
            </Button>
            <Button className="rounded-sm" onClick={() => navigate("/")}>
              <Home className="size-4" />
              Beranda
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
