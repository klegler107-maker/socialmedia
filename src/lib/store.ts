// In-memory store for CSV data keyed by session ID.
// Data persists only for the lifetime of the server process.
// Sessions are tied to authenticated users via Clerk userId.

export interface CsvRow {
  [key: string]: string;
}

export interface SessionData {
  userId: string;
  csvData: CsvRow[];
  columns: string[];
  fileName: string;
  rowCount: number;
}

const store = new Map<string, SessionData>();

export function setSessionData(sessionId: string, data: SessionData): void {
  store.set(sessionId, data);
}

export function getSessionData(
  sessionId: string,
): SessionData | undefined {
  return store.get(sessionId);
}

export function hasSessionData(sessionId: string): boolean {
  return store.has(sessionId);
}
