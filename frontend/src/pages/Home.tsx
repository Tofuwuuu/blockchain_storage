import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { FeatureCard } from "../components/FeatureCard";
import { Layout } from "../components/Layout";
import { StatusPill } from "../components/StatusPill";
import { API_BASE_URL, checkHealth, type HealthResult } from "../lib/api";

function formatBaseUrl(baseUrl?: string) {
  if (!baseUrl) return "not set";
  try {
    const u = new URL(baseUrl);
    return u.origin;
  } catch {
    return baseUrl;
  }
}

export function Home() {
  const [health, setHealth] = useState<HealthResult | null>(null);
  const [busy, setBusy] = useState(false);

  const state = useMemo<"ok" | "bad" | "unknown">(() => {
    if (!health) return "unknown";
    return health.ok ? "ok" : "bad";
  }, [health]);

  const statusText = useMemo(() => {
    if (!health) return `API: ${formatBaseUrl(API_BASE_URL)} (not checked)`;
    if (health.ok) return `API: ${formatBaseUrl(health.baseUrl)} (healthy, ${health.status})`;
    const base = health.baseUrl ? formatBaseUrl(health.baseUrl) : formatBaseUrl(API_BASE_URL);
    return `API: ${base} (${health.message})`;
  }, [health]);

  const runHealth = useCallback(async () => {
    setBusy(true);
    const ac = new AbortController();
    const t = window.setTimeout(() => ac.abort(), 3500);
    try {
      setHealth(await checkHealth(ac.signal));
    } finally {
      window.clearTimeout(t);
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    void runHealth();
  }, [runHealth]);

  return (
    <Layout>
      <section className="container" style={{ padding: "26px 0 14px" }}>
        <div
          className="card"
          style={{
            padding: 22,
            overflow: "hidden",
            position: "relative"
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: -2,
              background:
                "radial-gradient(600px 240px at 20% 0%, rgba(124,92,255,0.35), transparent 60%), radial-gradient(540px 240px at 85% 20%, rgba(25,211,255,0.22), transparent 60%)",
              pointerEvents: "none"
            }}
          />

          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: -0.6, lineHeight: 1.12 }}>
                  Store data. Prove it.
                </div>
                <div style={{ marginTop: 10, color: "rgba(255,255,255,0.68)", lineHeight: 1.6, maxWidth: 720 }}>
                  This is a clean React frontend scaffold for your blockchain-backed storage app.
                  Point it at your API with <code>VITE_API_BASE_URL</code> and start building features.
                </div>
              </div>

              <div id="status" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                <StatusPill state={state} text={statusText} />
                <div style={{ display: "flex", gap: 10 }}>
                  <Button onClick={runHealth}>{busy ? "Checking..." : "Re-check API"}</Button>
                  <a href="#features">
                    <Button variant="primary">See features</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container" style={{ padding: "18px 0 8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 14 }}>
          <div style={{ gridColumn: "span 4" }}>
            <FeatureCard title="Upload flow">
              Build a file picker, stream uploads, then persist a content hash and proof on-chain.
            </FeatureCard>
          </div>
          <div style={{ gridColumn: "span 4" }}>
            <FeatureCard title="Verification UI">
              Let users verify integrity with a single click: fetch metadata, compute hash, compare.
            </FeatureCard>
          </div>
          <div style={{ gridColumn: "span 4" }}>
            <FeatureCard title="Wallet-ready">
              Add a wallet connect later (MetaMask, WalletConnect). The layout is ready for auth controls.
            </FeatureCard>
          </div>
        </div>

        <div style={{ marginTop: 14, color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.6 }}>
          Tip: copy <code>frontend/.env.example</code> to <code>frontend/.env.local</code> to set your API base URL.
        </div>
      </section>
    </Layout>
  );
}

