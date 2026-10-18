"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { register as registerAccount } from "@/features/auth/api";
import { getAuthErrorMessage } from "@/features/auth/errors";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas";
import { AuthCard } from "./auth-card";
import { AuthField, PasswordField } from "./auth-field";
import { SubmitButton } from "./submit-button";

export function RegisterForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string>();
  const mutation = useMutation({ gcTime: 0, mutationFn: registerAccount });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
      phone: "",
      username: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const pending = isSubmitting || mutation.isPending;

  const onSubmit = handleSubmit(async (values) => {
    if (pending) return;

    setApiError(undefined);

    try {
      await mutation.mutateAsync({
        email: values.email,
        name: values.name,
        password: values.password,
        phone: values.phone || undefined,
        username: values.username,
      });
      router.replace("/login");
    } catch (error) {
      setApiError(
        getAuthErrorMessage(
          error,
          "Registration failed. Please try again.",
        ),
      );
    } finally {
      mutation.reset();
    }
  });

  return (
    <AuthCard
      heading="Register"
      prompt="Already have an account?"
      linkHref="/login"
      linkLabel="Log in"
    >
      <form onSubmit={onSubmit} noValidate className="space-y-3.5">
        {apiError ? (
          <div
            role="alert"
            aria-live="polite"
            className="rounded-xl border border-[#d53372]/70 bg-[#47152a]/50 px-3 py-2.5 text-xs leading-5 text-[#ff8bb7]"
          >
            {apiError}
          </div>
        ) : null}

        <AuthField
          id="register-name"
          label="Name"
          placeholder="Enter your name"
          autoComplete="name"
          registration={register("name")}
          error={errors.name?.message}
        />
        <AuthField
          id="register-username"
          label="Username"
          placeholder="Enter your username"
          autoComplete="username"
          registration={register("username")}
          error={errors.username?.message}
        />
        <AuthField
          id="register-email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          inputMode="email"
          autoComplete="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <AuthField
          id="register-phone"
          label="Number Phone"
          placeholder="Enter your number phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          registration={register("phone")}
          error={errors.phone?.message}
        />
        <PasswordField
          id="register-password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="new-password"
          registration={register("password")}
          error={errors.password?.message}
        />
        <PasswordField
          id="register-confirm-password"
          label="Confirm Password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <SubmitButton pending={pending}>Register</SubmitButton>
      </form>
    </AuthCard>
  );
}
