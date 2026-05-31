'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FRASES_ROTATIVAS = [
  "Verificando atores frustrados na sua região...",
  "Contatando primos de segundo grau disponíveis...",
  "Aquecendo motores dos dublês de choro...",
  "Garantindo que o álibi não vai rir na hora...",
];

export default function StatusPage() {
  const router = useRouter();
  
  // Estados de controle do fluxo
  const [status, setStatus] = useState<'CRIADO' | 'ACEITO'>('CRIADO');
  const [fraseIndex, setFraseIndex] = useState(0);
  const [stepTimeline, setStepTimeline] = useState(1);

  // 1. Lógica de frases rotativas (Mínimo 3 frases divertidas)
  useEffect(() => {
    if (status !== 'CRIADO') return;
    
    const interval = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % FRASES_ROTATIVAS.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [status]);

  // 2. Simulação de Polling (GET /pedidos/{id}) 
  useEffect(() => {
    // Passo 1: Procurando (0s a 3s)
    const timerStatus1 = setTimeout(() => setStepTimeline(2), 3000);
    
    // Passo 2: Encontrado e ensaiando (3s a 6s)
    const timerStatus2 = setTimeout(() => setStepTimeline(3), 6000);

    // Passo 3: Transição para ACEITO (Fim do Polling com Sucesso aos 7.5s)
    const timerFinal = setTimeout(() => {
      setStatus('ACEITO');
      localStorage.setItem('current_pedido_status', 'ACEITO');
    }, 7500);

    return () => {
      clearTimeout(timerStatus1);
      clearTimeout(timerStatus2);
      clearTimeout(timerFinal);
    };
  }, []);

  const handleFugiComSucesso = () => {
    router.push('/desesperado/avaliacao');
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-[#0B0C10] text-slate-100 select-none animate-fade-in">
      
      {/* Header Dinâmico */}
      <header className="flex items-center justify-between w-full pt-2">
        <button 
          onClick={() => router.back()} 
          className="text-gray-400 hover:text-white p-2 text-xl transition-colors"
        >
          ←
        </button>
        <span className="text-gray-400 font-bold tracking-wider text-sm">
          {status === 'CRIADO' ? 'BUSCANDO' : 'ÁLIBI ACEITO'}
        </span>
        <span className="text-gray-600 font-mono text-xs">
          {status === 'CRIADO' ? '3 / 5' : '4 / 5'}
        </span>
      </header>

      {/* ─── RENDERIZAÇÃO DA TELA 04: STATUS 'CRIADO' (BUSCANDO) ─── */}
      {status === 'CRIADO' && (
        <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-around my-4 items-center">
          
          {/* Radar Pulsante Centralizado */}
          <div className="relative flex items-center justify-center h-48 w-48">
            <div className="absolute w-4 h-4 rounded-full bg-[#FF3B5C] z-10 shadow-lg shadow-[#FF3B5C]/50"></div>
            <div className="absolute w-24 h-24 rounded-full border border-[#FF3B5C]/20 animate-ping [animation-duration:2s]"></div>
            <div className="absolute w-40 h-40 rounded-full border border-[#FF3B5C]/10 animate-ping [animation-duration:3.5s]"></div>
          </div>

          {/* Feedback e Frase Rotativa */}
          <div className="text-center space-y-3 px-4 min-h-[70px]">
            <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-900/50 text-[#10B981] font-mono text-[10px] rounded-full uppercase tracking-wider font-bold animate-pulse">
              • Álibi Localizado
            </span>
            <p className="text-sm font-medium text-gray-300 transition-all duration-300">
              {/* CORRIGIDO: Inserido as aspas como string JS em vez de caractere puro */}
              {`"${FRASES_ROTATIVAS[fraseIndex]}"`}
            </p>
          </div>

          {/* Timeline de status vertical do Polling */}
          <div className="w-full space-y-3.5 px-6 font-mono text-xs">
            <div className={`flex items-center gap-3 ${stepTimeline >= 1 ? 'text-[#10B981]' : 'text-gray-700'}`}>
              <span>{stepTimeline > 1 ? '✓' : '•'}</span>
              <p>Buscando álibis próximos</p>
            </div>
            <div className={`flex items-center gap-3 ${stepTimeline >= 2 ? 'text-[#10B981]' : 'text-gray-700'}`}>
              <span>{stepTimeline > 2 ? '✓' : stepTimeline === 2 ? '⚡' : '•'}</span>
              <p>Álibi encontrado</p>
            </div>
            <div className={`flex items-center gap-3 ${stepTimeline >= 3 ? 'text-[#10B981]' : 'text-gray-700'}`}>
              <span>{stepTimeline === 3 ? '⏳' : '•'}</span>
              <p>Álibi ensaiando atuação</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <span>•</span>
              <p>Álibi a caminho</p>
            </div>
          </div>

        </div>
      )}

      {/* ─── RENDERIZAÇÃO DA TELA 05: STATUS 'ACEITO' ─── */}
      {status === 'ACEITO' && (
        <div className="w-full max-w-sm mx-auto flex-grow flex flex-col justify-center my-4 space-y-6 animate-fade-in">
          
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#10B981] font-bold flex items-center gap-1">
              ✓ ÁLIBI A CAMINHO
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white leading-none pt-1">
              Seu álibi aceito
            </h2>
          </div>

          {/* Card do Ator (Robson) */}
          <div className="bg-[#12131A] border border-gray-900 rounded-2xl p-5 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-2xl shadow-inner">
                🐱
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Robson</h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">
                  ★ 4.8 <span className="text-gray-500 font-normal">em constrangimento</span>
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[#10B981] font-mono text-[10px] rounded-md font-bold uppercase tracking-wider">
              A caminho
            </span>
          </div>

          {/* Roteiro/Metadados da Mentira */}
          <div className="bg-[#12131A]/40 border border-gray-900/60 rounded-2xl p-5 space-y-4 text-xs font-sans">
            <div className="flex justify-between items-center border-b border-gray-900 pb-2.5">
              <span className="text-gray-500 font-mono uppercase tracking-wider text-[10px]">Distância</span>
              <span className="text-[#10B981] font-bold">400m · <span className="font-mono text-white">~4 min</span></span>
            </div>
            <div className="flex justify-between items-start border-b border-gray-900 pb-2.5">
              <span className="text-gray-500 font-mono uppercase tracking-wider text-[10px] pt-0.5">Papel</span>
              <span className="text-[#FF3B5C] font-bold text-right max-w-[180px]">Veterinário Emocional</span>
            </div>
            <div className="flex flex-col gap-1.5 border-b border-gray-900 pb-2.5">
              <span className="text-gray-500 font-mono uppercase tracking-wider text-[10px]">Entrada</span>
              <p className="text-white italic font-medium leading-relaxed bg-black/20 p-2 rounded-lg border border-gray-900/40">
                {/* CORRIGIDO: Substituído as aspas diretas por entidades HTML &quot; */}
                &quot;A gente precisa ir. O peixe não resistiu.&quot;
              </p>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-gray-500 font-mono uppercase tracking-wider text-[10px] pt-0.5">Tom</span>
              <p className="text-gray-300 text-right max-w-[200px] leading-tight">
                Drama moderado. Urgência controlada.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Botões Inferiores Fixos (Só aparecem quando o álibi aceita) */}
      <div className="w-full max-w-sm mx-auto pt-4 pb-2 z-10">
        {status === 'ACEITO' ? (
          <div className="flex flex-col gap-3">
            <button
              onClick={handleFugiComSucesso}
              className="w-full py-4 bg-[#10B981] hover:bg-[#0E9F6E] text-slate-950 font-black rounded-2xl transition-all duration-200 active:scale-[0.98] text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer"
            >
              ✓ Fugi com sucesso
            </button>
            <button
              onClick={() => router.push('/entrada')}
              className="w-full py-3 bg-[#12131A] hover:bg-red-950/20 border border-gray-900 hover:border-red-900/30 text-gray-500 hover:text-red-400 text-xs font-mono font-bold rounded-xl transition-all duration-200"
            >
              A situação escalou 🚨
            </button>
          </div>
        ) : (
          /* Placeholder invisível para manter o espaçamento do flexbox */
          <div className="h-12 w-full opacity-0"></div>
        )}
      </div>

    </main>
  );
}