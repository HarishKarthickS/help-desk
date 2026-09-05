import { EmptyState } from "@/ui/EmptyState";

export default function NotFound() {
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
        title="Page not found"
        body="That path is not a queue, ticket, or operator screen. Return to the inbox."
      />
      <a href="/" style={{ marginLeft: "1.1rem", fontSize: "0.88rem" }}>
        Back to inbox
      </a>
    </main>
  );
}
