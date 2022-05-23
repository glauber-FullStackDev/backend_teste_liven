# Liven - Projeto de avaliação técnica Backend

Olá, o projeto foi desenvolvido baseado no manual que pode ser visualizado <a href="https://www.notion.so/Liven-Projeto-de-avalia-o-t-cnica-Backend-d4449a9534e74b05ac9fcd2cec6024c9">aqui</a>.

# Sobre

Tentarei passar aqui uma visão básica dos recursos utilizados dentro do projeto para que possa guiar vocês bo entendimento
do projeto.

# Padronização dos commits

Utilizei alguns recursos de software para tornar os commits padronizados. &nbsp;

* ## Commitlint &nbsp;
O commitlint já ajuda a evitar que façamos commits fora do padrão. No caso deste projeto utilizei o padrão desenvolvido e mantido pela equipe do Angular.

* ## Commitzen
O commitzen traz uma ferramenta de linha de comando que guia o usuário paso a passo na montagem do commit, evitando erros no padrão.

![Texto alternativo opcional se a imagem não carregar](https://64.media.tumblr.com/97541f52cc5ff52f8845922a356403e4/d2059cfe6c940cea-76/s540x810/906524bb50515db3ebf199ccebc3339555ea7988.png)
    
# Suite de Testes automatizados

Utilizei o Jest como ferramenta para escrita dos testes automatizados do projeto. Foi escrito testes unitários para funções internas e de integração para testes da API.

# Base de dados e Quey Builder

Utilizei como banco de dados o MySQL MariaDB com engine InnoDB. Para o trabalho junto com node, utilizei o KNEX como Query Builder.

# Arquitetura

Utilizei uma arquitetura baseada no MVC para dividir as responsabilidades do projeto. Nos models estão presentes a interação do node com o BD, nos controllers ficaram as regras de negócio 
e processamento dos dados e nos Routes dividimos as rotas e os handlers em arquivos separados para uma melhor organização.

# Documentação

Como foi solicitado no manual, a documentação foi desenvolvida com o Swagger.

