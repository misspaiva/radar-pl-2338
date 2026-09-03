# Radar PL 2338/2023 — Marco Legal da IA no Brasil

> Este arquivo é **sobrescrito automaticamente** pelo workflow `atualizar-radar.yml`
> assim que ele rodar pela primeira vez (manualmente ou no próximo agendamento).
> O conteúdo abaixo é uma checagem **manual**, feita em 31/08/2026, só para o
> repositório não nascer vazio — não vem da API, por isso não seguimos aqui o
> formato automático do restante deste documento.

## Situação em 31/08/2026 (checagem manual, não automática)

Fontes consultadas nesta data — **conflitantes entre si**, o que é parte do motivo
de este radar existir:

- O [portal da Câmara dos Deputados](https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262)
  mostrava a proposição como **"Aguardando Parecer do(a) Relator(a) na Comissão
  Especial"**.
- Diversas matérias de imprensa especializada davam a votação em plenário como
  marcada para **27/05/2026**, após relatório final previsto para 19/05/2026,
  mas sem confirmação clara, nas mesmas fontes, de que a votação de fato ocorreu.
- O projeto foi aprovado pelo **Senado Federal em 10/12/2024** e está na Câmara
  dos Deputados desde março de 2025, aguardando os trabalhos da Comissão
  Especial sobre Inteligência Artificial (PL 2338/23).

**[VERIFICAR: status atualizado]** — é exatamente essa checagem que o radar
automatiza a partir de agora.

## Como este arquivo passa a funcionar

A partir da primeira execução de `npm run atualizar` (local ou via GitHub
Actions), este arquivo passa a ser gerado inteiramente a partir da API de
Dados Abertos da Câmara, no formato:

- **Situação atual** — situação, órgão responsável, data da última
  movimentação e despacho, direto da API.
- **Movimentações novas desde a última checagem** — só aparece quando há
  algo novo desde a execução anterior.
- **Últimas movimentações (até 10)** — histórico recente, pra dar contexto
  mesmo sem novidade.

---

Fonte: [Dados Abertos da Câmara dos Deputados](https://dadosabertos.camara.leg.br/).
Este projeto só republica dados públicos oficiais; para decisões de
compliance, consulte um profissional.
