export const STATUSES = [
  "open",
  "waiting",
  "in_progress",
  "resolved",
  "closed",
] as const;

export type TicketStatus = (typeof STATUSES)[number];

export const PRIORITIES = ["p1", "p2", "p3", "p4"] as const;
export type TicketPriority = (typeof PRIORITIES)[number];

export const QUEUES = ["billing", "access", "product", "infra"] as const;
export type QueueName = (typeof QUEUES)[number];

export type CommentKind = "public" | "note";

export type Ticket = {
  id: string;
  number: number;
  subject: string;
  requester: string;
  assignee: string | null;
  status: TicketStatus;
  priority: TicketPriority;
  queue: QueueName;
  openedAt: string;
  updatedAt: string;
  slaMinutes: number;
};

export type TicketComment = {
  id: string;
  ticketId: string;
  author: string;
  body: string;
  createdAt: string;
  kind: CommentKind;
};

export type QueueFilters = {
  query: string;
  status: TicketStatus | "all";
  queue: QueueName | "all";
  priority: TicketPriority | "all";
  slaOnly: boolean;
};

export const DEFAULT_FILTERS: QueueFilters = {
  query: "",
  status: "all",
  queue: "all",
  priority: "all",
  slaOnly: false,
};
