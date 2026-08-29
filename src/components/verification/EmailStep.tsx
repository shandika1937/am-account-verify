import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { emailSchema, type EmailFormData } from "@/lib/validation";
import { motion } from "framer-motion";

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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 mb-4">
          <Mail className="size-7 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Enter your email
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We&apos;ll send a verification link to confirm your Alight Motion
          account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleChange}
              className="pl-10 h-11"
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
          className="w-full h-11 font-medium"
          disabled={isLoading || !email.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending verification link...
            </>
          ) : (
            <>
              Send Magic Link
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
