import { useCallback, useState } from "react";

type Props = {
  onFile: (file: File) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
};

export function FileDropZone({ onFile, accept, maxSize, disabled }: Props) {
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(
    (file: File): string | null => {
      if (maxSize != null && file.size > maxSize) {
        return `File is too large (max ${(maxSize / 1024 / 1024).toFixed(1)} MB)`;
      }
      return null;
    },
    [maxSize]
  );

  const handleFile = useCallback(
    (file: File | null) => {
      setError(null);
      if (!file) return;
      const err = validate(file);
      if (err) {
        setError(err);
        return;
      }
      onFile(file);
    },
    [onFile, validate]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      handleFile(file ?? null);
    },
    [handleFile, disabled]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      handleFile(file ?? null);
      e.target.value = "";
    },
    [handleFile]
  );

  return (
    <div
      className={`drop-zone ${drag ? "drop-zone--active" : ""} ${disabled ? "drop-zone--disabled" : ""}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <input
        type="file"
        className="drop-zone__input"
        accept={accept}
        onChange={onInputChange}
        aria-label="Choose a file"
        disabled={disabled}
      />
      <div className="drop-zone__content">
        <div className="drop-zone__icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p className="drop-zone__text">
          {drag ? "Drop file here" : "Drop a file here"}
        </p>
        <p className="drop-zone__hint">or click to browse</p>
        {error && <p className="drop-zone__error" role="alert">{error}</p>}
      </div>
    </div>
  );
}
