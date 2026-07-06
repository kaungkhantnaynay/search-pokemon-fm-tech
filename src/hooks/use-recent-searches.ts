'use client';

import { useState, useCallback } from 'react';

const STORAGE_KEY = 'pokemon_recent_searches';
const MAX_RECENT = 5;

export function useRecentSearches() {
    const [recent, setRecent] = useState<string[]>(() => {
        if (typeof window === 'undefined') return [];

        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to parse recent searches', error);
            return [];
        }
    });

    const addSearch = useCallback((name: string) => {
        if (!name) return;
        const lowerName = name.trim().toLowerCase();
        setRecent((prev) => {
            const filtered = prev.filter((s) => s.toLowerCase() !== lowerName);
            const updated = [name.trim(), ...filtered].slice(0, MAX_RECENT);
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    const clearRecent = useCallback(() => {
        window.localStorage.removeItem(STORAGE_KEY);
        setRecent([]);
    }, []);

    return { recent, addSearch, clearRecent };
}
