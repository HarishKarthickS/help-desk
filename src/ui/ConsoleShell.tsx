"use client";

import { useDesk } from "@/data";
import { slaBreached } from "@/domain";
import { QueueList } from "./QueueList";
import { TicketPane } from "./TicketPane";
import styles from "./ConsoleShell.module.css";

export function ConsoleShell() {
  const { tickets, now, resetSeed } = useDesk();
  const openCount = tickets.filter(
    (t) => t.status !== "resolved" && t.status !== "closed",
  ).length;
  const hot = tickets.filter((t) => slaBreached(t, now)).length;

  return (
    <div className={styles.frame}>
      <header className={styles.mast}>
        <div className={styles.brand}>
          <span className={styles.mark}>Help desk</span>
          <span className={styles.sub}>Inbox · tickets and replies</span>
        </div>
        <dl className={styles.stats}>
          <div>
            <dt>Open</dt>
            <dd>{openCount}</dd>
          </div>
          <div>
            <dt>SLA</dt>
            <dd className={hot ? styles.hot : undefined}>{hot}</dd>
          </div>
        </dl>
        <button type="button" className={styles.reset} onClick={resetSeed}>
          Reset queue
        </button>
      </header>
      <div className={styles.split}>
        <section className={styles.queue} aria-label="Ticket queue">
          <QueueList />
        </section>
        <section className={styles.pane} aria-label="Ticket detail">
          <TicketPane />
        </section>
      </div>
    </div>
  );
}
