'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SUGESTOES_RAPIDAS = [
  { id: 'peixe', texto: 'Meu peixe morreu', icone: '🐟' },
  { id: 'planta', texto: 'Planta em crise', icone: '🌱' },
  { id: 'astral', texto: 'Emergência astral', icone: '⭐' },
  { id: 'travesseiro', texto: 'Travesseiro chorou', icone: '🛌' },
];

const TIPOS_ALIBI = [
  { id: 'vet_emocional', label: 'Vet. Emocional', icone: '👤' },
  { id: 'advogado', label: 'Advogado', icone: '💼' },
  { id: 'primo', label: 'Primo', icone: '🤠' },
  { id: 'astrologo', label: 'Astrólogo', icone: '🔮' },
];

export default function CriarDesculpaPage() {
  const router = useRouter();
  
  // Estados do Formulário
  const [desculpa, setDesculpa] = useState('');
  const [nivelAbsurdo, setNivelAbsurdo] = useState('medio'); // leve, medio, caotico
  const [tipoAlibi, setTipoAlibi] = useState('vet_emocional');
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Injeta o texto da sugestão rápida direto no textarea
  const handleSelectSugestao = (texto: string) => {
    setDesculpa(texto);
    setErro('');
  };

  const handleActionAlibis = async () => {
    // Validação básica (bloquear envio sem desculpa preenchida)
    if (!desculpa.trim()) {
      setErro('Você precisa digitar ou escolher uma desculpa para fugir.');
      return;
    }

    setIsLoading(true);
    setErro('');

    try {
      const situacaoSalva = localStorage.getItem('desesperado_situacao') || 'desconhecida';
      
      const payload = {
        situacao: situacaoSalva,
        desculpa: desculpa.trim(),
        nivelAbsurdo,
        tipoAlibi,
      };

      console.log('Disparando POST /pedidos com:', payload);

      // ─── INTEGRACAO COM O ENDPOINT POST /PEDIDOS ───
      // Descomente e ajuste a chamada quando o backend estiver pronto:
      // const response = await axios.post('/pedidos', payload);
      // const { id } = response.data;
      
      // Mock de ID retornado para manter a demo funcional:
      const mockId = `ped_${Math.random().toString(36).substring(2, 9)}`;
      
      // Manipular e salvar ID/Status no escopo global/local
      localStorage.setItem('current_pedido_id', mockId);
      localStorage.setItem('current_pedido_status', 'CRIADO');

      // Redireciona o usuário para a tela de loading/status após o sucesso
      router.push('/desesperado/status');
    } catch (err) {
      setErro('Ocorreu um erro ao acionar os álibis. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-[#0B0C10] text-slate-100 select-none animate-fade-in">
      
      {/* Header com indicador de progresso 2 / 5 */}
      <header className="flex items-center justify-between w-full pt-2">
        <button 
          onClick={() => router.back()} 
          className="text-gray-400 hover:text-white p-2 text-xl transition-colors"
        >
          ←
        </button>
        <span className="text-gray-400 font-bold tracking-wider text-sm">DESCULPA</span>
        <span className="text-gray-600 font-mono text-xs">2 / 5</span>
      </header>

      {/* Formulário Principal */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center my-4 space-y-6 overflow-y-auto max-h-[75vh] pr-1">
        
        {/* Campo: Sua Desculpa */}
        <div className="space-y-2">
          <label className="text-[10px] tracking-widest uppercase font-mono text-gray-500 block font-bold">
            Sua Desculpa
          </label>
          <textarea
            value={desculpa}
            onChange={(e) => {
              setDesculpa(e.target.value);
              if (e.target.value) setErro('');
            }}
            placeholder="Digite seu pretexto de fuga ou selecione abaixo..."
            rows={3}
            className="w-full p-4 bg-[#12131A] border border-gray-900 rounded-2xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#FF3B5C] focus:ring-1 focus:ring-[#FF3B5C] transition-all resize-none font-sans"
          />
          {erro && <p className="text-[#FF3B5C] text-xs font-mono font-medium">{erro}</p>}
        </div>

        {/* Sugestões Rápidas (Chips) */}
        <div className="space-y-2">
          <span className="text-[10px] tracking-widest uppercase font-mono text-gray-500 block font-bold">
            Sugestões Rápidas
          </span>
          <div className="flex flex-wrap gap-2">
            {SUGESTOES_RAPIDAS.map((sug) => (
              <button
                key={sug.id}
                type="button"
                onClick={() => handleSelectSugestao(sug.texto)}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#12131A] border border-gray-900 hover:border-gray-700 rounded-full text-xs text-gray-300 font-medium transition-colors active:scale-95"
              >
                <span>{sug.icone}</span>
                {sug.texto}
              </button>
            ))}
          </div>
        </div>

        {/* Nível de Absurdo */}
        <div className="space-y-3">
          <span className="text-[10px] tracking-widest uppercase font-mono text-gray-500 block font-bold">
            Nível de Absurdo
          </span>
          {/* Seletor Segmentado Simulando o Slider */}
          <div className="grid grid-cols-3 gap-2 bg-[#12131A] p-1 rounded-xl border border-gray-900">
            {(['leve', 'medio', 'caotico'] as const).map((nivel) => (
              <button
                key={nivel}
                type="button"
                onClick={() => setNivelAbsurdo(nivel)}
                className={`py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all text-center ${
                  nivelAbsurdo === nivel
                    ? nivel === 'leve' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : nivel === 'medio' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'bg-red-500/20 text-[#FF3B5C] border border-[#FF3B5C]/30'
                    : 'text-gray-500 hover:text-gray-400'
                }`}
              >
                {nivel === 'leve' ? '🟡 Leve' : nivel === 'medio' ? '🟠 Médio' : '🔴 Caótico'}
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de Álibi */}
        <div className="space-y-2">
          <span className="text-[10px] tracking-widest uppercase font-mono text-gray-500 block font-bold">
            Tipo de Álibi
          </span>
          <div className="grid grid-cols-2 gap-2">
            {TIPOS_ALIBI.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setTipoAlibi(type.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  tipoAlibi === type.id
                    ? 'bg-[#1A1115] border-[#FF3B5C] text-white'
                    : 'bg-[#12131A] border-gray-900 text-gray-400 hover:border-gray-800'
                }`}
              >
                <span>{type.icone}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Botão de Envio (Acionar Álibis) */}
      <div className="w-full max-w-sm mx-auto pt-4 pb-2">
        <button
          onClick={handleActionAlibis}
          disabled={isLoading}
          className="w-full py-4 bg-[#FF3B5C] hover:bg-[#E02F4E] disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-base active:scale-[0.98] shadow-lg shadow-[#FF3B5C]/10 cursor-pointer"
        >
          {isLoading ? 'Invocando mentirosos...' : 'Acionar álibis →'}
        </button>
      </div>

    </main>
  );
}