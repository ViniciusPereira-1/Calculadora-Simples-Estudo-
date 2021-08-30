README.TXT

Linguagens: HTML/CSS JavaScript (ES6+)
IDE: ATOM

Uma calculadora simples construída em JavaScript conectado à HTML/CSS.
Permite operação básicas (soma, subtração, divisão e multiplicação, porcentagem),
além de permitir a memorização de um número e recuperação do número atual, assim como a
recuperação do ultimo resultado.

VERSÃO 1.0:

- Todas as funções de cálculo estão implementadas e funcionais.

Em andamento:
- Melhoramento do frontend (CSS/HTML).
- Finalizar a calculadora de Gorjetas.
- Formatar o valor para resultados muito grandes.

Possíveis Updates:
- Operações mais complexas (Requer refactoring?).
- Modulação das operações (Requer API RequireJS para permitir o funcionamento.).

______________________________________________________________________________________

FAQ

a) Por quê as variáveis estão em inglês?

Seguindo recomendação de boas práticas, o código é escrito em inglês para permitir
a legibilidade e compreensão para o maior número de pessoas possíveis.

b) Por quê os números são adicionados como String?

Permite a concatenação dos números sem a realização de eventuais cálculos sem in-
tenção. Como a calculadora opera pela estrutura NUMERO ATUAL e NUMERO ANTERIOR,
ambos podem ser facilmente convertidos para Float

c) Algum código foi utilizado como base?

O tutorial de base utilizado foi: <https://www.section.io/engineering-education/building-a-calculator-a-javascript-project-for-beginners/>.
