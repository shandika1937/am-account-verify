import { BrandMark } from "@/components/BrandMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

const navItems = [
  { href: "/dashboard", label: "Dasbor", icon: LayoutDashboard },
  { href: "/verify", label: "Verifikasi", icon: ShieldCheck },
  { href: "/community", label: "Komunitas", icon: Users },
  { href: "/admin", label: "Admin", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background md:grid md:grid-cols-[240px_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r bg-sidebar md:flex">
        <div className="flex h-16 items-center border-b px-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer"
            aria-label="Beranda"
          >
            <BrandMark />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Button
                key={item.href}
                variant={active ? "secondary" : "ghost"}
                className={cn(
                  "justify-start gap-2",
                  active && "border border-primary/30 text-primary",
                )}
                onClick={() => navigate(item.href)}
              >
                <item.icon className="size-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
        <div className="flex items-center justify-between border-t p-3">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            aria-label="Keluar"
          >
            <LogOut className="size-4" />
            Keluar
          </Button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:hidden">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer"
            aria-label="Beranda"
          >
            <BrandMark />
          </button>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={handleSignOut}
              aria-label="Keluar"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b px-3 py-2 md:hidden">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Button
                key={item.href}
                size="sm"
                variant={active ? "secondary" : "ghost"}
                className={cn(active && "text-primary")}
                onClick={() => navigate(item.href)}
              >
                <item.icon className="size-3.5" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
