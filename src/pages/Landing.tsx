import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Rocket,
  Mail,
  Link2,
  CheckCircle2,
  ArrowRight,
  Zap,
  Lock,
  Shield,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const features = [
  {
    icon: Mail,
    title: "Enter Your Email",
    description:
      "Start by providing the email linked to your Alight Motion account. We'll send you a secure verification link.",
  },
  {
    icon: Link2,
    title: "Confirm Your Identity",
    description:
      "Click the link in your inbox and paste it back here. This proves the account is yours.",
  },
  {
    icon: CheckCircle2,
    title: "Enjoy Premium",
    description:
      "Once verified, your account is upgraded to Premium for a full year — instantly and at no cost.",
  },
];

const stats = [
  { value: "100K+", label: "Upgrades Completed" },
  { value: "99.9%", label: "Uptime" },
  { value: "<60s", label: "Average Time" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
              <Rocket className="size-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Upgrader AM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={() => navigate("/verify")}
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 size-96 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-chart-3/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-secondary/60 px-4 py-1.5 text-xs font-medium text-secondary-foreground mb-6">
              <Zap className="size-3 text-primary" />
              Free Premium Upgrade
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Upgrade your{" "}
              <span className="bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
                Alight Motion
              </span>{" "}
              to Premium
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Get a full year of Alight Motion Premium — completely free.
              Verify your account in under a minute and unlock every premium
              feature instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="h-12 px-8 text-base font-medium group"
                onClick={() => navigate("/verify")}
              >
                Start Upgrade
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base"
                onClick={() => {
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                How It Works
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Three simple steps to unlock a full year of Premium
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20"
              >
                <div className="absolute top-6 right-6 text-4xl font-bold text-muted/30 select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mb-4 inline-flex items-center justify-center size-11 rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Everything Premium offers
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Your upgrade unlocks the complete Alight Motion experience
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Star, text: "All premium effects and presets" },
              { icon: ArrowUpRight, text: "Higher export resolution and frame rate" },
              { icon: Zap, text: "Advanced keyframe animation tools" },
              { icon: Shield, text: "Watermark-free exports" },
              { icon: CheckCircle2, text: "Priority rendering pipeline" },
              { icon: Lock, text: "Full library of fonts and visual assets" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3 rounded-lg border bg-card p-4"
              >
                <div className="size-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="size-4" />
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="border-t bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border bg-card p-8 sm:p-12 shadow-sm"
          >
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  Built with security in mind
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Your data is processed through encrypted connections at every
                  step. We never store your passwords or sensitive information.
                </p>
                <div className="space-y-3">
                  {[
                    "End-to-end encrypted connections",
                    "No passwords stored or transmitted",
                    "API keys secured server-side only",
                    "No data retained after verification",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="size-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="size-32 rounded-3xl bg-primary/10 flex items-center justify-center">
                    <Lock className="size-12 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 size-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="size-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to go Premium?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              The entire process takes less than a minute. Start now and start
              creating without limits.
            </p>
            <Button
              size="lg"
              className="h-12 px-8 text-base font-medium group"
              onClick={() => navigate("/verify")}
            >
              Start Upgrade
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-7 rounded-md bg-primary text-primary-foreground">
                <Rocket className="size-3.5" />
              </div>
              <span className="text-sm font-bold">Upgrader AM</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Alight Motion Premium Upgrade Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
