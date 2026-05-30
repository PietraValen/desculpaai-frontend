'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SelecaoPerfil() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<'desesperado' | 'alibi' | null>(null);

  const handleContinue = () => {
    if (!perfil) return;

    // NOTA 02: Sem login real. userId como parâmetro simples no backend (atalho autorizado).
    // Salvamos uma string fictícia no localStorage simulando o userId para as próximas telas.
    const fakeUserId = `user_${perfil}_${Math.random().toString(36).substring(2, 7)}`;
    localStorage.setItem('userId', fakeUserId);

    if (perfil === 'desesperado') {
      router.push('/desesperado/situacao');
    } else {
      router.push('/alibi/chamados');
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-[#0B0C10] text-slate-100 select-none animate-fade-in">
      
      {/* Header com botão de voltar nativo */}
      <header className="flex items-center justify-between w-full pt-2">
        <button 
          onClick={() => router.back()} 
          className="text-gray-400 hover:text-white p-2 transition-colors"
        >
          ←
        </button>
        <span className="text-gray-600 font-mono text-xs">1 / 1</span>
      </header>

      {/* Conteúdo Principal */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center space-y-8">
        <div className="space-y-2">
          <span className="px-2 py-0.5 bg-red-950/50 border border-red-900/40 text-[#FF3B5C] font-mono text-[10px] rounded uppercase tracking-wider font-bold">
            Início
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white mt-2">
            Você é quem?
          </h2>
          <p className="text-gray-400 text-sm">
            Sua honestidade aqui é opcional.
          </p>
        </div>

        {/* Grid de Opções de Perfis */}
        <div className="flex flex-col gap-4">
          
          {/* Card: Desesperado (Foco Vermelho) */}
          <button
            onClick={() => setPerfil('desesperado')}
            className={`flex flex-col p-5 rounded-2xl text-left border transition-all duration-200 active:scale-[0.99] ${
              perfil === 'desesperado'
                ? 'bg-[#1A1115] border-[#FF3B5C]'
                : 'bg-[#12131A] border-gray-900 hover:border-gray-800'
            }`}
          >
            <span className="text-3xl mb-3">😰</span>
            <h3 className="text-xl font-bold text-white tracking-tight">Desesperado</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Estou preso em uma situação indesejada e preciso de um álibi agora.
            </p>
          </button>

          {/* Card: Álibi (Foco Verde) */}
          <button
            onClick={() => setPerfil('alibi')}
            className={`flex flex-col p-5 rounded-2xl text-left border transition-all duration-200 active:scale-[0.99] ${
              perfil === 'alibi'
                ? 'bg-[#0E1714] border-[#10B981]'
                : 'bg-[#12131A] border-gray-900 hover:border-gray-800'
            }`}
          >
            <span className="text-3xl mb-3">🎭</span>
            <h3 className="text-xl font-bold text-white tracking-tight">Álibi</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Estou disponível para comprometer minha reputação por estranhos.
            </p>
          </button>

        </div>
      </div>

      {/* Botão de Ação Inferior */}
      <div className="w-full max-w-sm mx-auto pt-4 pb-2">
        <button
          onClick={handleContinue}
          disabled={!perfil}
          className={`w-full py-4 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 ${
            perfil 
              ? 'bg-[#FF3B5C] hover:bg-[#E02F4E] active:scale-[0.98] cursor-pointer' 
              : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuar →
        </button>
      </div>

    </main>
  );
}