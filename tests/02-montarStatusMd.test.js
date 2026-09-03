// -----------------------------------------------------------------------
// Teste simples, sem dependências, usando apenas `assert` nativo.
// Roda com: node tests/02-montarStatusMd.test.js
// -----------------------------------------------------------------------

const assert = require("node:assert");
const { montarStatusMd } = require("../src/montarStatusMd");

console.log("Teste 02: montarStatusMd");

const proposicaoFake = {
  id: 2487262,
  statusProposicao: {
    descricaoSituacao: "Aguardando Parecer do Relator na Comissão Especial",
    siglaOrgao: "CEIA",
    dataHora: "2026-08-20T09:00",
    despacho: "Às Comissões",
  },
};

const tramitacoesFake = [
  { dataHora: "2025-03-17T14:00", sequencia: 1, descricaoTramitacao: "Remetida à Câmara" },
  { dataHora: "2025-04-02T10:30", sequencia: 2, descricaoTramitacao: "Distribuída à Comissão Especial" },
];

// 1) Primeira execução: deve avisar que é linha de base, sem seção de "novidade".
const mdPrimeiraExecucao = montarStatusMd({
  proposicao: proposicaoFake,
  tramitacoes: tramitacoesFake,
  novosEventos: [],
  ehPrimeiraExecucao: true,
  geradoEm: "2026-08-31T00:00:00.000Z",
});
assert.ok(mdPrimeiraExecucao.includes("Primeira execução"));
assert.ok(mdPrimeiraExecucao.includes("Aguardando Parecer do Relator"));
assert.ok(!mdPrimeiraExecucao.includes("Movimentações novas"));

// 2) Execuções seguintes com evento novo: deve destacar a seção de novidade.
const mdComNovidade = montarStatusMd({
  proposicao: proposicaoFake,
  tramitacoes: tramitacoesFake,
  novosEventos: [
    { dataHora: "2026-08-25T11:00", sequencia: 3, descricaoTramitacao: "Parecer apresentado" },
  ],
  ehPrimeiraExecucao: false,
  geradoEm: "2026-08-31T00:00:00.000Z",
});
assert.ok(mdComNovidade.includes("Movimentações novas"));
assert.ok(mdComNovidade.includes("Parecer apresentado"));

// 3) Execuções sem novidade: deve mostrar a seção "Sem novidade".
const mdSemNovidade = montarStatusMd({
  proposicao: proposicaoFake,
  tramitacoes: tramitacoesFake,
  novosEventos: [],
  ehPrimeiraExecucao: false,
  geradoEm: "2026-08-31T00:00:00.000Z",
});
assert.ok(mdSemNovidade.includes("Sem novidade"));

// 4) Deve sempre citar a fonte oficial.
assert.ok(mdSemNovidade.includes("dadosabertos.camara.leg.br"));

console.log("✅ Teste 02 passou");
