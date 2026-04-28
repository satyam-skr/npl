import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader><CardTitle>Verify your email</CardTitle></CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p>Open the verification link sent to your inbox. Once verified, return to the dashboard.</p>
        <Button asChild variant="gradient"><Link href="/login">Back to sign in</Link></Button>
      </CardContent>
    </Card>
  );
}
