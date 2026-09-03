// -----------------------------------------------------------------------
// detectarMudancas.js
// -----------------------------------------------------------------------
// Lógica pura (sem I/O) pra comparar o histórico de tramitações já salvo
// com o que a API retornou agora, e apontar só o que é novo. Separado em
// módulo próprio de propósito, pra dar pra testar sem precisar de rede
// nem mockar o fetch.
// -----------------------------------------------------------------------

/**
 * Cada evento de tramitação é identificado de forma única pela combinação
 * de data/hora + número de sequência — é assim que a própria API da
 * Câmara evita duplicidade quando o mesmo despacho é reprocessado.
 */
function chaveEvento(evento) {
  return `${evento.dataHora}__${evento.sequencia}`;
}

/**
 * Retorna apenas os eventos de `tramitacoesAtuais` que ainda não estavam
 * em `historicoSalvo`, na ordem em que vieram da API (cronológica).
 */
function detectarNovosEventos(tramitacoesAtuais, historicoSalvo) {
  const chavesConhecidas = new Set(historicoSalvo.map(chaveEvento));
  return tramitacoesAtuais.filter((evento) => !chavesConhecidas.has(chaveEvento(evento)));
}

module.exports = { detectarNovosEventos, chaveEvento };
