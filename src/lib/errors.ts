/**
 * Maps backend / network failures to short, user-facing Indonesian copy.
 * Never surfaces stack traces, API keys, or raw verification links.
 */
export function mapVerificationError(err: unknown): string {
  const raw = err instanceof Error ? err.message : "";
  const message = raw.toLowerCase();

  if (message.includes("429") || message.includes("too many") || message.includes("rate")) {
    return "Terlalu banyak permintaan. Tunggu sebentar, lalu coba lagi.";
  }
  if (message.includes("timeout") || message.includes("timed out") || message.includes("abort")) {
    return "Koneksi habis waktu. Periksa jaringan kamu dan coba lagi.";
  }
  if (message.includes("500") || message.includes("server error") || message.includes("internal")) {
    return "Server sedang bermasalah. Coba beberapa saat lagi.";
  }
  if (message.includes("expired") || message.includes("job")) {
    return "Sesi verifikasi sudah kedaluwarsa. Mulai ulang dengan mengirim magic link baru.";
  }
  if (message.includes("invalid url") || message.includes("not valid") || message.includes("link")) {
    return "Link verifikasi tidak valid. Salin ulang tautan dari email kamu.";
  }
  if (message.includes("email")) {
    return "Email tidak valid. Periksa ejaan dan coba lagi.";
  }
  if (message.includes("network") || message.includes("failed to fetch")) {
    return "Tidak bisa terhubung ke server. Periksa koneksi internet kamu.";
  }

  return raw || "Terjadi kesalahan. Silakan coba lagi.";
}
