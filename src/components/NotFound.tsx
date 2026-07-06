import { Ghost, Search } from 'lucide-react';

interface NotFoundProps {
    message?: string;
}

export function NotFound({ message = "We couldn't find that Pokémon." }: NotFoundProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-rose-500/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-rose-500/20 ring-4 ring-rose-500/5">
                <Ghost className="h-10 w-10 text-rose-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Not Found</h2>
            <p className="text-gray-400 max-w-sm text-lg font-medium leading-relaxed">
                {message}
            </p>
            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                <Search className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-500">Try searching for <strong>Pikachu</strong> or <strong>Charizard</strong></span>
            </div>
        </div>
    );
}
