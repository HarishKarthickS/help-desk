import { EmptyState } from "@/ui/EmptyState";

export default function NotFound() {
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
        title="channel not found"
        body="That path is not a queue, ticket, or operator screen. Go back to the board."
      />
      <a
        href="/"
        style={{
          marginLeft: "0.9rem",
          color: "#e6a317",
          fontFamily: "Martian Mono, monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        return to queue
      </a>
    </main>
  );
}
