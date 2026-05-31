'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FinalizarMissaoPage() {
  const router = useRouter();
  const [resultado, setResultado] = useState<'SUCESSO' | 'ESCALOU' | 'DESMASCARADO' | null>(null);
  const [isFinalizando, setIsFinalizando] = useState(false);

  const handleEncerrarDemo = () => {
    if (!resultado) return;
    setIsFinalizando(true);

    // Simulação do PUT /pedidos/{id}/finalizar alterando para FINALIZADO
    setTimeout(() => {
      // Limpa os estados locais do álibi para reiniciar a demo perfeitamente
      localStorage.removeItem('id_missao_ativa');
      localStorage.removeItem('titulo_missao_ativa');
      localStorage.removeItem('papel_missao_ativa');
      localStorage.removeItem('nivel_missao_ativa');

      // Retorna para a seleção de perfis
      router.push('/selecao-perfil');
    }, 1500);
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-[#0B0C10] text-slate-100 select-none animate-fade-in">
      
      {/* Header final do Álibi 4 / 4 */}
      <header className="flex items-center justify-between w-full pt-2">
        <div className="w-8"></div>
        <span className="text-gray-400 font-bold tracking-wider text-sm font-sans">FINALIZAR MISSÃO</span>
        <span className="text-gray-600 font-mono text-xs">4 / 4</span>
      </header>

      {/* Conteúdo Central */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center my-4 space-y-6">
        
        {/* Painel do Troféu */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 text-[#10B981] border border-emerald-500/20 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950/10">
            🏆
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white mt-3 font-sans">
            A desculpa foi aceita?
          </h2>
          <p className="text-xs text-gray-400 px-4 leading-relaxed">
            Registre o resultado da missão para liberar seus pontos de karma duvidoso.
          </p>
        </div>

        {/* Inputs de Opções (Conjunto de Botões de Desfecho) */}
        <div className="flex flex-col gap-3">
          
          {/* Opção 1: Fugiu com sucesso (Verde) */}
          <button
            type="button"
            onClick={() => setResultado('SUCESSO')}
            className={`w-full py-4 px-5 rounded-2xl font-bold text-sm text-left border transition-all duration-200 active:scale-[0.99] ${
              resultado === 'SUCESSO'
                ? 'bg-[#0E1714] border-[#10B981] text-[#10B981]'
                : 'bg-[#12131A] border-gray-900 text-gray-300 hover:border-gray-800'
            }`}
          >
            ✓ Sim — ele(a) fugiu com sucesso
          </button>

          {/* Opção 2: A situação escalou (Vermelho) */}
          <button
            type="button"
            onClick={() => setResultado('ESCALOU')}
            className={`w-full py-4 px-5 rounded-2xl font-bold text-sm text-left border transition-all duration-200 active:scale-[0.99] ${
              resultado === 'ESCALOU'
                ? 'bg-[#1A1115] border-[#FF3B5C] text-[#FF3B5C]'
                : 'bg-[#12131A] border-gray-900 text-gray-300 hover:border-gray-800'
            }`}
          >
            🚨 A situação escalou
          </button>

          {/* Opção 3: Fui desmascarado (Cinza Fosco) */}
          <button
            type="button"
            onClick={() => setResultado('DESMASCARADO')}
            className={`w-full py-4 px-5 rounded-2xl font-bold text-sm text-left border transition-all duration-200 active:scale-[0.99] ${
              resultado === 'DESMASCARADO'
                ? 'bg-[#171821] border-gray-600 text-gray-400'
                : 'bg-[#12131A] border-gray-900 text-gray-400 hover:border-gray-800'
            }`}
          >
            🤫 Fui desmascarado(a). Solicito anonimato.
          </button>

        </div>

        {/* Painel de Recompensa Final (Acúmulo de Karma) */}
        <div className="bg-[#12131A] border border-gray-900 rounded-2xl p-4 flex items-center justify-between font-mono text-xs">
          <div>
            <span className="text-gray-500 text-[9px] uppercase tracking-wider block">Recompensa</span>
            <span className="text-[#10B981] text-lg font-black font-sans">+20 pts</span>
            <span className="text-[9px] text-gray-600 block -mt-1 font-sans">karma duvidoso</span>
          </div>
          <div className="text-right border-l border-gray-900 pl-4">
            <span className="text-gray-500 text-[9px] uppercase tracking-wider block">Total acumulado</span>
            <span className="text-white text-lg font-black font-sans">480 pts</span>
          </div>
        </div>

      </div>

      {/* Botão de Encerramento do Ciclo */}
      <div className="w-full max-w-sm mx-auto pt-4 pb-2">
        <button
          onClick={handleEncerrarDemo}
          disabled={!resultado || isFinalizando}
          className={`w-full py-4 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-base ${
            resultado && !isFinalizando
              ? 'bg-[#10B981] hover:bg-[#0E9F6E] active:scale-[0.98] cursor-pointer text-slate-950 font-black shadow-lg shadow-emerald-950/10'
              : 'bg-gray-800/40 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isFinalizando ? 'Computando reputação...' : 'Encerrar missão'}
        </button>
      </div>

    </main>
  );
}