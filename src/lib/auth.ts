import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, emailOTP, magicLink, username } from "better-auth/plugins";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = process.env.RESEND_API_KEY?.startsWith("re_") ? new Resend(process.env.RESEND_API_KEY) : null;
const isLocalPreview =
  (process.env.BETTER_AUTH_URL ?? "").includes("localhost") ||
  (process.env.NEXT_PUBLIC_APP_URL ?? "").includes("localhost");
const trustedOrigins = Array.from(
  new Set(
    [
      process.env.BETTER_AUTH_URL,
      process.env.NEXT_PUBLIC_APP_URL,
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
    ].filter((value): value is string => Boolean(value)),
  ),
);

async function sendEmail(to: string, subject: string, html: string) {
  if (!resend || !process.env.EMAIL_FROM) {
    console.info(`[email skipped] ${subject} -> ${to}`);
    return;
  }
  await resend.emails.send({ from: process.env.EMAIL_FROM, to, subject, html });
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: !isLocalPreview,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail(user.email, "NPL - Reset your password", `<p>Reset your password: <a href="${url}">${url}</a></p>`);
    },
  },
  emailVerification: {
    sendOnSignUp: !isLocalPreview,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail(user.email, "NPL - Verify your email", `<p>Verify your email: <a href="${url}">${url}</a></p>`);
    },
  },
  plugins: [
    admin({ defaultRole: "MANAGER", adminRole: "ADMIN", impersonationSessionDuration: 60 * 60 }),
    username({ minUsernameLength: 3, maxUsernameLength: 20 }),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmail(email, "NPL - Your magic link", `<p>Sign in to NPL: <a href="${url}">${url}</a></p>`);
      },
    }),
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        await sendEmail(email, `NPL - ${type} OTP`, `<p>Your NPL OTP is <strong>${otp}</strong>.</p>`);
      },
      otpLength: 6,
      expiresIn: 600,
    }),
  ],
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "MANAGER", required: false },
      username: { type: "string", required: false },
    },
  },
  session: {
    cookieCache: { enabled: true, maxAge: 60 * 5 },
  },
  trustedOrigins,
});

export type Session = typeof auth.$Infer.Session;
