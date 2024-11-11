## Descrição

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

<<<<<<< HEAD
## Tenha instalado o node verão 20.12 em sua máquina
=======
Para executar em modo de desenvolvimento:
>>>>>>> main

## Instale as dependências do projeto

```bash
$ yarn 
```

## Obs:
```text
Defina as variáveis ​​de ambiente presentes no arquivo .env.example. Set as variáveis do banco de dados de acordo com o arquivo docker-compose.
```

## Comandos para compilar e executar o projeto

```bash
# execute o container com o comando abaixo
$ docker compose up -d

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Excutar testes

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov

# test unique file
$ yarn run test:watch path/test
```

## Origanização do projeto
O projeto segue a arquitetura modular aplicando princípios SOLID. O projeto está organizado com as seguintes pastas:
 - src
    - models -- contém os modelos de passageiro, motorista e corrida. Neles encontramos:
      - dtos
      - entidades
      - serviços (onde são validadas as regras de negócio do projeto)
      - modulos (onde ocorre as injeções de dependência)
      - controller (local para expor os endpoints da API)
      - testes ( os testes estão entre essas pastas e arquivos )
      - Enumarators
      - validações personalizadas
    - alguns arquivos de auxílio no projeto
    - app.module -- arquivo principal que inicializa o projeto


## Informações importantes:
  - As migrations do projeto serão geradas de forma automática ao inicializar o projeto
  - Você pode acessar os endpoints da aplicação através do endereço localhost:{port}/api
  - Os endpoints do swagger só estaram disponíveis caso o projeto estiver com a variável de ambiente em desenvolvimento
  - O banco de dados escolhido foi o PostgresSQL
  - O projeto foi desenvolvido em Node usando o framework NestJs
  - Foram feitos alguns endpoints de listagem de passageiros e motoristas para auxiliar na busca de dados(Como esses endpoints não são pedidos no teste, não foram feitos testes para eles.)




### Desafio Técnico: API de Corridas de Táxi

## Objetivo

 - Desenvolver uma API para gerenciar corridas de táxi, onde passageiros podem solicitar corridas e motoristas podem iniciar e finalizar essas corridas. A API deve ser implementada em PHP ou Node.js, e o armazenamento de dados deve ser feito em um banco de dados relacional, como MySQL ou PostgreSQL.

 - Requisitos Gerais
    - Banco de Dados Relacional: Use um banco relacional como MySQL ou PostgreSQL. 
    - Linguagem: PHP ou Node.js (É opcional o uso de framework) 
    - Modelo de Dados Básico:
    - Tabelas para Passageiros, Motoristas, e Corridas com as seguintes informações mínimas: 
    - Passageiro: id, nome, telefone 
    - Motorista: id, nome, carro, telefone 
    - Corrida: id, passageiro_id, motorista_id, status, origem, destino, data_hora_solicitacao, data_hora_inicio, data_hora_fim, valor 
 - Sinta-se à vontade para adicionar outros campos, caso considere necessário. 

 - Critérios de Avaliação
    - Funcionalidade: A API atende a todos os requisitos? 
    - Estrutura e Organização do Código: A solução é clara e fácil de entender? 
    - Qualidade do Código: Uso correto de boas práticas e organização. 
    - Persistência e Modelagem de Dados: O esquema do banco de dados atende aos requisitos da API? 
    - Documentação: Um README com instruções de configuração e uso.
    - Utilização de Docker: Configuração de containers Docker para facilitar a instalação, configuração e execução da aplicação em ambientes consistentes. 


## Observação:
 - A API funcionará recebendo os dados no formato JSON e vai devolver o output no formato JSON. 
 - Diferencial: Implementação de testes automatizados para validação das funcionalidades. 



## Funcionalidades e Endpoints
 - Funcionalidades:
    - Cadastro de Passageiros e Motoristas. 
    - Solicitação de uma Corrida (inicialmente com o status "Aguardando Motorista"). 
    - Alteração do status de uma corrida para "Em Andamento" e "Finalizada". 

 - Endpoints:
    - POST /passengers: Cadastrar um passageiro.
    - POST /drivers: Cadastrar um motorista. 
    - POST /rides: Criar uma nova corrida. 
    - PATCH /rides: Atualizar o status de uma corrida. 
    - GET /rides: Lista uma corrida por id. 

 - Regras Básicas:
    - Uma corrida só pode ser criada se o passageiro existir. 
    - Alterar o status para “Em andamento” somente se estiver em  "Aguardando Motorista" e sendo obrigatório informar o id do motorista. 
    - Alterar o status para "Finalizada" somente se estiver em "Em Andamento". 

- Exemplo de Fluxo:
    - Um passageiro é cadastrado. 
    - Um motorista é cadastrado. 
    - O passageiro solicita uma corrida.
    - O motorista inicia e finaliza a corrida. 
