// -----------------------------------------------------------------------
// gerarStatus.js
// -----------------------------------------------------------------------
// Ponto de entrada do radar. Faz três coisas, nessa ordem:
//   1. busca a proposição e o histórico de tramitações na API da Câmara;
//   2. compara com o que já estava salvo em disco pra achar o que é novo;
//   3. regrava data/historico-tramitacao.json e STATUS.md.
//
// Pensado pra rodar tanto localmente (`npm run atualizar`) quanto via
// GitHub Actions, com o resultado sendo commitado de volta no repo.
//
// Precisa de acesso à internet (chama dadosabertos.camara.leg.br).
// -----------------------------------------------------------------------

const fs = require("node:fs");
const path = require("node:path");

const { buscarProposicao, buscarTramitacoes } = require("./clienteCamara");
const { detectarNovosEventos } = require("./detectarMudancas");
const { montarStatusMd } = require("./montarStatusMd");
const {
  ID_PROPOSICAO_PL_2338,
  CAMINHO_HISTORICO,
  CAMINHO_STATUS_MD,
} = require("./config");

async function main() {
  console.log(`Buscando status da proposição ${ID_PROPOSICAO_PL_2338}...`);

  const proposicao = await buscarProposicao(ID_PROPOSICAO_PL_2338);
  const tramitacoes = await buscarTramitacoes(ID_PROPOSICAO_PL_2338);

  const historicoPath = path.join(process.cwd(), CAMINHO_HISTORICO);
  const historicoAnterior = fs.existsSync(historicoPath)
    ? JSON.parse(fs.readFileSync(historicoPath, "utf-8"))
    : [];

  const ehPrimeiraExecucao = historicoAnterior.length === 0;
  const novosEventos = ehPrimeiraExecucao
    ? []
    : detectarNovosEventos(tramitacoes, historicoAnterior);

  fs.mkdirSync(path.dirname(historicoPath), { recursive: true });
  fs.writeFileSync(historicoPath, JSON.stringify(tramitacoes, null, 2) + "\n", "utf-8");

  const statusMd = montarStatusMd({
    proposicao,
    tramitacoes,
    novosEventos,
    ehPrimeiraExecucao,
    geradoEm: new Date().toISOString(),
  });
  fs.writeFileSync(path.join(process.cwd(), CAMINHO_STATUS_MD), statusMd, "utf-8");

  if (ehPrimeiraExecucao) {
    console.log(`Linha de base salva com ${tramitacoes.length} evento(s) de tramitação.`);
  } else if (novosEventos.length > 0) {
    console.log(`${novosEventos.length} nova(s) movimentação(ões) detectada(s).`);
  } else {
    console.log("Nenhuma movimentação nova desde a última checagem.");
  }
}

main().catch((erro) => {
  console.error("Erro ao gerar status do radar:", erro.message);
  process.exit(1);
});
