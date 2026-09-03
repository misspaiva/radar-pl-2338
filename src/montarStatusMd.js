// -----------------------------------------------------------------------
// montarStatusMd.js
// -----------------------------------------------------------------------
// Também isolado do I/O de propósito: recebe os dados já buscados e
// devolve uma string Markdown. Isso permite testar a formatação sem
// precisar de rede nem de sistema de arquivos.
// -----------------------------------------------------------------------

function formatarLinhaEvento(evento) {
  const descricao =
    evento.descricaoTramitacao || evento.despacho || "sem descrição disponível";
  return `- **${evento.dataHora}** — ${descricao}`;
}

function montarStatusMd({ proposicao, tramitacoes, novosEventos, ehPrimeiraExecucao, geradoEm }) {
  const situacao = proposicao.statusProposicao || {};
  const ultimasTramitacoes = tramitacoes.slice(-10).reverse();

  const linhas = [];

  linhas.push("# Radar PL 2338/2023 — Marco Legal da IA no Brasil");
  linhas.push("");
  linhas.push(
    `> Gerado automaticamente em ${geradoEm} a partir da API de Dados Abertos da Câmara dos Deputados. Não é aconselhamento jurídico.`
  );
  linhas.push("");

  linhas.push("## Situação atual");
  linhas.push("");
  linhas.push(`- **Situação:** ${situacao.descricaoSituacao || "não informado"}`);
  linhas.push(
    `- **Órgão responsável:** ${situacao.siglaOrgao || "não informado"}`
  );
  linhas.push(`- **Última movimentação:** ${situacao.dataHora || "não informado"}`);
  linhas.push(`- **Despacho:** ${situacao.despacho || "não informado"}`);
  linhas.push("");

  if (ehPrimeiraExecucao) {
    linhas.push("## Primeira execução");
    linhas.push("");
    linhas.push(
      "Esta é a primeira vez que o radar roda — o histórico completo foi salvo como linha de base. " +
        "A partir da próxima execução, só as movimentações novas aparecem destacadas aqui."
    );
    linhas.push("");
  } else if (novosEventos.length > 0) {
    linhas.push("## 🔔 Movimentações novas desde a última checagem");
    linhas.push("");
    for (const evento of novosEventos) {
      linhas.push(formatarLinhaEvento(evento));
    }
    linhas.push("");
  } else {
    linhas.push("## Sem novidade");
    linhas.push("");
    linhas.push("Nenhuma movimentação nova desde a última checagem.");
    linhas.push("");
  }

  linhas.push("## Últimas movimentações (até 10)");
  linhas.push("");
  if (ultimasTramitacoes.length === 0) {
    linhas.push("Nenhuma tramitação retornada pela API até o momento.");
  } else {
    for (const evento of ultimasTramitacoes) {
      linhas.push(formatarLinhaEvento(evento));
    }
  }
  linhas.push("");

  linhas.push("---");
  linhas.push("");
  linhas.push(
    `Fonte: [Dados Abertos da Câmara dos Deputados](https://dadosabertos.camara.leg.br/) — ` +
      `proposição consultada via \`/api/v2/proposicoes/${proposicao.id}\`. ` +
      "Este projeto só republica dados públicos oficiais; para decisões de compliance, consulte um profissional."
  );
  linhas.push("");

  return linhas.join("\n");
}

module.exports = { montarStatusMd, formatarLinhaEvento };
