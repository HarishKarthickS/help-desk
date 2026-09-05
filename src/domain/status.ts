import type { TicketStatus } from "./types";

const EDGES: Record<TicketStatus, TicketStatus[]> = {
  open: ["in_progress", "waiting", "closed"],
  waiting: ["open", "in_progress", "closed"],
  in_progress: ["waiting", "resolved", "closed"],
  resolved: ["closed", "open"],
  closed: ["open"],
};

export function nextStatuses(from: TicketStatus): TicketStatus[] {
  return EDGES[from];
}

export function canTransition(from: TicketStatus, to: TicketStatus): boolean {
  return from !== to && EDGES[from].includes(to);
}

export function statusLabel(status: TicketStatus): string {
  switch (status) {
    case "open":
      return "open";
    case "waiting":
      return "waiting on requester";
    case "in_progress":
      return "in progress";
    case "resolved":
      return "resolved";
    case "closed":
      return "closed";
  }
}
