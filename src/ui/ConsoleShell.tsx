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
  const clock = now.toISOString().slice(11, 19) + "Z";

  return (
    <div className={styles.frame}>
      <header className={styles.mast}>
        <div className={styles.brand}>
          <span className={styles.mark}>Departures</span>
          <span className={styles.sub}>help-desk · terminal Q04 · split-flap</span>
        </div>
        <dl className={styles.stats}>
          <div>
            <dt>open</dt>
            <dd>{openCount.toString().padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>delay</dt>
            <dd className={hot ? styles.hot : undefined}>
              {hot.toString().padStart(2, "0")}
            </dd>
          </div>
          <div>
            <dt>gate</dt>
            <dd>04</dd>
          </div>
          <div>
            <dt>utc</dt>
            <dd>{clock}</dd>
          </div>
        </dl>
        <button type="button" className={styles.reset} onClick={resetSeed}>
          reload board
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
