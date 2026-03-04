export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)
  ?.trim()
  .replace(/\/$/, "");

export type HealthResult =
  | { ok: true; status: number; baseUrl: string }
  | { ok: false; message: string; baseUrl?: string };

export async function checkHealth(signal?: AbortSignal): Promise<HealthResult> {
  const baseUrl = API_BASE_URL;
  if (!baseUrl) return { ok: false, message: "VITE_API_BASE_URL is not set." };

  try {
    const res = await fetch(`${baseUrl}/health`, { method: "GET", signal });
    if (res.ok) return { ok: true, status: res.status, baseUrl };
    return { ok: false, message: `Health check failed (${res.status}).`, baseUrl };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, message, baseUrl };
  }
}

