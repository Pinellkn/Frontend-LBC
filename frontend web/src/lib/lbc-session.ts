import { useCallback, useEffect, useState } from "react";

/**
 * Session et recherches récentes, stockées dans le navigateur (localStorage).
 * C'est une session de démonstration côté interface : elle sera remplacée par
 * une vraie authentification quand le back-end sera branché.
 */

const SESSION_KEY = "lbc.session";
const RECENTS_KEY = "lbc.recent-searches";
const CHANGE_EVENT = "lbc-storage";
const MAX_RECENTS = 8;

export type LbcSession = {
  name: string;
  email: string;
  profile: string;
  phone?: string;
  city?: string;
  jobTitle?: string;
  bio?: string;
  joinedAt?: string;
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // stockage indisponible : on ignore
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

const PROFILES_KEY = "lbc.profiles";

type ProfileExtras = Partial<LbcSession>;

export function signIn(session: LbcSession) {
  // Les informations de profil modifiées sont conservées par e-mail, même après déconnexion.
  const profiles = read<Record<string, ProfileExtras>>(PROFILES_KEY, {});
  const saved = profiles[session.email] ?? {};
  const joinedAt = saved.joinedAt ?? new Date().toISOString();
  write(PROFILES_KEY, { ...profiles, [session.email]: { ...saved, joinedAt } });
  write(SESSION_KEY, { ...session, ...saved, joinedAt });
}

export function updateSession(patch: Partial<LbcSession>) {
  const current = read<LbcSession | null>(SESSION_KEY, null);
  if (!current) return;
  const next = { ...current, ...patch };
  const profiles = read<Record<string, ProfileExtras>>(PROFILES_KEY, {});
  write(PROFILES_KEY, {
    ...profiles,
    [current.email]: { ...profiles[current.email], ...patch, email: current.email },
  });
  write(SESSION_KEY, next);
}

export function signOut() {
  write(SESSION_KEY, null);
}

export function useSession() {
  const [state, setState] = useState<{ ready: boolean; session: LbcSession | null }>({
    ready: false,
    session: null,
  });

  useEffect(() => {
    const sync = () =>
      setState({ ready: true, session: read<LbcSession | null>(SESSION_KEY, null) });
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return state;
}

export function useRecentSearches() {
  const [recents, setRecents] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setRecents(read<string[]>(RECENTS_KEY, []));
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((query: string) => {
    const value = query.trim();
    if (!value) return;
    const current = read<string[]>(RECENTS_KEY, []);
    const next = [
      value,
      ...current.filter((item) => item.toLowerCase() !== value.toLowerCase()),
    ].slice(0, MAX_RECENTS);
    write(RECENTS_KEY, next);
  }, []);

  const remove = useCallback((query: string) => {
    write(
      RECENTS_KEY,
      read<string[]>(RECENTS_KEY, []).filter((item) => item !== query),
    );
  }, []);

  const clear = useCallback(() => write(RECENTS_KEY, []), []);

  return { recents, add, remove, clear };
}
