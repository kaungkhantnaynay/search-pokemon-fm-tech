export function Skeleton() {
    return (
        <div className="space-y-12 animate-pulse">
            <div className="rounded-[2.5rem] bg-white/5 border border-white/10 p-12 h-96 flex">
                <div className="w-1/2 flex justify-center items-center">
                    <div className="w-64 h-64 bg-white/10 rounded-full" />
                </div>
                <div className="w-1/2 space-y-6 pt-8">
                    <div className="h-16 bg-white/10 rounded-2xl w-3/4" />
                    <div className="flex gap-2">
                        <div className="h-8 bg-white/10 rounded-full w-24" />
                        <div className="h-8 bg-white/10 rounded-full w-24" />
                    </div>
                    <div className="h-6 bg-white/10 rounded-xl w-1/2" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-white/10 rounded-3xl" />
                        <div className="h-24 bg-white/10 rounded-3xl" />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="h-48 bg-white/5 rounded-[2rem] border border-white/10" />
                <div className="h-48 bg-white/5 rounded-[2rem] border border-white/10" />
            </div>

            <div className="space-y-6">
                <div className="h-10 bg-white/10 rounded-xl w-48" />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-20 bg-white/5 rounded-2xl border border-white/10" />
                        ))}
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-20 bg-white/5 rounded-2xl border border-white/10" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
