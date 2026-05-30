'use client';

import { useState, useEffect } from 'react';

export default function Home(){
  const [showSplash, setShowSplash] = useState(true);

  //exibe a splash screen for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-content bg-[#0B0C10] text-slate-100 select-none overflow-hidden">

    {/* ANIMAÇÃO DE RADAR NO BACKGROUND */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="absolute w-75 h-75 rounded-full bg-[#FF3B5C]/5 animate-ping [animation-duration:3s]"></div>
    </div>

    {/*  TELA DE SPLASH PRINCIPAL  */}
      {showSplash ? (
        <div className="z-10 flex flex-col items-center justify-center animate-fade-in text-center">
          <h1 className="text-5xl font-black tracking-tight text-white font-sans">
            Desculpa<span className="text-[#FF3B5C]">AI</span>
          </h1>
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500 font-mono mt-3">
            Álibis sob demanda
          </p>
        </div>
      ) : (
        /*  PRÓXIMA ETAPA (Placeholder para desenvolvimento futuro)  */
        <div className="z-10 text-center animate-fade-in">
          <p className="text-gray-400 font-mono text-sm mb-4">Splash encerrada.</p>
          <h2 className="text-2xl font-bold text-white">Próxima tela aqui...</h2>
        </div>
      )}

    </main>
  )
}