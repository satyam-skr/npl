export function RoleGuard({ allowed, role, children }: { allowed: string[]; role?: string | null; children: React.ReactNode }) {
  if (!role || !allowed.includes(role)) return null;
  return <>{children}</>;
}
