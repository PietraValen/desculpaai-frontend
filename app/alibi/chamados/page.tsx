 
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Chamado {
  id: string;
  nivel: 'LEVE' | 'MEDIO' | 'CAOTICO';
  recompensa: number;
  desculpa: string;
  distancia: string;
  situacaoContexto: string;
  papelExigido: string;
}

const CHAMADOS_MOCK: Chamado[] = [
  {
    id: 'ped_caotico_123',
    nivel: 'CAOTICO',
    recompensa: 20,
    desculpa: '"Meu peixe morreu"',
    distancia: '400m',
    situacaoContexto: 'Date ruim',
    papelExigido: 'Vet. Emocional'
  },
  {
    id: 'ped_medio_456',
    nivel: 'MEDIO',
    recompensa: 12,
    desculpa: '"Planta em crise existencial"',
    distancia: '820m',
    situacaoContexto: 'Festa chata',
    papelExigido: 'Terapeuta botânico'
  },
  {
    id: 'ped_leve_789',
    nivel: 'LEVE',
    recompensa: 6,
    desculpa: '"Emergência em casa"',
    distancia: '1.2km',
    situacaoContexto: 'Reunião',
    papelExigido: 'Primo preocupado'
  }
];

export default function ChamadosFeedPage() {
  const router = useRouter();
  const [chamados, setChamados] = useState<Chamado[]>(CHAMADOS_MOCK);

  // NOTA: Tratar a alteração de status para ACEITO e salvar os dados do roteiro
  const handleAceitarMissao = (id: string) => {
    // Busca o chamado aceito para salvar o contexto do roteiro localmente na demo
    const chamadoAceito = chamados.find(c => c.id === id);
    if (chamadoAceito) {
      localStorage.setItem('id_missao_ativa', chamadoAceito.id);
      localStorage.setItem('titulo_missao_ativa', chamadoAceito.desculpa);
      localStorage.setItem('papel_missao_ativa', chamadoAceito.papelExigido);
      localStorage.setItem('nivel_missao_ativa', chamadoAceito.nivel);
    }

    // Avança para a Tela 09: Roteiro da Missão
    router.push('/alibi/roteiro');
  };

  // Remove o card da lista simulando recusa
  const handleRecusarMissao = (id: string) => {
    setChamados(prev => prev.filter(c => c.id !== id));
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-[#0B0C10] text-slate-100 select-none animate-fade-in">
      
      {/* Header com indicador de progresso 2 / 4 e status Online */}
      <header className="flex items-center justify-between w-full pt-2">
        <button 
          onClick={() => router.push('/alibi')} 
          className="text-gray-400 hover:text-white p-2 text-xl transition-colors"
        >
          ←
        </button>
        <span className="text-gray-400 font-bold tracking-wider text-sm font-sans">CHAMADOS</span>
        <span className="px-2 py-0.5 bg-emerald-950/50 border border-emerald-900/30 text-[#10B981] font-mono text-[10px] rounded-md font-bold uppercase tracking-wider animate-pulse">
          • Online
        </span>
      </header>

      {/* Título de densidade de pedidos */}
      <div className="w-full max-w-sm mx-auto mt-6 text-left">
        <p className="text-xs font-mono text-gray-500">
          {chamados.length} {chamados.length === 1 ? 'chamado próximo' : 'chamados próximos'}
        </p>
      </div>

      {/* Feed Vertical de Cards */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col gap-4 my-3 overflow-y-auto max-h-[68vh] pr-1">
        {chamados.length === 0 ? (
          <div className="text-center my-auto space-y-2 p-6 border border-dashed border-gray-900 rounded-2xl">
            <span className="text-2xl block">😴</span>
            <p className="text-sm font-bold text-gray-400">Nenhum desespero detectado.</p>
            <p className="text-xs text-gray-600">A humanidade está sabendo dizer &quot;não&quot; hoje.</p>
          </div>
        ) : (
          chamados.map((item) => (
            <div
              key={item.id}
              className={`bg-[#12131A] rounded-2xl p-4 border flex flex-col justify-between space-y-4 transition-all duration-300 ${
                item.nivel === 'CAOTICO' ? 'border-red-900/40 focus-within:border-[#FF3B5C]' :
                item.nivel === 'MEDIO' ? 'border-amber-900/40 focus-within:border-amber-500' :
                'border-emerald-900/40 focus-within:border-[#10B981]'
              }`}
            >
              {/* Topo do Card: Nível e Pontuação de Karma */}
              <div className="flex justify-between items-center">
                <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold tracking-wider uppercase ${
                  item.nivel === 'CAOTICO' ? 'bg-red-950/60 text-[#FF3B5C]' :
                  item.nivel === 'MEDIO' ? 'bg-amber-950/60 text-amber-400' :
                  'bg-emerald-950/60 text-[#10B981]'
                }`}>
                  {item.nivel === 'LEVE' ? '🟢 Leve' : item.nivel === 'MEDIO' ? '⚠️ Médio' : '🔴 Caótico'}
                </span>
                <div className="text-right">
                  <span className={`text-lg font-black font-mono ${
                    item.nivel === 'CAOTICO' ? 'text-[#FF3B5C]' :
                    item.nivel === 'MEDIO' ? 'text-amber-400' :
                    'text-[#10B981]'
                  }`}>
                    {item.recompensa}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider font-mono text-gray-600 block -mt-1">Karma</span>
                </div>
              </div>

              {/* Centro do Card: Desculpa em destaque e metadados */}
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-white tracking-tight leading-snug">
                  {item.desculpa}
                </h3>
                {/* Sublegendas com tags/ícones de metadados */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-gray-500">
                  <span className="flex items-center gap-1">↑ {item.distancia}</span>
                  <span>·</span>
                  <span>{item.situacaoContexto}</span>
                  <span>·</span>
                  <span className="text-gray-400 font-sans font-medium">{item.papelExigido}</span>
                </div>
              </div>

              {/* Base do Card: Botões Emparelhados */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => handleAceitarMissao(item.id)}
                  className={`py-2.5 rounded-xl font-bold text-xs text-white text-center transition-all active:scale-[0.97] cursor-pointer shadow-sm ${
                    item.nivel === 'CAOTICO' ? 'bg-[#FF3B5C] hover:bg-[#E02F4E]' :
                    item.nivel === 'MEDIO' ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' :
                    'bg-[#10B981] hover:bg-[#0E9F6E] text-slate-950'
                  }`}
                >
                  Aceitar missão
                </button>
                <button
                  onClick={() => handleRecusarMissao(item.id)}
                  className="py-2.5 bg-transparent border border-gray-900 hover:border-gray-800 text-gray-500 hover:text-gray-400 font-bold text-xs rounded-xl text-center transition-all active:scale-[0.97]"
                >
                  Recusar
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Rodapé decorativo de progresso fixo */}
      <div className="text-center pb-2">
        <span className="text-gray-700 font-mono text-xs">2 / 4</span>
      </div>

    </main>
  );
}