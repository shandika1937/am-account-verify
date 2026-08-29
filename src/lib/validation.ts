import { z } from "zod";

/**
 * Email validation schema.
 * Validates that the input is a properly formatted email address.
 */
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Masukkan alamat email yang valid")
    .max(254, "Email terlalu panjang")
    .transform((val) => val.trim().toLowerCase()),
});

export type EmailFormData = z.infer<typeof emailSchema>;

/**
 * Verification link validation schema.
 * Validates that the input is a properly formatted URL.
 */
export const verificationLinkSchema = z.object({
  link: z
    .string()
    .min(1, "Link verifikasi wajib diisi")
    .url("Masukkan URL yang valid")
    .refine(
      (val) => val.startsWith("http://") || val.startsWith("https://"),
      "URL harus diawali http:// atau https://",
    ),
});

export type VerificationLinkFormData = z.infer<typeof verificationLinkSchema>;
