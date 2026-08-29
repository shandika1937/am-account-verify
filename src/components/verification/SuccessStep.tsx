import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessStepProps {
  email: string;
  onComplete: () => void;
}

export function SuccessStep({ email, onComplete }: SuccessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto text-center"
    >
      {/* Success animation */}
      <div className="relative inline-block mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
          className="inline-flex items-center justify-center size-20 rounded-full bg-green-500/10"
        >
          <CheckCircle2 className="size-10 text-green-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-2 -right-2"
        >
          <PartyPopper className="size-6 text-amber-500" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Verification Successful
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Your Alight Motion account has been successfully verified.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="rounded-xl border bg-card p-5 mb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center justify-center size-8 rounded-lg bg-green-500/10">
              <Mail className="size-4 text-green-500" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">
                Verified email
              </p>
              <p className="text-sm font-medium">{email}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={onComplete}
          className="w-full h-11 font-medium"
          size="lg"
        >
          Done
        </Button>
      </motion.div>
    </motion.div>
  );
}
