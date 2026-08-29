import { cn } from "@/lib/utils";
import { Check, Link2, Mail, ShieldCheck } from "lucide-react";

const steps = [
  { id: "email", label: "Email", icon: Mail },
  { id: "waiting", label: "Verifikasi Email", icon: Mail },
  { id: "link", label: "Verifikasi Link", icon: Link2 },
  { id: "success", label: "Selesai", icon: ShieldCheck },
] as const;

export type StepId = (typeof steps)[number]["id"];

interface StepProgressProps {
  currentStep: StepId;
}

export function StepProgress({ currentStep }: StepProgressProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <ol className="mx-auto mb-10 flex w-full max-w-xl items-start justify-between">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const Icon = step.icon;

        return (
          <li key={step.id} className="relative flex flex-1 flex-col items-center">
            {index < steps.length - 1 && (
              <span
                className={cn(
                  "absolute top-4 left-[calc(50%+18px)] right-[calc(-50%+18px)] h-px",
                  isCompleted ? "bg-primary" : "bg-border",
                )}
                aria-hidden
              />
            )}
            <span
              className={cn(
                "relative z-10 flex size-8 items-center justify-center border text-xs font-semibold transition-colors",
                isCompleted && "border-primary bg-primary text-primary-foreground",
                isCurrent && "border-primary bg-primary text-primary-foreground",
                !isCompleted &&
                  !isCurrent &&
                  "border-border bg-background text-muted-foreground",
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isCompleted ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
            </span>
            <span
              className={cn(
                "mt-2 hidden text-center text-[10px] font-semibold uppercase tracking-[0.14em] sm:block",
                isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
