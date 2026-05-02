"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";

export function LoginForm() {
  const [mode, setMode] = useState<"password" | "magic" | "otp">("password");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(formData: FormData) {
    const value = String(formData.get("email") ?? "");
    try {
      if (mode === "password") {
        await signIn.email({ email: value, password: String(formData.get("password") ?? ""), callbackURL: "/dashboard" });
        toast.success("Signed in successfully");
      } else if (mode === "magic") {
        await signIn.magicLink({ email: value, callbackURL: "/dashboard" });
        toast.success("Check your inbox for the magic link");
      } else {
        await signIn.emailOtp({ email: value });
        setEmail(value);
        toast.info("OTP sent to your email");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in");
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Choose a sign-in method for the auction console.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-5 grid grid-cols-3 gap-2">
          {[
            ["password", "Password"],
            ["magic", "Magic Link"],
            ["otp", "OTP"],
          ].map(([value, label]) => (
            <Button key={value} type="button" variant={mode === value ? "default" : "outline"} size="sm" onClick={() => setMode(value as typeof mode)}>{label}</Button>
          ))}
        </div>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="manager@npl.dev" defaultValue={email} required />
          </div>
          {mode === "password" ? (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? "text" : "password"} required />
                <button type="button" className="absolute right-3 top-2.5 text-muted-foreground" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ) : null}
          {mode === "otp" && email ? (
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, index) => <Input key={index} maxLength={1} inputMode="numeric" className="text-center text-lg font-bold" />)}
            </div>
          ) : null}
          <Button type="submit" className="w-full" variant="gradient">
            {mode === "magic" ? <Mail className="h-4 w-4" /> : null}
            {mode === "password" ? "Sign in" : mode === "magic" ? "Send Magic Link" : "Send OTP"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">Do not have an account? <Link className="font-semibold text-foreground" href="/register">Register</Link></p>
      </CardContent>
    </Card>
  );
}
