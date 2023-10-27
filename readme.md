# 🖥️ Projeto 1 - Tasks API

<hr />

Neste projeto, foi realizado a criação de uma API REST totalmente do zero utilzando apenas o modulo interno de http do node. O desenvolvimento
em questão foi muito interessante pois evidenciou varias tecnicas que geralmente microframeworks http deste ecosistema usa: como o express ou fastify.

Exemplos:
=> `Em casos que precisamos fazer leitura de parametros que vem do corpo da requisição (request body), a informação em
si vem em pedaços e utilizando o conceito de streams, uma vez que tudo no node é uma stream,no nosso caso foi feito a partir de streams de leitura,
a criação de um buffer e a alimentação desse buffer concatenando pedações de informações que chegavam, a fim de obter uma informação completa. O desenvolvimento desta 
logica foi aplicada atravez de um middleware`

=> Em casos onde enviamos parametros pela rota, como query params e route params, foi feito uma regex que capturava a partir da declaração da rota <code>route/:id</code>
dados que eram enviados do cliente para manualmente poder inserir dentro do objeto request do modulo http.

Tambem para conhecer o modulo file-system do node, foi criado uma base de dados que persistia dados em memoria (statefull) para arquivos .json, onde o sistema era
responsavel por escrever no arquivo .json tudo o que estava salvo na memoria.

## Requisitos funcionais

[ x ] Deve ser possivel a criação de uma task
[ x ] Deve ser possivel listar todas as tasks
[ x ] Deve ser possivel atualizar uma task pelo seu id
[ x ] Deve ser possivel atualizar o status da task
[ x ] Deve ser possivel remover uma task
[ x ] Deve ser possivel importar via stream, varias tasks de um arquivo csv

## Regras de negocio

[ x ] Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.
[ x ] Também deve ser possível realizar uma busca, filtrando as tasks pelo `title` e `description`
[ x ] Para atualizar uma task, deve consultar se o id realmente é de algum recurso salvo no banco
[ x ] Para atualizar o status de uma task, deve alem de validar se o recurso existe, colocar a data que foi completado a task

## Requisitos não funcionais:

[ x ] Utilizar apenas o modulo interno `node:http` para configurar um servidor REST
[ x ] Criar persistir os dados em um banco de dados baseado em um arquivo JSON

## Rotas:

- `POST - /tasks`
  Rota para criação de uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
- `GET - /tasks`
  Rota para listagem de todas as tasks salvas no banco de dados.
- `PUT - /tasks/:id`
  Rota para atualizar uma task pelo `id`.
- `DELETE - /tasks/:id`
  Rota para remover uma task pelo `id`.
- `PATCH - /tasks/:id/complete`
  Rota para marcar a task como completa ou não. Isso significa que se a task estiver concluída, deve voltar ao seu estado “normal”.
