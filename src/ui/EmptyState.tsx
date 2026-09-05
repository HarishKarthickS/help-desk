import styles from "./EmptyState.module.css";

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className={styles.box} role="status">
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}
