import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className="relative flex size-8 items-center justify-center border border-primary bg-primary text-primary-foreground"
        aria-hidden
      >
        <span className="font-display text-[11px] font-extrabold tracking-tight">
          AM
        </span>
        <span className="absolute -bottom-px -right-px size-1.5 bg-chart-2" />
      </div>
      {!compact && (
        <div className="leading-none">
          <p className="font-display text-[15px] font-bold tracking-tight">
            AM Account
          </p>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Verification
          </p>
        </div>
      )}
    </div>
  );
}
