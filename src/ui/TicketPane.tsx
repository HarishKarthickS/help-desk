"use client";

import { OPERATORS, useDesk } from "@/data";
import { nextStatuses, slaRemainingLabel, statusLabel } from "@/domain";
import { useState } from "react";
import { PriorityMark, StatusChip } from "./StatusChip";
import { EmptyState } from "./EmptyState";
import styles from "./TicketPane.module.css";

export function TicketPane() {
  const desk = useDesk();
  const ticket = desk.selected;
  const [body, setBody] = useState("");
  const [kind, setKind] = useState<"public" | "note">("public");

  if (!ticket) {
    return (
      <EmptyState
        title="no gate selected"
        body="Tap a flap row on the board. Flight notes, status moves, and replies land here."
      />
    );
  }

  const replies = desk.commentsForSelected;
  const moves = nextStatuses(ticket.status);

  return (
    <article className={styles.pane}>
      <header className={styles.head}>
        <p className={styles.kicker}>
          flt #{ticket.number} · {ticket.queue} · etd {slaRemainingLabel(ticket, desk.now)}
        </p>
        <h1>{ticket.subject}</h1>
        <p className={styles.meta}>
          {ticket.requester} · opened {ticket.openedAt.replace("T", " ").slice(0, 16)} UTC
        </p>
        <div className={styles.badges}>
          <PriorityMark priority={ticket.priority} />
          <StatusChip status={ticket.status} />
        </div>
        <div className={styles.actions}>
          <label>
            crew
            <select
              value={ticket.assignee ?? ""}
              onChange={(e) =>
                desk.assign(ticket.id, e.target.value || null)
              }
            >
              <option value="">unassigned</option>
              {OPERATORS.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.moves}>
            {moves.length === 0 ? (
              <span className={styles.dead}>no status moves</span>
            ) : (
              moves.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => desk.setStatus(ticket.id, s)}
                >
                  {statusLabel(s)}
                </button>
              ))
            )}
          </div>
        </div>
      </header>
      <ol className={styles.thread}>
        {replies.length === 0 ? (
          <li className={styles.none}>
            No comments yet. Leave a public reply or an internal note.
          </li>
        ) : (
          replies.map((c) => (
            <li key={c.id} className={c.kind === "note" ? styles.note : styles.pub}>
              <div>
                <strong>{c.author}</strong>
                <span>{c.kind === "note" ? "internal note" : "public"}</span>
                <time dateTime={c.createdAt}>
                  {c.createdAt.replace("T", " ").slice(0, 16)}
                </time>
              </div>
              <p>{c.body}</p>
            </li>
          ))
        )}
      </ol>
      <form
        className={styles.composer}
        onSubmit={(e) => {
          e.preventDefault();
          desk.addComment(ticket.id, body, kind);
          setBody("");
        }}
      >
        <div className={styles.kind}>
          <button
            type="button"
            className={kind === "public" ? styles.on : undefined}
            onClick={() => setKind("public")}
          >
            public reply
          </button>
          <button
            type="button"
            className={kind === "note" ? styles.on : undefined}
            onClick={() => setKind("note")}
          >
            internal note
          </button>
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={
            kind === "note"
              ? "Visible to operators only."
              : "Goes on the requester thread."
          }
          rows={4}
          required
        />
        <button type="submit" className={styles.send}>
          post as {desk.operator}
        </button>
      </form>
    </article>
  );
}
