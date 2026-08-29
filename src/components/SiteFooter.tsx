import { BrandMark } from "@/components/BrandMark";
import { useNavigate } from "react-router";

export function SiteFooter() {
  const navigate = useNavigate();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer self-start"
          aria-label="Beranda"
        >
          <BrandMark />
        </button>
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
          Membantu proses verifikasi akun Alight Motion secara resmi. Kami tidak
          menyimpan password dan tidak mengklaim status Premium.
        </p>
      </div>
    </footer>
  );
}
