'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/entrada');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#0B0C10] select-none overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#FF3B5C]/5 animate-ping [animation-duration:3s]"></div>
      </div>

      <div className="z-10 flex flex-col items-center justify-center animate-fade-in text-center">
        <h1 className="text-5xl font-black tracking-tight text-white font-sans">
          Desculpa<span className="text-[#FF3B5C]">AI</span>
        </h1>
        <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500 font-mono mt-3">
          Álibis sob demanda
        </p>
      </div>
    </main>
  );
}