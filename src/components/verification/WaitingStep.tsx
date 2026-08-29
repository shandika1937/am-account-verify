import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Inbox, Loader2, Mail, RefreshCw } from "lucide-react";

interface WaitingStepProps {
  email: string;
  onContinue: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export function WaitingStep({
  email,
  onContinue,
  onBack,
  isLoading,
}: WaitingStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28 }}
      className="am-panel mx-auto w-full max-w-md p-6 sm:p-8"
    >
      <p className="am-kicker mb-4">
        <span className="am-pulse size-1.5 bg-chart-2" />
        Langkah 02
      </p>

      <h2 className="font-display text-2xl font-bold tracking-tight">
        Menunggu link verifikasi...
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Periksa inbox email kamu dan buka link verifikasi yang dikirim.
      </p>

      <div className="mt-5 flex items-center gap-2 border border-border bg-secondary/60 px-3 py-2.5 text-sm font-medium">
        <Mail className="size-3.5 shrink-0 text-primary" />
        <span className="truncate">{email}</span>
      </div>

      <div className="mt-6 space-y-3 text-sm leading-relaxed">
        <div className="flex gap-3">
          <Inbox className="mt-0.5 size-4 shrink-0 text-primary" />
          <p>Buka inbox (dan folder spam) untuk email verifikasi.</p>
        </div>
        <div className="flex gap-3">
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center text-[11px] font-bold text-primary">
            2
          </span>
          <p>Salin tautan verifikasi dari email tersebut, jangan bagikan ke siapa pun.</p>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <Button
          onClick={onContinue}
          className="h-11 w-full rounded-sm font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Saya Sudah Mendapatkan Link
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          onClick={onBack}
          className="w-full"
          disabled={isLoading}
        >
          <RefreshCw className="size-4" />
          Gunakan email lain
        </Button>
      </div>
    </motion.div>
  );
}
