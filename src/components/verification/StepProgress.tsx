import { cn } from "@/lib/utils";
import { Check, Mail, Link2, ShieldCheck, CircleDot } from "lucide-react";

const steps = [
  { id: "email", label: "Email", icon: Mail },
  { id: "waiting", label: "Verify Email", icon: CircleDot },
  { id: "link", label: "Link Verification", icon: Link2 },
  { id: "success", label: "Complete", icon: ShieldCheck },
] as const;

export type StepId = (typeof steps)[number]["id"];

interface StepProgressProps {
  currentStep: StepId;
}

export function StepProgress({ currentStep }: StepProgressProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Connector line background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        {/* Connector line filled */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500 ease-out"
          style={{
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={cn(
                  "size-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                  isCompleted &&
                    "bg-primary text-primary-foreground shadow-md shadow-primary/25",
                  isCurrent &&
                    "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-md shadow-primary/25",
                  !isCompleted &&
                    !isCurrent &&
                    "bg-secondary text-secondary-foreground border border-border",
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" />
                ) : (
                  <Icon className="size-4" />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium hidden sm:block transition-colors",
                  isCurrent
                    ? "text-primary"
                    : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
