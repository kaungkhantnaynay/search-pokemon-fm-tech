import { SearchInput } from "@/components/SearchInput";
import { PokemonResult } from "@/components/PokemonResult";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: Promise<{ name?: string }> }) {
  const { name } = await searchParams;

  return (
    <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-8 md:pb-12 min-h-screen">
      <div className="flex flex-col items-center mb-10 md:mb-16 space-y-4 md:space-y-6">

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-center tracking-tighter text-white animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-500">Pokémon</span>
        </h1>
        <p className="text-gray-400 text-base md:text-xl text-center max-w-2xl font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          “Enter a Pokémon name”
        </p>
      </div>

      <div className="sticky top-4 md:top-8 z-50 mb-10 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
        <Suspense fallback={<div className="h-14 w-full bg-white/5 animate-pulse rounded-2xl" />}>
          <SearchInput />
        </Suspense>
      </div>

      <div className="max-w-6xl mx-auto">
        <Suspense fallback={<div className="h-96 w-full bg-white/5 animate-pulse rounded-[2.5rem]" />}>
          <PokemonResult key={name} name={name ?? null} />
        </Suspense>
      </div>
    </div>
  );
}
