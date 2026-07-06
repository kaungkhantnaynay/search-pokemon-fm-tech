import type { Metadata } from "next";
import "./globals.css";
import { ApolloWrapper } from "@/providers/ApolloProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pokédex | Tech Search",
  description: "Advanced Pokémon search platform built with Next.js and GraphQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-slate-200 min-h-screen selection:bg-red-500/30">
        <ApolloWrapper>
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 blur-[120px] rounded-full" />
          </div>
          <main className="relative z-0">
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
