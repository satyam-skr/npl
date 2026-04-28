import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session && process.env.NODE_ENV !== "development") {
    redirect("/login");
  }

  const user = session?.user as { name?: string | null; email?: string | null; role?: string | null } | undefined;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user ?? { name: "Development User", email: "dev@npl.local", role: "ADMIN" }} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="flex-1 px-4 pb-24 pt-6 lg:px-8">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
