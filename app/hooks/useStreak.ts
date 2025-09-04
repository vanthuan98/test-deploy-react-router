import { useCallback, useEffect, useMemo, useState } from 'react';

type StreakState = {
  currentStreak: number;
  lastStudyDate: string | null; // ISO yyyy-mm-dd
};

const STORAGE_KEY = 'vocab_study_streak_v1';

function getTodayIso(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function isYesterday(dateIso: string | null): boolean {
  if (!dateIso) return false;
  const d = new Date(dateIso + 'T00:00:00');
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return (
    d.getFullYear() === y.getFullYear() &&
    d.getMonth() === y.getMonth() &&
    d.getDate() === y.getDate()
  );
}

function isToday(dateIso: string | null): boolean {
  if (!dateIso) return false;
  return dateIso === getTodayIso();
}

/**
 * Manage continuous study days (streak) persisted in localStorage.
 * - Call markStudiedToday() when the user completes a learning action for today.
 */
export function useStreak() {
  const [state, setState] = useState<StreakState>({
    currentStreak: 0,
    lastStudyDate: null,
  });

  // Load from localStorage on first mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StreakState;
        setState(parsed);
      }
    } catch {
      // ignore corrupted data
    }
  }, []);

  const persist = useCallback((next: StreakState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage might be unavailable (private mode)
    }
  }, []);

  const markStudiedToday = useCallback(() => {
    setState(prev => {
      const today = getTodayIso();

      if (isToday(prev.lastStudyDate)) {
        const same = { ...prev };
        // already counted today
        persist(same);
        return same;
      }

      const next: StreakState = {
        currentStreak: isYesterday(prev.lastStudyDate)
          ? prev.currentStreak + 1
          : 1,
        lastStudyDate: today,
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const resetStreak = useCallback(() => {
    const next: StreakState = { currentStreak: 0, lastStudyDate: null };
    setState(next);
    persist(next);
  }, [persist]);

  const currentStreak = state.currentStreak;
  const lastStudyDate = state.lastStudyDate;

  return useMemo(
    () => ({ currentStreak, lastStudyDate, markStudiedToday, resetStreak }),
    [currentStreak, lastStudyDate, markStudiedToday, resetStreak]
  );
}
