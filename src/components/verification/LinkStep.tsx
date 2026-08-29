import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { verificationLinkSchema } from "@/lib/validation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";

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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28 }}
      className="am-panel mx-auto w-full max-w-md p-6 sm:p-8"
    >
      <p className="am-kicker mb-4">
        <span className="size-1.5 bg-primary" />
        Langkah 03
      </p>
      <h2 className="font-display text-2xl font-bold tracking-tight">
        Tempel link verifikasi
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Masukkan URL yang kamu terima di email. Link diproses di server dan tidak
        disimpan lebih lama dari yang diperlukan.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="verification-link" className="text-sm font-medium">
            URL verifikasi
          </Label>
          <Textarea
            id="verification-link"
            placeholder="https://..."
            value={link}
            onChange={handleChange}
            className="min-h-[110px] resize-none rounded-sm font-mono text-sm"
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
            className="h-11 shrink-0 rounded-sm"
            disabled={isLoading}
          >
            <ArrowLeft className="size-4" />
            Kembali
          </Button>
          <Button
            type="submit"
            className="h-11 flex-1 rounded-sm font-semibold"
            disabled={isLoading || !link.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Memverifikasi...
              </>
            ) : (
              <>
                <ShieldCheck className="size-4" />
                Verifikasi
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
