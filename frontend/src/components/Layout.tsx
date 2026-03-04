import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div>
      <header style={{ padding: "18px 0" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              aria-hidden="true"
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(124,92,255,0.95), rgba(25,211,255,0.8))",
                boxShadow: "0 12px 40px rgba(0,0,0,0.45)"
              }}
            />
            <div>
              <div style={{ fontWeight: 820, letterSpacing: 0.2 }}>Blockchain Storage</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.62)" }}>
                verifiable storage, simple UX
              </div>
            </div>
          </div>

          <nav style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(255,255,255,0.7)" }}>
            <a href="#features">Features</a>
            <a href="#status">Status</a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer style={{ padding: "26px 0 40px" }}>
        <div className="container" style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 16 }}>
            <span>Local dev UI scaffold.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

