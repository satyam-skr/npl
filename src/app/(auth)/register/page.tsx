import { RegisterForm } from "@/components/auth/register-form";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  return <RegisterForm role={params.role} />;
}
