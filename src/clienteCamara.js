// -----------------------------------------------------------------------
// clienteCamara.js
// -----------------------------------------------------------------------
// Cliente fino para a API pública de Dados Abertos da Câmara dos
// Deputados (https://dadosabertos.camara.leg.br/). Usa o `fetch` nativo
// do Node 20+ — sem dependências externas de propósito, pra manter o
// projeto auditável e fácil de rodar em qualquer runner de CI.
//
// Documentação oficial da API: https://dadosabertos.camara.leg.br/swagger/api.html
// -----------------------------------------------------------------------

const { API_BASE } = require("./config");

/**
 * Busca os dados cadastrais e a situação atual de uma proposição.
 * Retorna o objeto `dados` da resposta, que inclui `statusProposicao`
 * (situação, órgão e despacho da tramitação mais recente).
 */
async function buscarProposicao(idProposicao) {
  const url = `${API_BASE}/proposicoes/${idProposicao}`;
  const resposta = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "radar-pl-2338 (projeto aberto de acompanhamento legislativo)",
    },
  });

  if (!resposta.ok) {
    throw new Error(
      `Falha ao buscar a proposição ${idProposicao}: HTTP ${resposta.status} (${url})`
    );
  }

  const corpo = await resposta.json();
  return corpo.dados;
}

/**
 * Busca o histórico completo de tramitações de uma proposição. A API não
 * garante ordem cronológica nesse endpoint específico (e rejeita alguns
 * parâmetros de ordenação que funcionam em outras rotas), então ordenamos
 * por `dataHora` aqui mesmo, no cliente.
 */
async function buscarTramitacoes(idProposicao) {
  const url = `${API_BASE}/proposicoes/${idProposicao}/tramitacoes`;
  const resposta = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "radar-pl-2338 (projeto aberto de acompanhamento legislativo)",
    },
  });

  if (!resposta.ok) {
    throw new Error(
      `Falha ao buscar tramitações da proposição ${idProposicao}: HTTP ${resposta.status} (${url})`
    );
  }

  const corpo = await resposta.json();
  const tramitacoes = corpo.dados || [];

  return [...tramitacoes].sort((a, b) => (a.dataHora > b.dataHora ? 1 : -1));
}

module.exports = { buscarProposicao, buscarTramitacoes };