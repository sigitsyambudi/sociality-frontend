import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "@/features/auth/schemas";

describe("authentication form schemas", () => {
  it("normalizes and accepts valid login credentials", () => {
    const result = loginSchema.parse({
      email: "  person@example.com  ",
      password: "secret123",
    });

    expect(result).toEqual({
      email: "person@example.com",
      password: "secret123",
    });
  });

  it("reports invalid login fields", () => {
    const result = loginSchema.safeParse({ email: "not-an-email", password: "123" });

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error.flatten().fieldErrors.email).toContain("Enter a valid email.");
    expect(result.error.flatten().fieldErrors.password).toContain(
      "Password must be at least 6 characters.",
    );
  });

  it("requires matching registration passwords", () => {
    const result = registerSchema.safeParse({
      confirmPassword: "different",
      email: "person@example.com",
      name: "Person",
      password: "secret123",
      phone: "",
      username: "person",
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error.flatten().fieldErrors.confirmPassword).toContain(
      "Passwords do not match.",
    );
  });
});
