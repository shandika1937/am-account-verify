import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { emailSchema } from "@/lib/validation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useState } from "react";

interface EmailStepProps {
  onSubmit: (email: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export function EmailStep({ onSubmit, error, isLoading }: EmailStepProps) {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    await onSubmit(result.data.email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (validationError) setValidationError(null);
  };

  const displayError = validationError || error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28 }}
      className="am-panel mx-auto w-full max-w-md p-6 sm:p-8"
    >
      <p className="am-kicker mb-4">
        <span className="size-1.5 bg-primary" />
        Langkah 01
      </p>
      <div className="mb-7">
        <h2 className="font-display text-2xl font-bold tracking-tight">Masukkan email kamu</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Gunakan email yang terhubung dengan akun Alight Motion. Kami hanya mengirim magic link —
          password tidak pernah diminta atau ditampilkan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Alamat email
          </Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={handleChange}
              className="h-11 rounded-sm pl-10"
              disabled={isLoading}
              autoComplete="email"
              autoFocus
              aria-describedby={displayError ? "email-error" : undefined}
              aria-invalid={!!displayError}
            />
          </div>
          {displayError && (
            <motion.p
              id="email-error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
              role="alert"
            >
              {displayError}
            </motion.p>
          )}
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-sm font-semibold"
          disabled={isLoading || !email.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Mengirim magic link...
            </>
          ) : (
            <>
              Kirim Magic Link
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
