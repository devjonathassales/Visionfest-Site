import React from "react";

export default function Roadmap() {
  return (
    <div id="roadmap">
      <h2 className="text-3xl md:text-4xl font-[Montserrat] font-extrabold text-center">
        Roadmap Visionfest
      </h2>
      <p className="mt-3 text-center text-muted max-w-3xl mx-auto">
        Evolução contínua com entregas incrementais. Começamos pelo essencial e
        ampliamos com base em feedback real.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl card shadow-soft">
          <div className="font-[Montserrat] font-bold">Agora (MVP)</div>
          <ul className="mt-3 text-muted space-y-2 list-disc list-inside">
            <li>Cadastro, contratos, agenda, estoque e financeiro interno</li>
            <li>Relatórios essenciais e indicadores-chave</li>
            <li>Atendimento e suporte próximos</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl card shadow-soft">
          <div className="font-[Montserrat] font-bold">
            Próximos (Incrementos)
          </div>
          <ul className="mt-3 text-muted space-y-2 list-disc list-inside">
            <li>Pagamentos recebidos diretamente na plataforma</li>
            <li>App Planner do Cliente (ver, pagar e contratar)</li>
            <li>Relatórios avançados e personalizáveis</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl card shadow-soft">
          <div className="font-[Montserrat] font-bold">Futuro</div>
          <ul className="mt-3 text-muted space-y-2 list-disc list-inside">
            <li>App mobile nativo (Android/iOS)</li>
            <li>Integrações adicionais de comunicação e CRM</li>
            <li>Automação de marketing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
