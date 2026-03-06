import { useCallback, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { FileDropZone } from "../components/FileDropZone";
import { listFiles, uploadFile, type StoredFile } from "../lib/api";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function Home() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; filename: string; message?: string } | null>(
    null
  );
  const [files, setFiles] = useState<StoredFile[]>([]);

  const loadFiles = useCallback(async () => {
    const res = await listFiles();
    if (res.ok) setFiles(res.files);
  }, []);

  useEffect(() => {
    void loadFiles();
  }, [loadFiles]);

  const handleFile = async (file: File) => {
    setResult(null);
    setUploading(true);
    const res = await uploadFile(file);
    setUploading(false);
    setResult({
      ok: res.ok,
      filename: file.name,
      message: res.ok ? res.filename : res.message
    });
    if (res.ok) void loadFiles();
  };

  return (
    <Layout>
      <section className="container" style={{ padding: "32px 0" }}>
        <FileDropZone
          onFile={handleFile}
          maxSize={100 * 1024 * 1024}
          disabled={uploading}
        />
        {uploading && (
          <div
            className="card"
            style={{ marginTop: 16, padding: 14, color: "var(--muted)", fontSize: 14 }}
          >
            Uploading…
          </div>
        )}
        {result && !uploading && (
          <div
            className="card"
            style={{
              marginTop: 16,
              padding: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              borderColor: result.ok ? "rgba(50, 213, 131, 0.4)" : "rgba(255, 77, 109, 0.4)"
            }}
          >
            <span style={{ fontSize: 14 }}>
              {result.ok ? (
                <>
                  <strong style={{ color: "var(--good)" }}>Saved:</strong> {result.filename}
                  {" "}→ Storage/
                </>
              ) : (
                <>
                  <strong style={{ color: "var(--bad)" }}>Failed:</strong> {result.message}
                </>
              )}
            </span>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--muted)", marginBottom: 12 }}>
            Files in Storage
          </h2>
          {files.length === 0 ? (
            <div className="card" style={{ padding: 20, color: "var(--muted)", fontSize: 14 }}>
              No files yet. Drop one above to get started.
            </div>
          ) : (
            <div className="card" style={{ overflow: "hidden" }}>
              {files.map((f, i) => (
                <div
                  key={f.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderBottom: i < files.length - 1 ? "1px solid var(--border)" : undefined
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{f.name}</span>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{formatSize(f.size)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
