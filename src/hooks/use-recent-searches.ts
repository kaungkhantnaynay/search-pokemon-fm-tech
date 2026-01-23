'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pokemon_recent_searches';
const MAX_RECENT = 5;

export function useRecentSearches() {
    const [recent, setRecent] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setRecent(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse recent searches', e);
            }
        }
    }, []);

    const addSearch = useCallback((name: string) => {
        if (!name) return;
        const lowerName = name.trim().toLowerCase();
        setRecent((prev) => {
            const filtered = prev.filter((s) => s.toLowerCase() !== lowerName);
            const updated = [name.trim(), ...filtered].slice(0, MAX_RECENT);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    const clearRecent = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setRecent([]);
    }, []);

    return { recent, addSearch, clearRecent };
}
