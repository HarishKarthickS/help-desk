"use client";

import { EmptyState } from "@/ui/EmptyState";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main style={{ padding: "2rem", minHeight: "100vh" }}>
      <p
        style={{
          fontWeight: 600,
          fontSize: "1.05rem",
          margin: "0 0 0.75rem",
        }}
      >
        Help desk
      </p>
      <EmptyState
        title="Something went wrong"
        body={error.message || "The queue failed to render. Retry, or reset the queue from the header."}
      />
      <button
        type="button"
        onClick={reset}
        style={{
          marginLeft: "1.1rem",
          background: "#4f46e5",
          border: 0,
          color: "#fff",
          padding: "0.4rem 0.75rem",
          cursor: "pointer",
          borderRadius: 6,
          fontWeight: 600,
          fontSize: "0.85rem",
        }}
      >
        Retry
      </button>
    </main>
  );
}
