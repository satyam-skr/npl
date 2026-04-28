"use client";

import { Button } from "@/components/ui/button";

export function ConfirmDialog({ label = "Confirm", onConfirm }: { label?: string; onConfirm?: () => void }) {
  return <Button variant="destructive" onClick={onConfirm}>{label}</Button>;
}
