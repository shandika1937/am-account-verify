import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Hash,
  Mail,
  MessageSquare,
  Send,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const sampleItem = {
  id: "JOB-001",
  email: "user@example.com",
  status: "completed",
  createdAt: "29 Agu 2026, 10:30",
  completedAt: "29 Agu 2026, 10:31",
  jobId: "am-verify-session",
  steps: [
    { label: "Email dikirim", time: "10:30", status: "complete" as const },
    { label: "Magic link terkirim", time: "10:30", status: "complete" as const },
    { label: "Link diverifikasi", time: "10:31", status: "complete" as const },
    { label: "Selesai", time: "10:31", status: "complete" as const },
  ],
  comments: [
    {
      id: "1",
      author: "Sistem",
      text: "Sesi verifikasi dimulai.",
      time: "10:30",
    },
    {
      id: "2",
      author: "Sistem",
      text: "Verifikasi berhasil. Tidak ada credential yang disimpan.",
      time: "10:31",
    },
  ],
};

export default function ItemDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");

  const item = { ...sampleItem, id: id || sampleItem.id };

  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      label: "Berhasil",
      color: "text-chart-2",
    },
    pending: {
      icon: Clock,
      label: "Menunggu",
      color: "text-primary",
    },
    failed: {
      icon: XCircle,
      label: "Gagal",
      color: "text-destructive",
    },
  };

  const status = statusConfig[item.status as keyof typeof statusConfig];
  const StatusIcon = status.icon;

  return (
    <AppShell>
      <div className="mb-6 flex items-center gap-3">
        <Hash className="size-4 text-muted-foreground" />
        <span className="font-mono text-sm text-muted-foreground">{item.id}</span>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${status.color}`}>
          <StatusIcon className="size-3" />
          {status.label}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="am-panel p-5">
            <h2 className="font-display text-base font-bold">Detail sesi</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-muted-foreground" />
                  <p className="text-sm font-medium">{item.email}</p>
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Diminta</p>
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5 text-muted-foreground" />
                  <p className="text-sm font-medium">{item.createdAt}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="am-panel p-5">
            <h2 className="font-display text-base font-bold">Timeline</h2>
            <div className="relative mt-4">
              <div className="absolute top-3 bottom-3 left-[13px] w-px bg-border" />
              <div className="space-y-4">
                {item.steps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.08 }}
                    className="relative flex items-start gap-3"
                  >
                    <div className="z-10 flex size-7 shrink-0 items-center justify-center bg-chart-2 text-background">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-medium">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="am-panel p-5">
            <h2 className="mb-4 flex items-center gap-2 font-display text-base font-bold">
              <MessageSquare className="size-4" />
              Catatan
            </h2>
            {item.comments.map((comment) => (
              <div key={comment.id} className="mb-3 flex items-start gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center border border-border text-xs font-bold">
                  {comment.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{comment.text}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 flex gap-2 border-t pt-3">
              <div className="flex size-7 shrink-0 items-center justify-center border border-primary text-xs font-bold text-primary">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <input
                type="text"
                placeholder="Tambah catatan..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="h-9 flex-1 border bg-transparent px-3 text-sm outline-none focus-visible:border-ring"
              />
              <Button
                size="icon"
                className="size-9 shrink-0 rounded-sm"
                disabled={!newComment.trim()}
                onClick={() => setNewComment("")}
              >
                <Send className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="am-panel p-5">
            <h2 className="font-display text-base font-bold">Ringkas</h2>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-medium ${status.color}`}>{status.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Durasi</span>
                <span className="font-medium">&lt; 1 mnt</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full rounded-sm"
            onClick={() => navigate("/dashboard")}
          >
            Kembali ke dasbor
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
