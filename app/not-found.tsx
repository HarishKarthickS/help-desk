import { EmptyState } from "@/ui/EmptyState";

export default function NotFound() {
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
        title="gate closed"
        body="That path is not a queue, ticket, or operator screen. Return to the board."
      />
      <a
        href="/"
        style={{
          marginLeft: "0.9rem",
          color: "#ff6a00",
          fontFamily: "Chivo Mono, monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        return to board
      </a>
    </main>
  );
}
