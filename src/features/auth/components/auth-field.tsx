"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type AuthFieldProps = {
  autoComplete: HTMLInputAutoCompleteAttribute;
  error?: string;
  id: string;
  inputMode?: "email" | "tel" | "text";
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  type?: HTMLInputTypeAttribute;
};

export function AuthField({
  autoComplete,
  error,
  id,
  inputMode,
  label,
  placeholder,
  registration,
  type = "text",
}: AuthFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white">
        {label}
      </label>
      <input
        {...registration}
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "auth-input h-12 w-full rounded-xl border bg-[#07090d] px-4 text-sm text-white outline-none transition placeholder:text-[#707784] focus:border-[#7950f2] focus:ring-2 focus:ring-[#7950f2]/25",
          error ? "border-[#d53372]" : "border-[#202936]",
        )}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-[#f04d8a]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type PasswordFieldProps = Omit<AuthFieldProps, "inputMode" | "type">;

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const errorId = `${props.id}-error`;

  return (
    <div>
      <label htmlFor={props.id} className="mb-2 block text-sm font-semibold text-white">
        {props.label}
      </label>
      <div className="relative">
        <input
          {...props.registration}
          id={props.id}
          type={visible ? "text" : "password"}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          aria-invalid={Boolean(props.error)}
          aria-describedby={props.error ? errorId : undefined}
          className={cn(
            "auth-input h-12 w-full rounded-xl border bg-[#07090d] py-3 pr-12 pl-4 text-sm text-white outline-none transition placeholder:text-[#707784] focus:border-[#7950f2] focus:ring-2 focus:ring-[#7950f2]/25",
            props.error ? "border-[#d53372]" : "border-[#202936]",
          )}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-[#8a909b] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#9b6cff]"
        >
          {visible ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
        </button>
      </div>
      {props.error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-[#f04d8a]">
          {props.error}
        </p>
      ) : null}
    </div>
  );
}
