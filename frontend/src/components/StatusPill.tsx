type Props = {
  state: "ok" | "bad" | "unknown";
  text: string;
};

export function StatusPill({ state, text }: Props) {
  const dotClass = state === "ok" ? "dot good" : state === "bad" ? "dot bad" : "dot";
  return (
    <span className="pill" aria-live="polite">
      <span className={dotClass} aria-hidden="true" />
      {text}
    </span>
  );
}

