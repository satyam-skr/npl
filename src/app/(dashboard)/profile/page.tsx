import { ImageUpload } from "@/components/shared/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="Profile" description="Avatar, account details, active sessions, and security settings." />
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card><CardHeader><CardTitle>Avatar Upload</CardTitle></CardHeader><CardContent><ImageUpload /></CardContent></Card>
        <Card>
          <CardHeader><CardTitle>Account</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Name</Label><Input defaultValue="Development User" /></div>
              <div className="space-y-2"><Label>Username</Label><Input defaultValue="dev-admin" /></div>
            </div>
            <div className="space-y-2"><Label>Bio</Label><Input defaultValue="NPL auction operator" /></div>
            <Button variant="gradient">Save changes</Button>
          </CardContent>
        </Card>
        <Card className="xl:col-span-2"><CardHeader><CardTitle>Danger Zone</CardTitle></CardHeader><CardContent><Button variant="destructive">Delete account</Button></CardContent></Card>
      </div>
    </>
  );
}
