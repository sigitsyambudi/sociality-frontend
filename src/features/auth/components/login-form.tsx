"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/features/auth/api";
import { getAuthErrorMessage } from "@/features/auth/errors";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas";
import { AuthCard } from "./auth-card";
import { AuthField, PasswordField } from "./auth-field";
import { SubmitButton } from "./submit-button";

export function LoginForm() {
  const [feedback, setFeedback] = useState<{
    kind: "error" | "success";
    message: string;
  }>();
  const mutation = useMutation({ gcTime: 0, mutationFn: login });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    resetField,
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const pending = isSubmitting || mutation.isPending;

  const onSubmit = handleSubmit(async (values) => {
    if (pending) return;

    setFeedback(undefined);

    try {
      await mutation.mutateAsync(values);
      resetField("password");
      setFeedback({
        kind: "success",
        message:
          "Credentials accepted. A secure session cannot be created until the API documents its login response.",
      });
    } catch (error) {
      setFeedback({
        kind: "error",
        message: getAuthErrorMessage(
          error,
          "Login failed. Please try again.",
          "Email or password is incorrect.",
        ),
      });
    } finally {
      mutation.reset();
    }
  });

  return (
    <AuthCard
      heading="Welcome Back!"
      prompt="Don't have an account?"
      linkHref="/register"
      linkLabel="Register"
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {feedback ? (
          <div
            role={feedback.kind === "error" ? "alert" : "status"}
            aria-live="polite"
            className={
              feedback.kind === "error"
                ? "rounded-xl border border-[#d53372]/70 bg-[#47152a]/50 px-3 py-2.5 text-xs leading-5 text-[#ff8bb7]"
                : "rounded-xl border border-[#7852d6]/70 bg-[#25134e]/60 px-3 py-2.5 text-xs leading-5 text-[#d7c8ff]"
            }
          >
            {feedback.message}
          </div>
        ) : null}

        <AuthField
          id="login-email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          inputMode="email"
          autoComplete="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <PasswordField
          id="login-password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          registration={register("password")}
          error={errors.password?.message}
        />
        <SubmitButton pending={pending}>Login</SubmitButton>
      </form>
    </AuthCard>
  );
}
