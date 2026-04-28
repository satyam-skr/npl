"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/lib/uploadthing";

export function PlayerUploadForm() {
  return (
    <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); toast.success("Player saved locally. Connect the database to persist it."); }}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2"><Label>Name</Label><Input required /></div>
        <div className="space-y-2"><Label>Jersey #</Label><Input type="number" /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2"><Label>Skill</Label><select className="h-10 w-full rounded-lg border bg-input px-3 text-sm"><option>BATTING</option><option>BOWLING</option><option>ALL_ROUNDER</option></select></div>
        <div className="space-y-2"><Label>Base price</Label><Input type="number" required /></div>
      </div>
      <div className="space-y-2"><Label>Photo</Label><UploadButton endpoint="playerPhoto" onClientUploadComplete={() => { toast.success("Upload complete"); }} onUploadError={(error) => { toast.error(error.message); }} /></div>
      <Button variant="gradient">Save Player</Button>
    </form>
  );
}
