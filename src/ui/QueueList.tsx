"use client";

import { useDesk } from "@/data";
import { matchesFilters, slaBreached, slaRemainingLabel, sortQueue } from "@/domain";
import { FilterBar } from "./FilterBar";
import { EmptyState } from "./EmptyState";
import { PriorityMark, StatusChip } from "./StatusChip";
import styles from "./QueueList.module.css";

export function QueueList() {
  const { tickets, filters, selectedId, select, now } = useDesk();
  const rows = tickets
    .filter((t) => matchesFilters(t, filters, now))
    .sort((a, b) => sortQueue(a, b, now));

  return (
    <div className={styles.wrap}>
      <FilterBar />
      <div className={styles.meta}>
        <span>Tickets</span>
        <span className={styles.metaTail}>{rows.length} shown</span>
      </div>
      {rows.length === 0 ? (
        <EmptyState
          title="No tickets"
          body="Nothing matches these filters. Clear them, or reset the queue if the list was wiped."
        />
      ) : (
        <ul className={styles.list}>
          {rows.map((t) => {
            const hot = slaBreached(t, now);
            return (
              <li key={t.id}>
                <button
                  type="button"
                  className={`${styles.row} ${selectedId === t.id ? styles.on : ""} ${hot ? styles.breach : ""}`}
                  onClick={() => select(t.id)}
                >
                  <span className={styles.num}>#{t.number}</span>
                  <span className={styles.subject}>{t.subject}</span>
                  <span className={styles.who}>
                    {t.requester.split("@")[0]}
                    {t.assignee ? ` · ${t.assignee}` : " · Unassigned"}
                  </span>
                  <span className={styles.tags}>
                    <PriorityMark priority={t.priority} />
                    <StatusChip status={t.status} />
                    <span className={styles.q}>{t.queue}</span>
                    <span className={hot ? styles.slaHot : styles.sla}>
                      SLA {slaRemainingLabel(t, now)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
