import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | null | undefined) {
  return `₹${(value ?? 0).toLocaleString("en-IN")}`;
}

export function invariantResponse(condition: unknown, message: string, status = 400) {
  if (!condition) {
    return Response.json({ error: message }, { status });
  }
  return null;
}
