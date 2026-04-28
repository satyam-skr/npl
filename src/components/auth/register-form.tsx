"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";

export function RegisterForm({ role = "MANAGER" }: { role?: string }) {
  async function handleSubmit(formData: FormData) {
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const payload = {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password,
        username: String(formData.get("username") ?? ""),
        callbackURL: "/dashboard",
        role: String(formData.get("role") ?? "MANAGER"),
      };
      await signUp.email(payload as never);
      toast.success("Account created. You can sign in now.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to register");
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Managers and viewers can register publicly. Admin accounts should be promoted by an administrator.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" name="name" required /></div>
            <div className="space-y-2"><Label htmlFor="username">Username</Label><Input id="username" name="username" minLength={3} required /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" minLength={8} required /></div>
            <div className="space-y-2"><Label htmlFor="confirm">Confirm</Label><Input id="confirm" name="confirm" type="password" minLength={8} required /></div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select id="role" name="role" defaultValue={role === "AUCTIONEER" ? "VIEWER" : role} className="h-10 w-full rounded-lg border bg-input px-3 text-sm">
              <option value="MANAGER">Team Manager</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </div>
          <Button type="submit" className="w-full" variant="gradient">Register</Button>
        </form>
      </CardContent>
    </Card>
  );
}
