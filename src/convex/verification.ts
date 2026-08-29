"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Mock adapter for Alight Motion verification API.
 *
 * This is a mock implementation used for testing and development.
 * When Alight Motion provides an official API with clear terms for
 * verification, replace this adapter with the real implementation.
 *
 * SECURITY: All API keys are read from environment variables on the
 * server side only. They are NEVER exposed to the frontend.
 */

// In-memory store for mock verification state (reset on server restart)
const mockVerificationStore = new Map<
  string,
  { email: string; createdAt: number; verified: boolean }
>();

/**
 * Request verification magic link.
 * This action sends a verification request to the Alight Motion API.
 * In production, this would call the real API using the ALIGHT_MOTION_API_KEY.
 */
export const requestVerification = action({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const apiKey = process.env.ALIGHT_MOTION_API_KEY;

    // Log the presence of the API key for debugging (never log the value)
    if (!apiKey) {
      console.warn(
        "[Verification] ALIGHT_MOTION_API_KEY not configured. Using mock mode.",
      );
    }

    // Rate limiting check - simple in-memory approach
    const now = Date.now();
    const recentRequests = Array.from(mockVerificationStore.values()).filter(
      (v) => v.email === args.email && now - v.createdAt < 60_000, // 1 minute window
    );

    if (recentRequests.length >= 3) {
      throw new Error(
        "Terlalu banyak permintaan. Tunggu sebentar, lalu coba lagi.",
      );
    }

    // Generate a unique job ID
    const jobId = `am-verify-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    // Store the verification request (mock mode)
    mockVerificationStore.set(jobId, {
      email: args.email,
      createdAt: now,
      verified: false,
    });

    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Clean up old entries (older than 1 hour)
    for (const [key, value] of mockVerificationStore.entries()) {
      if (now - value.createdAt > 3_600_000) {
        mockVerificationStore.delete(key);
      }
    }

    return {
      success: true,
      jobId,
      message: "Verification request sent successfully",
    };
  },
});

/**
 * Submit verification link for processing.
 * This action receives the verification link from the user and
 * processes it through the verification API.
 */
export const submitVerificationLink = action({
  args: {
    jobId: v.string(),
    link: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate the job ID exists
    const verification = mockVerificationStore.get(args.jobId);

    if (!verification) {
      throw new Error(
        "Sesi verifikasi sudah kedaluwarsa. Mulai ulang dengan mengirim magic link baru.",
      );
    }

    // Check if the verification request has expired (1 hour)
    const now = Date.now();
    if (now - verification.createdAt > 3_600_000) {
      mockVerificationStore.delete(args.jobId);
      throw new Error(
        "Sesi verifikasi sudah kedaluwarsa. Mulai ulang dengan mengirim magic link baru.",
      );
    }

    // Validate the link format
    try {
      new URL(args.link);
    } catch {
      throw new Error(
        "The verification link is not valid. Please check the link and try again.",
      );
    }

    // Simulate API call to verify the link
    // In production, this would call the real Alight Motion verification API
    const apiKey = process.env.ALIGHT_MOTION_API_KEY;
    if (!apiKey) {
      // Mock mode: simulate successful verification
      console.warn(
        "[Verification] Mock mode: simulating successful verification",
      );
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Mark as verified
    verification.verified = true;
    mockVerificationStore.set(args.jobId, verification);

    return {
      success: true,
      email: verification.email,
      message: "Verification completed successfully",
    };
  },
});
