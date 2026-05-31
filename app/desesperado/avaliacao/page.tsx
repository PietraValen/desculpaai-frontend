'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AvaliacaoPage() {
  const router = useRouter();
  
  // Estados para as notas de 1 a 5 estrelas
  const [notas, setNotas] = useState({
    atuacao: 5,
    drama: 5,
    escape: 5,
  });
  
  const [relatorio, setRelatorio] = useState<'MED' | 'DUV' | 'ALTO' | null>(null);
  const [isEnviando, setIsEnviando] = useState(false);

  const handleSetNota = (campo: 'atuacao' | 'drama' | 'escape', valor: number) => {
    setNotas(prev => ({ ...prev, [campo]: valor }));
  };

  const handleEnviarAvaliacao = () => {
    setIsEnviando(true);

    // Simulação do encerramento do ciclo no backend
    setTimeout(() => {
      // Limpa os estados de desespero locais para permitir uma nova rodada na demo
      localStorage.removeItem('desesperado_situacao');
      localStorage.removeItem('current_pedido_id');
      localStorage.removeItem('current_pedido_status');

      // Retorna o usuário para o início (Chaveamento de perfil)
      router.push('/selecao-perfil');
    }, 1500);
  };

  // Helper simples para renderizar as 5 estrelas interativas
  const renderEstrelas = (campo: 'atuacao' | 'drama' | 'escape', notaAtual: number) => {
    return (
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((estrela) => (
          <button
            key={estrela}
            type="button"
            onClick={() => handleSetNota(campo, estrela)}
            className={`text-xl transition-transform active:scale-125 ${
              estrela <= notaAtual ? 'text-amber-400' : 'text-gray-700'
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-[#0B0C10] text-slate-100 select-none animate-fade-in">
      
      {/* Header final 5 / 5 */}
      <header className="flex items-center justify-between w-full pt-2">
        <div className="w-8"></div> {/* Espaçador para centralizar o título */}
        <span className="text-gray-400 font-bold tracking-wider text-sm">AVALIAÇÃO</span>
        <span className="text-gray-600 font-mono text-xs">5 / 5</span>
      </header>

      {/* Conteúdo Central */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center my-4 space-y-6 overflow-y-auto max-h-[75vh] pr-1">
        
        {/* Sucesso e Ícone Principal */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500/10 text-[#10B981] border border-emerald-500/20 flex items-center justify-center text-3xl shadow-lg shadow-emerald-950/10 animate-bounce">
            🐟
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#10B981] mt-3">
            Missão Cumprida
          </h2>
          <p className="text-xs text-gray-400 px-6 leading-relaxed">
            O Robson deu tudo por você. O mínimo que pode fazer é avaliá-lo.
          </p>
        </div>

        <hr className="border-gray-900" />

        {/* Formulário de Critérios */}
        <div className="space-y-4 bg-[#12131A]/40 p-4 rounded-2xl border border-gray-900/60">
          <span className="text-[9px] tracking-widest uppercase font-mono text-gray-500 block font-bold">
            Avalie o Robson
          </span>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-300 font-medium">Atuação convincente?</span>
            {renderEstrelas('atuacao', notas.atuacao)}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-300 font-medium">Drama no momento certo?</span>
            {renderEstrelas('drama', notas.drama)}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-300 font-medium">Saiu sem perguntas?</span>
            {renderEstrelas('escape', notas.escape)}
          </div>
        </div>

        {/* Relatório de Danos (Seletor Horizontal Conforme Print) */}
        <div className="space-y-3">
          <span className="text-[9px] tracking-widest uppercase font-mono text-gray-500 block font-bold">
            Relatório da Missão (Dano Colateral)
          </span>
          
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            {/* Bloco MED */}
            <button
              type="button"
              onClick={() => setRelatorio('MED')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                relatorio === 'MED'
                  ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400'
                  : 'bg-[#12131A] border-gray-900 text-gray-600 hover:text-gray-400'
              }`}
            >
              <span className="text-sm font-black tracking-wider block">MED</span>
              <span className="text-[8px] uppercase tracking-wide opacity-80 mt-0.5">Vergonha</span>
            </button>

            {/* Bloco DUV */}
            <button
              type="button"
              onClick={() => setRelatorio('DUV')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                relatorio === 'DUV'
                  ? 'bg-orange-500/10 border-orange-500 text-orange-400'
                  : 'bg-[#12131A] border-gray-900 text-gray-600 hover:text-gray-400'
              }`}
            >
              <span className="text-sm font-black tracking-wider block">DUV</span>
              <span className="text-[8px] uppercase tracking-wide opacity-80 mt-0.5">Credibilidade</span>
            </button>

            {/* Bloco ALTO */}
            <button
              type="button"
              onClick={() => setRelatorio('ALTO')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                relatorio === 'ALTO'
                  ? 'bg-red-500/10 border-[#FF3B5C] text-[#FF3B5C]'
                  : 'bg-[#12131A] border-gray-900 text-gray-600 hover:text-gray-400'
              }`}
            >
              <span className="text-sm font-black tracking-wider block">ALTO</span>
              <span className="text-[8px] uppercase tracking-wide opacity-80 mt-0.5">Risco</span>
            </button>
          </div>
        </div>

      </div>

      {/* Botão Finalizador */}
      <div className="w-full max-w-sm mx-auto pt-4 pb-2">
        <button
          onClick={handleEnviarAvaliacao}
          disabled={isEnviando}
          className="w-full py-4 bg-[#FF3B5C] hover:bg-[#E02F4E] disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-base active:scale-[0.98] shadow-lg shadow-[#FF3B5C]/10 cursor-pointer"
        >
          {isEnviando ? 'Arquivando provas...' : 'Enviar avaliação'}
        </button>
      </div>

    </main>
  );
}