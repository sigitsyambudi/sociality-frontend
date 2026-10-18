import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login | Sociality",
  description: "Log in to Sociality.",
};

export default function LoginPage() {
  return <LoginForm />;
}
