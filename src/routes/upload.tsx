import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useRef, useCallback } from "react";
import { uploadCSV } from "~/lib/server-fns";
import { CLERK_ENABLED } from "~/lib/auth-client";

export const Route = createFileRoute("/upload")({
  component: UploadPage,
});

function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }
    setFile(selectedFile);
    setError(null);
  }, []);

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    },
    [],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile],
  );

  const handleUpload = useCallback(async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const csvText = await file.text();
      const result = await uploadCSV({
        data: { csvText, fileName: file.name },
      });

      if ("error" in result && result.error) {
        setError(result.error as string);
        setUploading(false);
        return;
      }

      // Store session ID and navigate to chat
      if ("sessionId" in result) {
        sessionStorage.setItem("csvSessionId", result.sessionId as string);
      }

      await router.navigate({ to: "/chat" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Network error. Please try again.",
      );
      setUploading(false);
    }
  }, [file, router]);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 sm:py-24">
      {!CLERK_ENABLED && (
        <div className="mb-6 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm text-center">
          Clerk is not configured yet. Uploads work but are not tied to user
          accounts. Set VITE_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in .env
          to enable authentication.
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Upload your CSV
        </h1>
        <p className="text-gray-600">
          Export your social media data as a CSV, then drop it here. We&apos;ll
          handle the rest.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
          dragActive
            ? "border-brand-500 bg-brand-50"
            : file
              ? "border-green-400 bg-green-50"
              : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
        }`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            fileInputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleChange}
          className="hidden"
        />

        {file ? (
          <div>
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="font-semibold text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {(file.size / 1024).toFixed(1)} KB
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="mt-3 text-sm text-gray-400 hover:text-gray-600 underline"
            >
              Choose a different file
            </button>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="font-semibold text-gray-700">
              Drag and drop your CSV here
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse files
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="button"
        disabled={!file || uploading}
        onClick={handleUpload}
        className={`mt-6 w-full rounded-xl py-3.5 text-base font-semibold transition-colors ${
          file && !uploading
            ? "bg-brand-600 text-white hover:bg-brand-700"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {uploading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          "Analyze my data"
        )}
      </button>
    </div>
  );
}
