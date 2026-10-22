import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";
import { PREVIEW_ROUTE_ROBOTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Login | Sociality",
  description: "Log in to Sociality.",
  robots: PREVIEW_ROUTE_ROBOTS,
};

export default function LoginPage() {
  return <LoginForm />;
}
