'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RoteiroMissaoPage() {
  const router = useRouter();

  // 1. Inicie o estado apenas com os valores padrões limpos (seguro para SSR)
const [missao, setMissao] = useState({
  id: 'ped_caotico_123',
  titulo: '"Meu peixe morreu"',
  papel: 'Veterinário Emocional',
  nivel: 'CAOTICO',
});

// 2. No useEffect, atualize APENAS se encontrar algo diferente no localStorage
useEffect(() => {
  const storedId = localStorage.getItem('id_missao_ativa');
  const storedTitulo = localStorage.getItem('titulo_missao_ativa');
  const storedPapel = localStorage.getItem('papel_missao_ativa');
  const storedNivel = localStorage.getItem('nivel_missao_ativa');

  if (storedId || storedTitulo || storedPapel || storedNivel) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMissao({
      id: storedId || 'ped_caotico_123',
      titulo: storedTitulo || '"Meu peixe morreu"',
      papel: storedPapel || 'Veterinário Emocional',
      nivel: storedNivel || 'CAOTICO',
    });
  }
}, []); // Executa apenas uma vez no client-side

  const handleEstouPronto = () => {
    router.push('/alibi/finalizar');
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-[#0B0C10] text-slate-100 select-none animate-fade-in">
      
      {/* Header com indicador de progresso 3 / 4 e Badge de Missão Ativa */}
      <header className="flex items-center justify-between w-full pt-2">
        <button 
          onClick={() => router.push('/alibi/chamados')} 
          className="text-gray-400 hover:text-white p-2 text-xl transition-colors"
        >
          ←
        </button>
        <span className="px-2 py-0.5 bg-emerald-950/30 border border-emerald-500/20 text-[#10B981] font-mono text-[9px] rounded-md font-bold uppercase tracking-wider">
          Missão Aceita
        </span>
        <span className="text-gray-600 font-mono text-xs">3 / 4</span>
      </header>

      {/* Conteúdo do Roteiro */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center my-2 space-y-5 overflow-y-auto max-h-[72vh] pr-1">
        
        {/* Título Operacional */}
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-white font-sans leading-tight">
            {missao.nivel === 'CAOTICO' ? 'Emergência Piscícola' : 'Operação Cortina de Fumaça'}
          </h2>
        </div>

        {/* Box de Instruções do Roteiro (Estilo Code-Block Dark) */}
        <div className="bg-[#12131A] border border-gray-900 rounded-2xl p-5 space-y-4 font-mono text-xs shadow-xl">
          
          {/* CORRIGIDO: Removido os comentários em formato '//' que estavam quebrando o JSX */}
          <div className="space-y-1">
            <p className="text-[#FF3B5C] font-bold text-[11px]">{`// MISSÃO`}</p>
            <p className="text-gray-300 font-sans leading-relaxed text-xs">
              Validar que o peixe morreu e que a situação requer saída imediata da vítima.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-[#10B981] font-bold text-[11px]">{`// PERSONAGEM`}</p>
            <p className="text-gray-300 font-sans leading-relaxed text-xs">
              {missao.papel}. Especialização técnica em luto aquático agudo.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-amber-400 font-bold text-[11px]">{`// ENTRADA (OBRIGATÓRIO)`}</p>
            <p className="text-white italic font-sans font-medium leading-relaxed bg-black/40 border border-gray-900 p-2.5 rounded-xl">
              “Fizemos tudo que podíamos. Ele foi um peixe muito corajoso.”
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-red-500 font-bold text-[11px]">{`// PROIBIDO (QUEBRA CONTEXTO)`}</p>
            <p className="text-gray-500 line-through text-xs">
              {/* CORRIGIDO: Substituído aspas diretas por &quot; */}
              &quot;Que peixe?&quot;
            </p>
          </div>

        </div>

        {/* Alerta de Risco Contextual na Base do bloco */}
        <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-xl text-[11px] text-amber-400/90 leading-relaxed font-sans">
          <span className="font-bold font-mono">⚠️ Nível: {missao.nivel}</span> — Evite contato visual prolongado com testemunhas locais. Compromisso absoluto com o personagem.
        </div>

      </div>

      {/* Botão de Prontidão Inferior */}
      <div className="w-full max-w-sm mx-auto pt-4 pb-2 flex flex-col gap-2.5 z-10">
        <button
          /* CORRIGIDO: Alterado para handleEstouPronto (o nome correto da sua função) */
          onClick={handleEstouPronto}
          className="w-full py-4 bg-[#10B981] hover:bg-[#0E9F6E] text-slate-950 font-black rounded-2xl transition-all duration-200 active:scale-[0.98] text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer"
        >
          Estou pronto para mentir 🎭
        </button>

        <button
          onClick={() => router.push('/alibi/chamados')}
          className="w-full py-2 bg-transparent text-gray-600 hover:text-red-400 text-xs font-mono font-bold transition-colors"
        >
          Desistir por covardia
        </button>
      </div>

    </main>
  );
}