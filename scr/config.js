// -----------------------------------------------------------------------
// config.js
// -----------------------------------------------------------------------
// Configuração central do radar. O ID abaixo é o identificador interno
// que a Câmara dos Deputados usa pra PL 2338/2023 (Marco Legal da IA) na
// API de Dados Abertos — confirmado batendo a ementa retornada pela API
// ("dispõe sobre o desenvolvimento, o fomento e o uso ético e responsável
// da inteligência artificial...") com o texto oficial do projeto.
//
// Se algum dia a Câmara reindexar a proposição (raro, mas acontece em
// apensações), esse é o único lugar que precisa mudar.
// -----------------------------------------------------------------------

module.exports = {
  ID_PROPOSICAO_PL_2338: 2487262,
  API_BASE: "https://dadosabertos.camara.leg.br/api/v2",
  CAMINHO_HISTORICO: "data/historico-tramitacao.json",
  CAMINHO_STATUS_MD: "STATUS.md",
};
