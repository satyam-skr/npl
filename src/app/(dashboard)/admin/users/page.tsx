import { Ban, Search, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/shared/page-header";

const users = [
  { name: "Auction Admin", email: "admin@npl.dev", role: "ADMIN" },
  { name: "Phoenix Manager", email: "phoenix@npl.dev", role: "MANAGER" },
  { name: "Viewer", email: "viewer@npl.dev", role: "VIEWER" },
];

export default function ManageUsersPage() {
  return (
    <>
      <PageHeader title="Manage Users" description="Role changes, bans, impersonation, and better-auth user administration." />
      <Card>
        <CardHeader><CardTitle>Users</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2"><Input placeholder="Search by email or username" /><Button variant="outline"><Search className="h-4 w-4" /></Button></div>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.email} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3">
                <div><p className="font-semibold">{user.name}</p><p className="text-sm text-muted-foreground">{user.email}</p></div>
                <div className="flex gap-2">
                  <select defaultValue={user.role} className="h-10 rounded-lg border bg-input px-3 text-sm"><option>ADMIN</option><option>AUCTIONEER</option><option>MANAGER</option><option>VIEWER</option></select>
                  <Button variant="outline" size="icon"><UserCog className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="icon"><Ban className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
