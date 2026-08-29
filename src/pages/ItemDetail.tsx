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
  CheckCircle2,
  Clock,
  XCircle,
  User,
  Mail,
  Calendar,
  Hash,
  MessageSquare,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const sampleItem = {
  id: "UPG-001",
  email: "user@example.com",
  status: "completed",
  createdAt: "Aug 29, 2026, 10:30 AM",
  completedAt: "Aug 29, 2026, 10:31 AM",
  jobId: "am-verify-1724925000-abc123",
  steps: [
    {
      label: "Email submitted",
      time: "10:30 AM",
      status: "complete" as const,
    },
    {
      label: "Verification link sent",
      time: "10:30 AM",
      status: "complete" as const,
    },
    {
      label: "Link verified",
      time: "10:31 AM",
      status: "complete" as const,
    },
    {
      label: "Premium activated",
      time: "10:31 AM",
      status: "complete" as const,
    },
  ],
  comments: [
    {
      id: "1",
      author: "System",
      text: "Upgrade process initiated automatically.",
      time: "10:30 AM",
    },
    {
      id: "2",
      author: "System",
      text: "Premium access granted for 1 year.",
      time: "10:31 AM",
    },
  ],
};

export default function ItemDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");

  const item = sampleItem;

  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      label: "Completed",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-500/10",
    },
    pending: {
      icon: Clock,
      label: "Pending",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    failed: {
      icon: XCircle,
      label: "Failed",
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  };

  const status = statusConfig[item.status as keyof typeof statusConfig];
  const StatusIcon = status.icon;

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
              onClick={() => navigate(-1)}
              aria-label="Go back"
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
              <span className="text-lg font-bold tracking-tight">
                Upgrade Details
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <Hash className="size-4 text-muted-foreground" />
            <span className="text-sm font-mono text-muted-foreground">
              {item.id}
            </span>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}
          >
            <StatusIcon className="size-3" />
            {status.label}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Upgrade Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <div className="flex items-center gap-2">
                      <Mail className="size-3.5 text-muted-foreground" />
                      <p className="text-sm font-medium">{item.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Requested
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-3.5 text-muted-foreground" />
                      <p className="text-sm font-medium">{item.createdAt}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Completed
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 text-green-500" />
                      <p className="text-sm font-medium">{item.completedAt}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Job ID
                    </p>
                    <p className="text-sm font-mono text-muted-foreground truncate">
                      {item.jobId}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Progress Timeline</CardTitle>
                <CardDescription>
                  Step-by-step upgrade progression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Connector line */}
                  <div className="absolute left-[13px] top-3 bottom-3 w-px bg-border" />
                  <div className="space-y-4">
                    {item.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        className="flex items-start gap-3 relative"
                      >
                        <div
                          className={`size-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                            step.status === "complete"
                              ? "bg-green-500 text-white"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {step.status === "complete" ? (
                            <CheckCircle2 className="size-3.5" />
                          ) : (
                            <span className="text-xs font-bold">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div className="pt-0.5">
                          <p className="text-sm font-medium">{step.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {step.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="size-4" />
                  Comments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {item.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-3"
                  >
                    <div className="size-7 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-bold shrink-0">
                      {comment.author.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {comment.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Add comment */}
                <div className="flex gap-3 pt-2 border-t">
                  <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 h-9 rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    />
                    <Button
                      size="icon"
                      className="size-9 shrink-0"
                      disabled={!newComment.trim()}
                      onClick={() => setNewComment("")}
                    >
                      <Send className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span
                    className={`text-sm font-medium ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Duration
                  </span>
                  <span className="text-sm font-medium">&lt; 1 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Premium Until
                  </span>
                  <span className="text-sm font-medium">Aug 29, 2027</span>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
