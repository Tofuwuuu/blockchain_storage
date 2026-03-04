import type { ReactNode } from "react";

type Props = {
  variant?: "default" | "primary";
  onClick?: () => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
};

export function Button({ variant = "default", onClick, children, type = "button" }: Props) {
  const className = variant === "primary" ? "btn primary" : "btn";
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

