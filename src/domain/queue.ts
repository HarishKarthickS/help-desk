import type { QueueFilters, Ticket } from "./types";

export function minutesOpen(ticket: Ticket, now: Date): number {
  const opened = Date.parse(ticket.openedAt);
  if (Number.isNaN(opened)) return 0;
  return Math.max(0, Math.floor((now.getTime() - opened) / 60_000));
}

export function slaBreached(ticket: Ticket, now: Date): boolean {
  if (ticket.status === "resolved" || ticket.status === "closed") return false;
  return minutesOpen(ticket, now) > ticket.slaMinutes;
}

export function slaRemainingLabel(ticket: Ticket, now: Date): string {
  if (ticket.status === "resolved" || ticket.status === "closed") return "done";
  const left = ticket.slaMinutes - minutesOpen(ticket, now);
  if (left <= 0) return "breach";
  if (left < 60) return `${left}m`;
  const hours = Math.floor(left / 60);
  const minutes = left % 60;
  return `${hours}h${minutes.toString().padStart(2, "0")}m`;
}

export function matchesFilters(
  ticket: Ticket,
  filters: QueueFilters,
  now: Date,
): boolean {
  if (filters.status !== "all" && ticket.status !== filters.status) return false;
  if (filters.queue !== "all" && ticket.queue !== filters.queue) return false;
  if (filters.priority !== "all" && ticket.priority !== filters.priority) {
    return false;
  }
  if (filters.slaOnly && !slaBreached(ticket, now)) return false;

  const q = filters.query.trim().toLowerCase();
  if (!q) return true;

  const hay = [
    String(ticket.number),
    ticket.subject,
    ticket.requester,
    ticket.assignee ?? "",
    ticket.queue,
  ]
    .join(" ")
    .toLowerCase();

  return hay.includes(q);
}

export function sortQueue(a: Ticket, b: Ticket, now: Date): number {
  const aHot = slaBreached(a, now) ? 0 : 1;
  const bHot = slaBreached(b, now) ? 0 : 1;
  if (aHot !== bHot) return aHot - bHot;
  const p = a.priority.localeCompare(b.priority);
  if (p !== 0) return p;
  return Date.parse(a.openedAt) - Date.parse(b.openedAt);
}
