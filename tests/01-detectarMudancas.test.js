// -----------------------------------------------------------------------
// Teste simples, sem dependências, usando apenas `assert` nativo.
// Roda com: node tests/01-detectarMudancas.test.js
// -----------------------------------------------------------------------

const assert = require("node:assert");
const { detectarNovosEventos, chaveEvento } = require("../src/detectarMudancas");

console.log("Teste 01: detectarMudancas");

const historicoSalvo = [
  { dataHora: "2025-03-17T14:00", sequencia: 1, descricaoTramitacao: "Remetida à Câmara" },
  { dataHora: "2025-04-02T10:30", sequencia: 2, descricaoTramitacao: "Distribuída à Comissão Especial" },
];

// 1) Sem eventos novos: tramitações atuais idênticas ao histórico salvo.
const semNovidade = detectarNovosEventos(historicoSalvo, historicoSalvo);
assert.strictEqual(semNovidade.length, 0, "Não deveria haver eventos novos");

// 2) Um evento novo no fim da lista.
const comUmEventoNovo = [
  ...historicoSalvo,
  { dataHora: "2026-08-20T09:00", sequencia: 3, descricaoTramitacao: "Parecer do relator apresentado" },
];
const novos = detectarNovosEventos(comUmEventoNovo, historicoSalvo);
assert.strictEqual(novos.length, 1, "Deveria haver exatamente 1 evento novo");
assert.strictEqual(novos[0].descricaoTramitacao, "Parecer do relator apresentado");

// 3) chaveEvento deve combinar dataHora e sequencia (para não confundir
//    dois despachos publicados na mesma data).
const chave = chaveEvento({ dataHora: "2026-08-20T09:00", sequencia: 3 });
assert.strictEqual(chave, "2026-08-20T09:00__3");

// 4) Histórico vazio: todo evento atual conta como novo (mas gerarStatus.js
//    trata esse caso separadamente como "primeira execução", sem alertar).
const tudoNovo = detectarNovosEventos(comUmEventoNovo, []);
assert.strictEqual(tudoNovo.length, 3, "Com histórico vazio, todos os eventos são 'novos'");

console.log("✅ Teste 01 passou");
