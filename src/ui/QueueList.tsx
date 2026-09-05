"use client";

import { useDesk } from "@/data";
import { matchesFilters, slaBreached, slaRemainingLabel, sortQueue } from "@/domain";
import { FilterBar } from "./FilterBar";
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
        {rows.length.toString().padStart(2, "0")} in view
      </div>
      {rows.length === 0 ? (
        <div className={styles.empty} role="status">
          <strong>queue is quiet</strong>
          <p>
            Nothing matches these filters. Clear them, or reload seed if you
            wiped the board.
          </p>
        </div>
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
                    {t.assignee ? ` → ${t.assignee}` : " → unassigned"}
                  </span>
                  <span className={styles.tags}>
                    <PriorityMark priority={t.priority} />
                    <StatusChip status={t.status} />
                    <span className={styles.q}>{t.queue}</span>
                    <span className={hot ? styles.slaHot : styles.sla}>
                      sla {slaRemainingLabel(t, now)}
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
