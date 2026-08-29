import { z } from "zod";

/**
 * Email validation schema.
 * Validates that the input is a properly formatted email address.
 */
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email is too long")
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
    .min(1, "Verification link is required")
    .url("Please enter a valid URL")
    .refine(
      (val) => val.startsWith("http://") || val.startsWith("https://"),
      "URL must start with http:// or https://",
    ),
});

export type VerificationLinkFormData = z.infer<typeof verificationLinkSchema>;
