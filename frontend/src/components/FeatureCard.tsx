import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function FeatureCard({ title, children }: Props) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ fontWeight: 780, letterSpacing: 0.2 }}>{title}</div>
      <div style={{ marginTop: 10, color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
        {children}
      </div>
    </div>
  );
}

