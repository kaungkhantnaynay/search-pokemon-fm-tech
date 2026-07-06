'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Search, X, History } from 'lucide-react';
import { useRecentSearches } from '@/hooks/use-recent-searches';

export function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const inputValue = searchParams.get('name') || '';
    const { recent, clearRecent } = useRecentSearches();

    const [isPending, startTransition] = useTransition();

    const updateSearch = (name: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());
            const trimmedName = name.trim();

            if (trimmedName) {
                params.set('name', trimmedName);
            } else {
                params.delete('name');
            }

            router.push(params.size ? `?${params.toString()}` : '/');
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSearch(e.target.value);
    };

    const handleClear = () => {
        updateSearch('');
    };

    const handleRecentSearch = (name: string) => {
        updateSearch(name);
    };

    return (
        <div className="relative w-full max-w-xl mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 md:pl-11 pr-10 md:pr-12 py-3 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all shadow-xl font-medium text-sm md:text-base"
                placeholder="Search Pokémon..."
                value={inputValue}
                onChange={handleInputChange}
                aria-busy={isPending}
            />
            {inputValue && (
                <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear search"
                    className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <X className="h-4 w-4 md:h-5 md:w-5" />
                </button>
            )}

            {/* Recent Searches */}
            {!inputValue && recent.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between mb-3 px-2">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <History className="h-3 w-3" />
                            Recent Searches
                        </h3>
                        <button
                            type="button"
                            onClick={clearRecent}
                            className="text-xs font-bold text-gray-500 hover:text-rose-400 transition-colors"
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {recent.map((name) => (
                            <button
                                type="button"
                                key={name}
                                onClick={() => handleRecentSearch(name)}
                                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
