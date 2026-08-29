import { Button } from "@/components/ui/button";
import { Rocket, ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-background"
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
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
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-6xl font-bold text-primary/20 mb-4">404</p>
            <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3"
          >
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="size-4" />
              Go Back
            </Button>
            <Button onClick={() => navigate("/")}>
              <Home className="size-4" />
              Home
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
