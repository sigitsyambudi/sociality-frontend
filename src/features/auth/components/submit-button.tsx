import { LoaderCircle } from "lucide-react";

type SubmitButtonProps = {
  children: string;
  pending: boolean;
};

export function SubmitButton({ children, pending }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#6634e8,#7b3cff)] px-5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(113,53,239,0.28)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#aa85ff] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? <LoaderCircle aria-hidden="true" className="animate-spin" size={18} /> : null}
      {pending ? `${children}...` : children}
    </button>
  );
}
