"use client";

import { useDesk } from "@/data";
import { DEFAULT_FILTERS, PRIORITIES, QUEUES, STATUSES } from "@/domain";
import { statusLabel } from "@/domain";
import styles from "./FilterBar.module.css";

export function FilterBar() {
  const { filters, setFilters } = useDesk();

  return (
    <form className={styles.bar} onSubmit={(e) => e.preventDefault()}>
      <label className={styles.search}>
        <span>Search</span>
        <input
          value={filters.query}
          placeholder="Number, subject, requester"
          onChange={(e) => setFilters({ query: e.target.value })}
        />
      </label>
      <label>
        <span>Status</span>
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({
              status: e.target.value as typeof filters.status,
            })
          }
        >
          <option value="all">All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {statusLabel(s)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Queue</span>
        <select
          value={filters.queue}
          onChange={(e) =>
            setFilters({ queue: e.target.value as typeof filters.queue })
          }
        >
          <option value="all">All</option>
          {QUEUES.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Priority</span>
        <select
          value={filters.priority}
          onChange={(e) =>
            setFilters({
              priority: e.target.value as typeof filters.priority,
            })
          }
        >
          <option value="all">All</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.check}>
        <input
          type="checkbox"
          checked={filters.slaOnly}
          onChange={(e) => setFilters({ slaOnly: e.target.checked })}
        />
        <span>SLA breached</span>
      </label>
      <button
        type="button"
        className={styles.clear}
        onClick={() => setFilters(DEFAULT_FILTERS)}
      >
        Clear
      </button>
    </form>
  );
}
