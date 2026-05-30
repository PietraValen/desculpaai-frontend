'use client';

import { useRouter } from 'next/navigation';

export default function Entrada() {
  const router = useRouter();

  // NOTA 01: Quem clica em "Sim" é redirecionado pro Google. O app não é pra pessoas bem.
  const handleImGood = () => {
    window.location.href = 'https://www.google.com';
  };

  // NOTA 02: "Não, preciso sumir" leva à seleção de perfil.
  const handleNeedToDisappear = () => {
    router.push('/selecao-perfil');
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between p-6 bg-[#0B0C10] text-slate-100 select-none overflow-hidden">
      
      {/* NOTA 03: Animação de radar pulsante em background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="absolute w-[320px] h-[320px] rounded-full bg-[#FF3B5C]/5 animate-ping [animation-duration:3s]"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FF3B5C]/2 animate-ping [animation-duration:4s]"></div>
      </div>

      {/* Topo / Logo */}
      <div className="text-center pt-12 z-10 animate-fade-in">
        <h1 className="text-4xl font-black tracking-tight text-white font-sans">
          Desculpa<span className="text-[#FF3B5C]">AI</span>
        </h1>
        <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-mono mt-2">
          Álibis sob demanda
        </p>
      </div>

      {/* Pergunta Central e CTAs */}
      <div className="w-full max-w-sm text-center my-auto space-y-8 z-10 animate-fade-in">
        <h2 className="text-3xl font-bold tracking-tight text-white font-sans">
          Você está bem?
        </h2>
        
        <div className="flex flex-col gap-4 px-2">
          {/* CTA Principal - Botão Vermelho */}
          <button
            onClick={handleNeedToDisappear}
            className="w-full py-4 bg-[#FF3B5C] hover:bg-[#E02F4E] text-white font-bold rounded-2xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#FF3B5C]/20 text-base"
          >
            Não, preciso sumir 🚨
          </button>

          {/* Botão Secundário - Sim, estou bem */}
          <button
            onClick={handleImGood}
            className="w-full py-4 bg-[#12131A] hover:bg-[#161821] border border-gray-800 text-gray-400 font-medium rounded-2xl transition-all duration-200 active:scale-[0.98] text-base"
          >
            Sim, estou bem
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-4 z-10">
        <p className="text-[9px] tracking-[0.2em] uppercase text-gray-600 font-mono">
          Terceirizando constrangimentos desde 2026
        </p>
      </div>

    </main>
  );
}