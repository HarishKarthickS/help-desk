# help-desk

A spare ops console for a support queue: tickets, status moves, comments, and filters. It is not a claims system.

The board is an **airport FIDS / split-flap** wall: orange-on-black mechanical rows, **Anton** for the mast and destinations, **Chivo Mono** for the rest. Seeded tickets cover billing, access, product, and infra — including an SLA delay so the DELAY flap is not decorative.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see a two-pane board: departure list on the left, gate thread on the right. Filter by status/terminal/priority or “delayed only”. Change status, reassign crew, and post a public reply or an internal note. **reload board** in the masthead restores the original eight tickets (also stored in `localStorage` as `help-desk:v1`).

## Layout

```
src/domain   ticket types, status edges, SLA + filter rules
src/data     seed queue and client store
src/ui       FIDS chrome, flap queue, gate thread
app          Next.js shell, empty and fault screens
```

![help-desk departures board](docs/queue.png)

MIT.
