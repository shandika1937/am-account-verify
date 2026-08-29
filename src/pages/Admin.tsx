import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Rocket,
  ArrowLeft,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  BarChart3,
  Settings,
  Shield,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";

const stats = [
  { label: "Total Users", value: "1,248", icon: Users, change: "+12%" },
  { label: "Upgrades Today", value: "47", icon: TrendingUp, change: "+8%" },
  { label: "Completed", value: "1,180", icon: CheckCircle2, change: "94.5%" },
  { label: "Pending", value: "21", icon: Clock, change: "Active" },
];

const recentUpgrades = [
  {
    id: "UPG-001",
    email: "user1@example.com",
    status: "completed",
    date: "Aug 29, 2026",
  },
  {
    id: "UPG-002",
    email: "user2@example.com",
    status: "pending",
    date: "Aug 29, 2026",
  },
  {
    id: "UPG-003",
    email: "user3@example.com",
    status: "completed",
    date: "Aug 28, 2026",
  },
  {
    id: "UPG-004",
    email: "user4@example.com",
    status: "failed",
    date: "Aug 28, 2026",
  },
  {
    id: "UPG-005",
    email: "user5@example.com",
    status: "completed",
    date: "Aug 27, 2026",
  },
];

const statusStyles: Record<string, string> = {
  completed:
    "bg-green-500/10 text-green-600 dark:text-green-400",
  pending:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  failed:
    "bg-destructive/10 text-destructive",
};

const statusIcons: Record<string, React.ElementType> = {
  completed: CheckCircle2,
  pending: Clock,
  failed: XCircle,
};

export default function Admin() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
              onClick={() => navigate("/dashboard")}
              aria-label="Go back to dashboard"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
                <Rocket className="size-4.5" />
              </div>
              <span className="text-lg font-bold tracking-tight">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Admin Panel
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage users, monitor upgrades, and configure settings.
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="size-4" />
            Settings
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="py-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <stat.icon className="size-4" />
                    </div>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Upgrades Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="size-4" />
                  Recent Upgrades
                </CardTitle>
                <CardDescription>
                  Latest upgrade requests and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {recentUpgrades.map((upgrade) => {
                    const StatusIcon = statusIcons[upgrade.status];
                    return (
                      <div
                        key={upgrade.id}
                        className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="text-xs font-mono text-muted-foreground shrink-0 w-16">
                            {upgrade.id}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {upgrade.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {upgrade.date}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${statusStyles[upgrade.status]}`}
                        >
                          <StatusIcon className="size-3" />
                          {upgrade.status.charAt(0).toUpperCase() + upgrade.status.slice(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="size-4" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "API Response", value: "42ms", ok: true },
                  { label: "Verification Service", value: "Online", ok: true },
                  { label: "Email Service", value: "Online", ok: true },
                  { label: "Database", value: "Online", ok: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                    <span
                      className={`text-sm font-medium ${item.ok ? "text-green-600 dark:text-green-400" : "text-destructive"}`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="size-4" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Rate limiting active",
                  "Input sanitization enabled",
                  "API keys secured server-side",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-3.5 text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
