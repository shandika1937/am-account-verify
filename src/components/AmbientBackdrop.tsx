export function AmbientBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="am-grid absolute inset-0 opacity-60 dark:opacity-40" />
      <div className="absolute -top-32 right-[-8%] size-[28rem] rounded-full bg-primary/15 blur-3xl dark:bg-primary/20" />
      <div className="absolute bottom-[-20%] left-[-10%] size-[26rem] rounded-full bg-chart-2/12 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 size-64 -translate-x-1/2 rounded-full bg-chart-3/10 blur-3xl" />
    </div>
  );
}
