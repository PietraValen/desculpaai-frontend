'use client';

import { useRouter } from 'next/navigation';

export default function AtivarModoAlibiPage() {
  const router = useRouter();

  const handleFicarDisponivel = () => {
    // Define o status do álibi como online no cache local se necessário
    localStorage.setItem('alibi_status', 'ONLINE');
    
    // Navega para a Tela 08 (Lista de Chamados Próximos)
    router.push('/alibi/chamados');
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-[#0B0C10] text-slate-100 select-none animate-fade-in">
      
      {/* Header com indicador de progresso 1 / 4 do fluxo do Álibi */}
      <header className="flex items-center justify-between w-full pt-2">
        <button 
          onClick={() => router.push('/selecao-perfil')} 
          className="text-gray-400 hover:text-white p-2 text-xl transition-colors"
        >
          ←
        </button>
        <span className="text-gray-400 font-bold tracking-wider text-sm font-sans">MODO ÁLIBI</span>
        <span className="text-gray-600 font-mono text-xs">1 / 4</span>
      </header>

      {/* Conteúdo Central */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center my-4 space-y-6">
        
        {/* Identificador de contexto e Título Principal */}
        <div className="space-y-2">
          <span className="px-2 py-0.5 bg-emerald-950/40 border border-emerald-900/50 text-[#10B981] font-mono text-[10px] rounded uppercase tracking-wider font-bold">
            Álibi
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white mt-2 leading-tight font-sans">
            Pronto para mentir?
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Ative seu modo e receba chamados de pessoas socialmente exaustas na sua região.
          </p>
        </div>

        {/* Card de Reputação e Status do Agente (Robson) */}
        <div className="bg-[#12131A] border border-gray-900 rounded-2xl p-5 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
          {/* Luz sutil de fundo indicando o perfil */}
          <div className="absolute -top-10 w-24 h-24 bg-[#10B981]/5 rounded-full blur-xl pointer-events-none"></div>

          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-3xl shadow-inner mb-3">
            🐱
          </div>
          
          <h3 className="text-xl font-bold text-white tracking-tight">Robson</h3>
          
          {/* Métricas de Histórico e Karma */}
          <div className="mt-2 flex flex-col items-center space-y-1 font-mono text-xs text-gray-400">
            <p className="text-amber-400 font-sans font-semibold">
              ★★★★★ 4.8 <span className="text-gray-600 font-normal">· 23 missões</span>
            </p>
            <p className="text-gray-500 text-[11px] uppercase tracking-wider pt-1">
              Karma acumulado: <span className="text-[#10B981] font-bold">480pts</span>
            </p>
          </div>
        </div>

      </div>

      {/* Botões de Ação Inferiores */}
      <div className="w-full max-w-sm mx-auto pt-4 pb-2 flex flex-col gap-3 z-10">
        {/* Botão Principal de Ativação (Verde Esmeralda Pulsante) */}
        <button
          onClick={handleFicarDisponivel}
          className="w-full py-4 bg-[#10B981] hover:bg-[#0E9F6E] text-slate-950 font-black rounded-2xl transition-all duration-200 active:scale-[0.98] text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 cursor-pointer relative"
        >
          {/* Pequena bolinha de status ativo piscando interna */}
          <span className="h-2 w-2 rounded-full bg-slate-950 animate-pulse"></span>
          Estou disponível para mentiras leves
        </button>

        {/* Botão de Saída / Recuo */}
        <button
          onClick={() => router.push('/selecao-perfil')}
          className="w-full py-3 bg-[#12131A]/40 hover:bg-[#12131A] border border-gray-900/60 text-gray-500 hover:text-gray-400 text-xs font-mono font-bold rounded-xl transition-all duration-200"
        >
          Preservar minha dignidade
        </button>
      </div>

    </main>
  );
}