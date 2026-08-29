import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Mail } from "lucide-react";

interface SuccessStepProps {
  email: string;
  onComplete: () => void;
}

export function SuccessStep({ email, onComplete }: SuccessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="am-panel mx-auto w-full max-w-md p-6 text-center sm:p-8"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.05 }}
        className="mx-auto mb-6 flex size-16 items-center justify-center border-2 border-chart-2 text-chart-2"
      >
        <Check className="size-8" strokeWidth={2.4} />
      </motion.div>

      <p className="am-kicker mb-3 justify-center">Status</p>
      <h2 className="font-display text-2xl font-bold tracking-tight">
        Verifikasi Berhasil
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Email berikut telah diverifikasi. Tidak ada password atau data sensitif
        yang ditampilkan.
      </p>

      <div className="mt-6 flex items-center justify-center gap-2 border border-border bg-secondary/50 px-3 py-2.5 text-sm font-medium">
        <Mail className="size-3.5 text-chart-2" />
        <span className="truncate">{email}</span>
      </div>

      <Button
        onClick={onComplete}
        className="mt-8 h-11 w-full rounded-sm font-semibold"
        size="lg"
      >
        Selesai
      </Button>
    </motion.div>
  );
}
