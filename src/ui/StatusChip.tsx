"use client";

import type { TicketPriority, TicketStatus } from "@/domain";
import { statusLabel } from "@/domain";
import styles from "./StatusChip.module.css";

export function StatusChip({ status }: { status: TicketStatus }) {
  return (
    <span className={`${styles.chip} ${styles[status]}`}>{statusLabel(status)}</span>
  );
}

export function PriorityMark({ priority }: { priority: TicketPriority }) {
  return <span className={`${styles.pri} ${styles[priority]}`}>{priority}</span>;
}
