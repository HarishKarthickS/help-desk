"use client";

import { useDesk } from "@/data";
import { slaBreached } from "@/domain";
import { QueueList } from "./QueueList";
import styles from "./ConsoleShell.module.css";

export function ConsoleShell() {
  const { tickets, now, resetSeed } = useDesk();
  const openCount = tickets.filter(
    (t) => t.status !== "resolved" && t.status !== "closed",
  ).length;
  const hot = tickets.filter((t) => slaBreached(t, now)).length;
  const clock = now.toISOString().slice(11, 19) + "Z";

  return (
    <div className={styles.frame}>
      <header className={styles.mast}>
        <div className={styles.brand}>
          <span className={styles.mark}>help-desk</span>
          <span className={styles.sub}>ops console · queue 04</span>
        </div>
        <dl className={styles.stats}>
          <div>
            <dt>open</dt>
            <dd>{openCount.toString().padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>sla hot</dt>
            <dd className={hot ? styles.hot : undefined}>
              {hot.toString().padStart(2, "0")}
            </dd>
          </div>
          <div>
            <dt>shift</dt>
            <dd>harish</dd>
          </div>
          <div>
            <dt>utc</dt>
            <dd>{clock}</dd>
          </div>
        </dl>
        <button type="button" className={styles.reset} onClick={resetSeed}>
          reload seed
        </button>
      </header>
      <div className={styles.split}>
        <section className={styles.queue} aria-label="Ticket queue">
          <QueueList />
        </section>
        <section className={styles.pane} aria-label="Ticket detail">
          <p className={styles.placeholder}>select a ticket when the queue is live.</p>
        </section>
      </div>
    </div>
  );
}
