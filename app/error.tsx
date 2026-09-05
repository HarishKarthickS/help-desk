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
    <main style={{ padding: "2rem", background: "#070707", minHeight: "100vh" }}>
      <p
        style={{
          fontFamily: "Anton, sans-serif",
          letterSpacing: "0.06em",
          color: "#ff6a00",
          fontSize: "2.4rem",
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        Departures
      </p>
      <EmptyState
        title="board fault"
        body={error.message || "The queue failed to render. Retry, or reload the board from the masthead."}
      />
      <button
        type="button"
        onClick={reset}
        style={{
          marginLeft: "0.9rem",
          background: "linear-gradient(#1c1c1c, #0a0a0a)",
          border: "1px solid #333",
          color: "#ececec",
          padding: "0.4rem 0.7rem",
          cursor: "pointer",
          fontFamily: "Chivo Mono, monospace",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontSize: "0.7rem",
        }}
      >
        retry
      </button>
    </main>
  );
}
