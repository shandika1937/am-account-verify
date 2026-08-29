import { Button } from "@/components/ui/button";
import { Mail, Clock, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 mb-4">
          <Clock className="size-7 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Check your inbox
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We&apos;ve sent a verification link to:
        </p>
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">
          <Mail className="size-3.5" />
          {email}
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5 mb-6">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">1</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              Open your email inbox and look for a message from Upgrader AM.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">2</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              Click the verification link in the email to confirm your identity.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">3</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              Copy the verification link and paste it in the next step to finish your upgrade.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onContinue}
          className="w-full h-11 font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              I have the verification link
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
          Use a different email
        </Button>
      </div>
    </motion.div>
  );
}
