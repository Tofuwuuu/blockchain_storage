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

export type StoredFile = { name: string; size: number };

export type ListFilesResult =
  | { ok: true; files: StoredFile[] }
  | { ok: false; message: string };

export async function listFiles(signal?: AbortSignal): Promise<ListFilesResult> {
  const baseUrl = API_BASE_URL;
  if (!baseUrl) return { ok: false, message: "VITE_API_BASE_URL is not set." };

  try {
    const res = await fetch(`${baseUrl}/api/files`, { method: "GET", signal });
    const data = (await res.json()) as { files?: StoredFile[]; detail?: string };
    if (res.ok) return { ok: true, files: data.files ?? [] };
    return { ok: false, message: data.detail ?? `Failed (${res.status})` };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Failed" };
  }
}

export type UploadResult =
  | { ok: true; path: string; filename: string }
  | { ok: false; message: string };

export async function uploadFile(file: File, signal?: AbortSignal): Promise<UploadResult> {
  const baseUrl = API_BASE_URL;
  if (!baseUrl) return { ok: false, message: "VITE_API_BASE_URL is not set." };

  const form = new FormData();
  form.append("file", file);

  try {
    const res = await fetch(`${baseUrl}/api/upload`, {
      method: "POST",
      body: form,
      signal
    });
    const data = (await res.json()) as { path?: string; filename?: string; detail?: string };
    if (res.ok) return { ok: true, path: data.path ?? "", filename: data.filename ?? file.name };
    return { ok: false, message: data.detail ?? `Upload failed (${res.status})` };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "Upload failed" };
  }
}

