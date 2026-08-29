import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

const samplePosts = [
  {
    id: "1",
    author: "Alex Chen",
    time: "2 jam lalu",
    content:
      "Magic link masuk dalam beberapa detik. Pastikan cek folder spam kalau belum kelihatan.",
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    author: "Maria Santos",
    time: "5 jam lalu",
    content:
      "Ingat: tempel URL lengkap dari email. Jangan bagikan tautan verifikasi ke orang lain.",
    likes: 12,
    comments: 15,
  },
  {
    id: "3",
    author: "Jordan Park",
    time: "1 hari lalu",
    content:
      "Gunakan email yang sama dengan akun Alight Motion kamu supaya sesi jobId cocok.",
    likes: 45,
    comments: 22,
  },
];

export default function Community() {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState("");

  return (
    <AppShell>
      <p className="am-kicker mb-2">Komunitas</p>
      <h1 className="font-display text-3xl font-bold tracking-tight">Ruang diskusi</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Tips seputar alur verifikasi — bukan tempat menukar password atau tautan rahasia.
      </p>

      <div className="am-panel mt-8 p-5">
        <div className="flex gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center border border-primary text-sm font-bold text-primary">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <Input
              placeholder="Tulis pertanyaan tanpa menyertakan tautan verifikasi..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="h-11 rounded-sm"
            />
            <div className="mt-2 flex justify-end">
              <Button
                size="sm"
                className="rounded-sm"
                disabled={!newPost.trim()}
                onClick={() => setNewPost("")}
              >
                <Send className="size-3.5" />
                Kirim
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {samplePosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.05 }}
            className="am-panel p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center border border-border text-sm font-bold">
                {post.author.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{post.author}</span>
                  <span className="text-xs text-muted-foreground">{post.time}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed">{post.content}</p>
                <div className="mt-3 flex items-center gap-4">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                  >
                    <Heart className="size-3.5" />
                    {post.likes}
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                  >
                    <MessageCircle className="size-3.5" />
                    {post.comments}
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </AppShell>
  );
}
