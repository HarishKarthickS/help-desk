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
    <main style={{ padding: "2rem" }}>
      <p
        style={{
          fontFamily: "Bebas Neue, sans-serif",
          letterSpacing: "0.12em",
          color: "#e6a317",
          fontSize: "2rem",
          margin: 0,
        }}
      >
        help-desk
      </p>
      <EmptyState
        title="console fault"
        body={error.message || "The queue failed to render. Retry, or reload seed from the masthead."}
      />
      <button
        type="button"
        onClick={reset}
        style={{
          marginLeft: "0.9rem",
          background: "transparent",
          border: "1px solid #2c3226",
          color: "#d2ccb8",
          padding: "0.4rem 0.7rem",
          cursor: "pointer",
          fontFamily: "Martian Mono, monospace",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontSize: "0.7rem",
        }}
      >
        retry
      </button>
    </main>
  );
}
