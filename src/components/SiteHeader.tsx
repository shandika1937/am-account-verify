import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface SiteHeaderProps {
  showCta?: boolean;
}

export function SiteHeader({ showCta = true }: SiteHeaderProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [open, setOpen] = useState(false);

  const go = (path: string) => {
    setOpen(false);
    if (path.startsWith("/#")) {
      const id = path.slice(2);
      if (window.location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => go("/")}
          className="cursor-pointer"
          aria-label="Beranda AM Account Verification"
        >
          <BrandMark />
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" onClick={() => go("/#alur")}>
            Alur
          </Button>
          <Button variant="ghost" size="sm" onClick={() => go("/#keamanan")}>
            Keamanan
          </Button>
          {!isLoading && isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={() => go("/dashboard")}>
              Dasbor
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => go("/auth")}>
              Masuk
            </Button>
          )}
          <ThemeToggle />
          {showCta && (
            <Button size="sm" className="ml-1" onClick={() => go("/verify")}>
              Mulai Verifikasi
              <ArrowRight className="size-3.5" />
            </Button>
          )}
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="size-9"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-background px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <Button variant="ghost" className="justify-start" onClick={() => go("/#alur")}>
              Alur
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => go("/#keamanan")}>
              Keamanan
            </Button>
            {!isLoading && isAuthenticated ? (
              <Button variant="ghost" className="justify-start" onClick={() => go("/dashboard")}>
                Dasbor
              </Button>
            ) : (
              <Button variant="ghost" className="justify-start" onClick={() => go("/auth")}>
                Masuk
              </Button>
            )}
            {showCta && (
              <Button className="mt-1" onClick={() => go("/verify")}>
                Mulai Verifikasi
                <ArrowRight className="size-3.5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
