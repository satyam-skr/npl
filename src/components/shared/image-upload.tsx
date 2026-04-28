"use client";

import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";

export function ImageUpload() {
  return (
    <UploadDropzone
      endpoint="profileAvatar"
      onClientUploadComplete={() => { toast.success("Upload complete"); }}
      onUploadError={(error) => { toast.error(error.message); }}
    />
  );
}
