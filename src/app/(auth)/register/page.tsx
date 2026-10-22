import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";
import { PREVIEW_ROUTE_ROBOTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Register | Sociality",
  description: "Create your Sociality account.",
  robots: PREVIEW_ROUTE_ROBOTS,
};

export default function RegisterPage() {
  return <RegisterForm />;
}
