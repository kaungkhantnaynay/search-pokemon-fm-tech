'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface PokemonCardProps {
    pokemon: {
        id: string;
        number: string;
        name: string;
        image: string;
    };
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('name', pokemon.name);
        router.push(`/?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={handleClick}
            className="group relative flex flex-col items-center p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl text-left w-full"
        >
            <div className="absolute top-4 left-4 text-xs font-bold text-white/20 group-hover:text-blue-400/40 transition-colors">
                #{pokemon.number}
            </div>

            <div className="relative mb-4">
                <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full scale-0 group-hover:scale-110 transition-transform duration-700" />
                <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="relative w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="flex items-center gap-2 group/btn">
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {pokemon.name}
                </h3>
                <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-blue-300 transform group-hover:translate-x-1 transition-all" />
            </div>
        </button>
    );
}
