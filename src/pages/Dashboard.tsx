import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import {
  Rocket,
  LogOut,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  MessageSquare,
  Settings,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router";
import { ThemeToggle } from "@/components/ThemeToggle";

const recentActivity = [
  {
    id: "1",
    title: "Premium upgrade initiated",
    time: "2 minutes ago",
    status: "active",
  },
  {
    id: "2",
    title: "Email verification confirmed",
    time: "3 minutes ago",
    status: "complete",
  },
  {
    id: "3",
    title: "Account registered",
    time: "5 minutes ago",
    status: "complete",
  },
];

const quickActions = [
  {
    icon: ArrowUpRight,
    label: "Start Upgrade",
    description: "Begin the Premium verification process",
    href: "/verify",
  },
  {
    icon: MessageSquare,
    label: "Community",
    description: "Connect with other users",
    href: "/community",
  },
  {
    icon: Settings,
    label: "Account Settings",
    description: "Manage your profile and preferences",
    href: "/admin",
  },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate("/")}
          >
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
              onClick={() => navigate("/community")}
              className="hidden sm:inline-flex"
            >
              Community
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={handleSignOut}
              aria-label="Sign out"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">
            Dashboard
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
        </div>

        {/* Status Banner */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-chart-3/5">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Crown className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  Upgrade to Premium
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Unlock the full Alight Motion experience with a free one-year
                  Premium upgrade.
                </p>
              </div>
              <Button
                onClick={() => navigate("/verify")}
                className="shrink-0"
              >
                Start Upgrade
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <Card
                  key={action.label}
                  className="cursor-pointer hover:shadow-md hover:border-primary/20 transition-all duration-200"
                  onClick={() => navigate(action.href)}
                >
                  <CardHeader className="pb-2">
                    <div className="mb-2 size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <action.icon className="size-4" />
                    </div>
                    <CardTitle className="text-sm">{action.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Card>
              <CardContent className="py-0">
                <div className="divide-y">
                  {recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 py-3 first:pt-4 last:pb-4"
                    >
                      <div
                        className={`size-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          item.status === "complete"
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {item.status === "complete" ? (
                          <CheckCircle2 className="size-3.5" />
                        ) : (
                          <Clock className="size-3.5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-tight">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
