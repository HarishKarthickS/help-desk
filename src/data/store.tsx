"use client";

import {
  canTransition,
  DEFAULT_FILTERS,
  type QueueFilters,
  type Ticket,
  type TicketComment,
  type TicketStatus,
} from "@/domain";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { SEED_COMMENTS, SEED_TICKETS } from "./seed";

const STORAGE_KEY = "help-desk:v1";

type DeskState = {
  tickets: Ticket[];
  comments: TicketComment[];
  filters: QueueFilters;
  selectedId: string | null;
  operator: string;
};

type Action =
  | { type: "hydrate"; state: DeskState }
  | { type: "select"; id: string | null }
  | { type: "filters"; filters: Partial<QueueFilters> }
  | { type: "status"; ticketId: string; status: TicketStatus }
  | { type: "assign"; ticketId: string; assignee: string | null }
  | { type: "comment"; ticketId: string; body: string; kind: "public" | "note" }
  | { type: "reset" };

function persist(state: DeskState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      tickets: state.tickets,
      comments: state.comments,
      selectedId: state.selectedId,
      operator: state.operator,
    }),
  );
}

function fresh(): DeskState {
  return {
    tickets: SEED_TICKETS,
    comments: SEED_COMMENTS,
    filters: DEFAULT_FILTERS,
    selectedId: SEED_TICKETS[0]?.id ?? null,
    operator: "harish",
  };
}

function load(): DeskState {
  const base = fresh();
  if (typeof window === "undefined") return base;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<DeskState>;
    return {
      ...base,
      tickets: parsed.tickets?.length ? parsed.tickets : base.tickets,
      comments: parsed.comments?.length ? parsed.comments : base.comments,
      selectedId: parsed.selectedId ?? base.selectedId,
      operator: parsed.operator ?? base.operator,
    };
  } catch {
    return base;
  }
}

function reduce(state: DeskState, action: Action): DeskState {
  const stamp = new Date().toISOString();
  switch (action.type) {
    case "hydrate":
      return { ...action.state, filters: state.filters };
    case "select":
      return { ...state, selectedId: action.id };
    case "filters":
      return { ...state, filters: { ...state.filters, ...action.filters } };
    case "status": {
      const ticket = state.tickets.find((t) => t.id === action.ticketId);
      if (!ticket || !canTransition(ticket.status, action.status)) return state;
      const next = {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.ticketId
            ? { ...t, status: action.status, updatedAt: stamp }
            : t,
        ),
      };
      persist(next);
      return next;
    }
    case "assign": {
      const next = {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.ticketId
            ? { ...t, assignee: action.assignee, updatedAt: stamp }
            : t,
        ),
      };
      persist(next);
      return next;
    }
    case "comment": {
      const body = action.body.trim();
      if (!body) return state;
      const comment: TicketComment = {
        id: `c-${stamp}-${Math.random().toString(36).slice(2, 7)}`,
        ticketId: action.ticketId,
        author: state.operator,
        body,
        createdAt: stamp,
        kind: action.kind,
      };
      const next = {
        ...state,
        comments: [...state.comments, comment],
        tickets: state.tickets.map((t) =>
          t.id === action.ticketId ? { ...t, updatedAt: stamp } : t,
        ),
      };
      persist(next);
      return next;
    }
    case "reset": {
      const next = fresh();
      persist(next);
      return next;
    }
  }
}

type DeskApi = DeskState & {
  now: Date;
  selected: Ticket | null;
  commentsForSelected: TicketComment[];
  select: (id: string | null) => void;
  setFilters: (filters: Partial<QueueFilters>) => void;
  setStatus: (ticketId: string, status: TicketStatus) => void;
  assign: (ticketId: string, assignee: string | null) => void;
  addComment: (ticketId: string, body: string, kind: "public" | "note") => void;
  resetSeed: () => void;
};

const DeskContext = createContext<DeskApi | null>(null);

export function DeskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reduce, undefined, fresh);
  useEffect(() => {
    dispatch({ type: "hydrate", state: load() });
  }, []);
  const now = useMemo(() => new Date(), [state.tickets, state.comments]);

  const value = useMemo<DeskApi>(() => {
    const selected =
      state.tickets.find((t) => t.id === state.selectedId) ?? null;
    return {
      ...state,
      now,
      selected,
      commentsForSelected: state.comments.filter(
        (c) => c.ticketId === selected?.id,
      ),
      select: (id) => dispatch({ type: "select", id }),
      setFilters: (filters) => dispatch({ type: "filters", filters }),
      setStatus: (ticketId, status) =>
        dispatch({ type: "status", ticketId, status }),
      assign: (ticketId, assignee) =>
        dispatch({ type: "assign", ticketId, assignee }),
      addComment: (ticketId, body, kind) =>
        dispatch({ type: "comment", ticketId, body, kind }),
      resetSeed: () => dispatch({ type: "reset" }),
    };
  }, [state, now]);

  return <DeskContext.Provider value={value}>{children}</DeskContext.Provider>;
}

export function useDesk(): DeskApi {
  const ctx = useContext(DeskContext);
  if (!ctx) throw new Error("useDesk must run inside DeskProvider");
  return ctx;
}
