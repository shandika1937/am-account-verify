import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { EmailStep } from "@/components/verification/EmailStep";
import { LinkStep } from "@/components/verification/LinkStep";
import { StepProgress, type StepId } from "@/components/verification/StepProgress";
import { SuccessStep } from "@/components/verification/SuccessStep";
import { WaitingStep } from "@/components/verification/WaitingStep";
import { api } from "@/convex/_generated/api";
import { mapVerificationError } from "@/lib/errors";
import { useAuth } from "@/hooks/use-auth";
import { useAction } from "convex/react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Verify() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const requestVerification = useAction(api.verification.requestVerification);
  const submitVerificationLink = useAction(api.verification.submitVerificationLink);

  const [currentStep, setCurrentStep] = useState<StepId>("email");
  const [email, setEmail] = useState("");
  const [jobId, setJobId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = useCallback(
    async (submittedEmail: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await requestVerification({ email: submittedEmail });
        setEmail(submittedEmail);
        setJobId(result.jobId);
        setCurrentStep("waiting");
        toast.success("Magic link dikirim", {
          description: "Periksa inbox email kamu.",
        });
      } catch (err) {
        const message = mapVerificationError(err);
        setError(message);
        toast.error("Gagal mengirim magic link", { description: message });
      } finally {
        setIsLoading(false);
      }
    },
    [requestVerification],
  );

  const handleLinkSubmit = useCallback(
    async (link: string) => {
      setIsLoading(true);
      setError(null);

      try {
        await submitVerificationLink({ jobId, link });
        setCurrentStep("success");
        toast.success("Verifikasi berhasil", {
          description: "Akun email kamu sudah terverifikasi.",
        });
      } catch (err) {
        const message = mapVerificationError(err);
        setError(message);
        toast.error("Verifikasi gagal", { description: message });
      } finally {
        setIsLoading(false);
      }
    },
    [jobId, submitVerificationLink],
  );

  const handleComplete = useCallback(() => {
    navigate(isAuthenticated ? "/dashboard" : "/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative min-h-screen bg-background">
      <AmbientBackdrop />

      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => navigate("/")}
              aria-label="Kembali ke beranda"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="cursor-pointer"
              aria-label="Beranda"
            >
              <BrandMark />
            </button>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className="relative px-4 pt-10 sm:px-6">
        <StepProgress currentStep={currentStep} />
      </div>

      <main className="relative px-4 pb-20 pt-2 sm:px-6">
        <AnimatePresence mode="wait">
          {currentStep === "email" && (
            <EmailStep
              key="email"
              onSubmit={handleEmailSubmit}
              error={error}
              isLoading={isLoading}
            />
          )}
          {currentStep === "waiting" && (
            <WaitingStep
              key="waiting"
              email={email}
              onContinue={() => {
                setError(null);
                setCurrentStep("link");
              }}
              onBack={() => {
                setCurrentStep("email");
                setError(null);
              }}
              isLoading={isLoading}
            />
          )}
          {currentStep === "link" && (
            <LinkStep
              key="link"
              onSubmit={handleLinkSubmit}
              onBack={() => setCurrentStep("waiting")}
              error={error}
              isLoading={isLoading}
            />
          )}
          {currentStep === "success" && (
            <SuccessStep key="success" email={email} onComplete={handleComplete} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
