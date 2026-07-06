'use client';

import Image from 'next/image';
import { useQuery } from '@apollo/client/react';
import { GET_POKEMON } from '@/graphql/queries';
import { PokemonCard } from '@/components/PokemonCard';
import { Skeleton } from '@/components/Skeleton';
import { NotFound } from '@/components/NotFound';
import { Zap, Shield, Swords, Info } from 'lucide-react';
import { useRecentSearches } from '@/hooks/use-recent-searches';
import { useEffect } from 'react';
import type { Pokemon, PokemonAttack, PokemonQueryData, PokemonSummary } from '@/types/pokemon';

const statCards = (pokemon: Pokemon) => [
    { label: 'Weight', value: `${pokemon.weight.minimum} - ${pokemon.weight.maximum}` },
    { label: 'Height', value: `${pokemon.height.minimum} - ${pokemon.height.maximum}` },
    { label: 'Max CP', value: pokemon.maxCP },
    { label: 'Max HP', value: pokemon.maxHP },
    { label: 'Flee Rate', value: `${(pokemon.fleeRate * 100).toFixed(0)}%`, className: 'sm:col-span-2' },
];

function StatCard({ label, value, className = '' }: { label: string; value: string | number; className?: string }) {
    return (
        <div className={`p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors ${className}`}>
            <p className="text-gray-400 text-[10px] md:text-sm font-bold uppercase tracking-widest mb-1">{label}</p>
            <p className="text-lg md:text-2xl font-bold text-white tracking-tight">{value}</p>
        </div>
    );
}

function TypeList({ items, color }: { items: string[]; color: 'emerald' | 'rose' }) {
    const colorClasses = {
        emerald: 'bg-emerald-400/10 text-emerald-300',
        rose: 'bg-rose-400/10 text-rose-300',
    };

    return (
        <div className="flex flex-wrap gap-2">
            {items.map((type) => (
                <span key={type} className={`px-4 py-2 rounded-xl text-sm font-bold ${colorClasses[color]}`}>
                    {type}
                </span>
            ))}
        </div>
    );
}

function AttackList({ title, attacks, color }: { title: string; attacks: PokemonAttack[]; color: 'amber' | 'purple' }) {
    const dotClasses = {
        amber: 'bg-amber-400',
        purple: 'bg-purple-400',
    };
    const typeClasses = {
        amber: 'text-red-400',
        purple: 'text-purple-400',
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-400 flex items-center gap-2 px-2">
                <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[color]}`} />
                {title}
            </h3>
            <div className="space-y-3">
                {attacks.map((attack) => (
                    <div key={attack.name} className="flex justify-between items-center p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:translate-x-1 duration-300">
                        <div className="space-y-1">
                            <p className="font-black text-white">{attack.name}</p>
                            <p className={`text-xs font-bold uppercase tracking-widest ${typeClasses[color]}`}>{attack.type}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-black text-white leading-none">{attack.damage}</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">DMG</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PokemonEvolutions({ evolutions, requirements }: {
    evolutions: PokemonSummary[] | null,
    requirements?: { amount: number; name: string }
}) {
    if (!evolutions || evolutions.length === 0) return null;

    return (
        <section className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Zap className="h-8 w-8 text-amber-400" />
                    <h2 className="text-4xl font-black text-white tracking-tight">Next Evolutions</h2>
                </div>
                {requirements && (
                    <div className="px-6 py-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 backdrop-blur-md">
                        <p className="text-amber-300 text-sm font-bold uppercase tracking-widest">
                            Evolution Cost: <span className="text-white ml-2">{requirements.amount} {requirements.name}</span>
                        </p>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {evolutions.map((evolution) => (
                    <PokemonCard key={evolution.id} pokemon={evolution} />
                ))}
            </div>
        </section>
    );
}

export function PokemonResult({ name }: { name: string | null }) {
    const { addSearch } = useRecentSearches();

    const { data, loading, error } = useQuery<PokemonQueryData>(GET_POKEMON, {
        variables: { name },
        skip: !name,
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        if (data?.pokemon?.name) {
            addSearch(data.pokemon.name);
        }
    }, [data, addSearch]);

    if (!name) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/10 ring-4 ring-white/5">
                    <Info className="h-10 w-10 text-red-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Ready to Explore?</h2>
                <p className="text-gray-400 max-w-sm text-lg">
                    Start typing a Pokémon name in the search bar above to see its details.
                </p>
            </div>
        );
    }

    if (loading) return <Skeleton />;
    if (error) return <NotFound message="Something went wrong while fetching Pokémon data." />;
    if (!data?.pokemon) return <NotFound />;

    const pokemon = data.pokemon;

    return (
        <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-12 shadow-2xl">
                <div className="absolute top-0 right-0 p-4 md:p-8 text-6xl md:text-8xl font-black text-white/5 select-none touch-none">
                    #{pokemon.number}
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="flex justify-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-red-500/20 blur-[80px] rounded-full group-hover:bg-red-500/30 transition-all duration-700" />
                            <Image
                                src={pokemon.image}
                                alt={pokemon.name}
                                width={288}
                                height={288}
                                priority
                                className="relative w-72 h-72 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                                {pokemon.name}
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                {pokemon.types.map((type: string) => (
                                    <span
                                        key={type}
                                        className="px-5 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-200 text-sm font-bold uppercase tracking-wider backdrop-blur-md"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <p className="text-xl text-gray-300 leading-relaxed font-medium">
                            {pokemon.classification}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {statCards(pokemon).map((stat) => (
                                <StatCard key={stat.label} {...stat} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <section className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md hover:bg-emerald-500/10 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="h-6 w-6 text-emerald-400" />
                        <h2 className="text-2xl font-bold text-white tracking-tight">Resistant To</h2>
                    </div>
                    <TypeList items={pokemon.resistant} color="emerald" />
                </section>

                <section className="p-8 rounded-[2rem] bg-rose-500/5 border border-rose-500/10 backdrop-blur-md hover:bg-rose-500/10 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="h-6 w-6 text-rose-400" />
                        <h2 className="text-2xl font-bold text-white tracking-tight">Weaknesses</h2>
                    </div>
                    <TypeList items={pokemon.weaknesses} color="rose" />
                </section>
            </div>

            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <Swords className="h-8 w-8 text-red-400" />
                    <h2 className="text-4xl font-black text-white tracking-tight">Battle Moves</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <AttackList title="FAST ATTACKS" attacks={pokemon.attacks.fast} color="amber" />
                    <AttackList title="SPECIAL ATTACKS" attacks={pokemon.attacks.special} color="purple" />
                </div>
            </section>

            <PokemonEvolutions evolutions={pokemon.evolutions} requirements={pokemon.evolutionRequirements} />
        </div>
    );
}
