'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Interface para tipar as situações do protótipo
interface Situacao {
  id: string;
  titulo: string;
  icone: string;
  isWide?: boolean; // Para o card longo da base
}

const SITUACOES_MOCK: Situacao[] = [
  { id: 'date_ruim', titulo: 'Date que virou entrevista', icone: '💔' },
  { id: 'almoco_familia', titulo: 'Almoço de família', icone: '🍲' },
  { id: 'reuniao_terapia', titulo: 'Reunião que virou terapia', icone: '🧘‍♂️' },
  { id: 'festa_ruim', titulo: 'Festa decepcionante', icone: '🎉' },
  { 
    id: 'role_arrependimento', 
    titulo: 'Rolê que eu mesmo marquei e me arrependi profundamente', 
    icone: '🕳️',
    isWide: true 
  },
];

export default function SituacaoPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedId) return;

    // Persistência local da situação selecionada para usar no POST posterior
    localStorage.setItem('desesperado_situacao', selectedId);
    
    // Navega para a Tela 03 (Criador de Desculpa)
    router.push('/desesperado/criar');
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-[#0B0C10] text-slate-100 select-none animate-fade-in">
      
      {/* Header com indicador de progresso 1 / 5 */}
      <header className="flex items-center justify-between w-full pt-2">
        <button 
          onClick={() => router.back()} 
          className="text-gray-400 hover:text-white p-2 text-xl transition-colors"
        >
          ←
        </button>
        <span className="text-gray-400 font-bold tracking-wider text-sm">SITUAÇÃO</span>
        <span className="text-gray-600 font-mono text-xs">1 / 5</span>
      </header>

      {/* Conteúdo Central */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center my-4 space-y-6">
        
        {/* Identificador de contexto e Título Principal */}
        <div className="space-y-2">
          <span className="px-2 py-0.5 bg-red-950/40 border border-red-900/50 text-[#FF3B5C] font-mono text-[10px] rounded uppercase tracking-wider font-bold">
            Desesperado
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white mt-2 leading-tight">
            Onde você está preso?
          </h2>
        </div>

        {/* Grid de Cards de Situações Constrangedoras */}
        <div className="grid grid-cols-2 gap-3">
          {/* CORRIGIDO: Adicionado a letra 'A' que faltava em SITUACOES_MOCK */}
          {SITUACOES_MOCK.map((sit) => (
            <button
              key={sit.id}
              onClick={() => setSelectedId(sit.id)}
              className={`flex flex-col justify-between p-4 rounded-2xl text-left border transition-all duration-200 active:scale-[0.98] min-h-[110px] ${
                sit.isWide ? 'col-span-2 min-h-[90px]' : ''
              } ${
                selectedId === sit.id
                  ? 'bg-[#1A1115] border-[#FF3B5C] shadow-lg shadow-[#FF3B5C]/5'
                  : 'bg-[#12131A] border-gray-900 hover:border-gray-800'
              }`}
            >
              <span className="text-2xl">{sit.icone}</span>
              <h3 className="text-sm font-bold text-white tracking-tight leading-snug mt-2">
                {sit.titulo}
              </h3>
            </button>
          ))}
        </div>

      </div>

      {/* Botão de Navegação Inferior */}
      <div className="w-full max-w-sm mx-auto pt-4 pb-2">
        <button
          onClick={handleNext}
          disabled={!selectedId}
          className={`w-full py-4 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-base ${
            selectedId 
              ? 'bg-[#FF3B5C] hover:bg-[#E02F4E] active:scale-[0.98] cursor-pointer shadow-lg shadow-[#FF3B5C]/10' 
              : 'bg-gray-800/40 text-gray-500 cursor-not-allowed'
          }`}
        >
          Próximo →
        </button>
      </div>

    </main>
  );
}