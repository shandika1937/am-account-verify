import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Rocket,
  ArrowLeft,
  Users,
  CheckCircle2,
  Clock,
  MessageSquare,
  Send,
  Search,
  Heart,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const samplePosts = [
  {
    id: "1",
    author: "Alex Chen",
    time: "2 hours ago",
    content:
      "Just completed my upgrade! The whole process took less than 30 seconds. Highly recommend.",
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    author: "Maria Santos",
    time: "5 hours ago",
    content:
      "Does anyone know if the premium features include all the new effects from the latest update?",
    likes: 12,
    comments: 15,
  },
  {
    id: "3",
    author: "Jordan Park",
    time: "1 day ago",
    content:
      "Pro tip: Make sure your email is the same one you used when you first signed up for Alight Motion. That made the process seamless.",
    likes: 45,
    comments: 22,
  },
];

export default function Community() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [newPost, setNewPost] = useState("");

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
              <span className="text-lg font-bold tracking-tight">
                Community
              </span>
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

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground mt-1">
            Share tips, ask questions, and connect with other users.
          </p>
        </div>

        {/* New post */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Share something with the community..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="h-11"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    size="sm"
                    disabled={!newPost.trim()}
                    onClick={() => setNewPost("")}
                  >
                    <Send className="size-3.5" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="space-y-4">
          {samplePosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover:border-primary/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="size-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-bold shrink-0">
                      {post.author.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {post.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.time}
                        </span>
                      </div>
                      <p className="text-sm mt-2 leading-relaxed">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <Heart className="size-3.5" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="size-3.5" />
                          {post.comments}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
