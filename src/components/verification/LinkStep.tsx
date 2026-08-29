import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link2, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  verificationLinkSchema,
  type VerificationLinkFormData,
} from "@/lib/validation";
import { motion } from "framer-motion";

interface LinkStepProps {
  onSubmit: (link: string) => Promise<void>;
  onBack: () => void;
  error: string | null;
  isLoading: boolean;
}

export function LinkStep({ onSubmit, onBack, error, isLoading }: LinkStepProps) {
  const [link, setLink] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const result = verificationLinkSchema.safeParse({ link: link.trim() });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    await onSubmit(result.data.link);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLink(e.target.value);
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
          <Link2 className="size-7 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Paste verification link
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Copy the verification link from your email and paste it below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="verification-link" className="text-sm font-medium">
            Verification link
          </Label>
          <Textarea
            id="verification-link"
            placeholder="https://alightmotion.com/verify/..."
            value={link}
            onChange={handleChange}
            className="min-h-[100px] font-mono text-sm resize-none"
            disabled={isLoading}
            autoComplete="off"
            autoFocus
            aria-describedby={displayError ? "link-error" : undefined}
            aria-invalid={!!displayError}
          />
          {displayError && (
            <motion.p
              id="link-error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
              role="alert"
            >
              {displayError}
            </motion.p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="shrink-0"
            disabled={isLoading}
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 h-11 font-medium"
            disabled={isLoading || !link.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <ShieldCheck className="size-4" />
                Complete Upgrade
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
