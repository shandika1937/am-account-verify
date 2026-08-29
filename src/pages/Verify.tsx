import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StepProgress, type StepId } from "@/components/verification/StepProgress";
import { EmailStep } from "@/components/verification/EmailStep";
import { WaitingStep } from "@/components/verification/WaitingStep";
import { LinkStep } from "@/components/verification/LinkStep";
import { SuccessStep } from "@/components/verification/SuccessStep";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Verify() {
  const navigate = useNavigate();
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
        toast.success("Verification link sent", {
          description: "Check your inbox for the verification email.",
        });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setError(message);
        toast.error("Failed to send verification", {
          description: message,
        });
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
        toast.success("Verification complete!", {
          description: "Your account has been verified successfully.",
        });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Verification failed. Please try again.";
        setError(message);
        toast.error("Verification failed", {
          description: message,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [jobId, submitVerificationLink],
  );

  const handleComplete = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => navigate("/")}
              aria-label="Go back to home"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
                <Shield className="size-4.5" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                AM Verify
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Progress */}
      <div className="pt-10 px-4 sm:px-6">
        <StepProgress currentStep={currentStep} />
      </div>

      {/* Content */}
      <main className="px-4 sm:px-6 pb-20 pt-4">
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
              onContinue={() => setCurrentStep("link")}
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
            <SuccessStep
              key="success"
              email={email}
              onComplete={handleComplete}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
