TODOs

[ x ] criar um middleware de stream para poder receber json
[ x ] criar arquivo de rotas separado para podemos identificar a rota
[ x ] criar a regex para conseguir separar os parametros informados na route param

[ x ] criar classe para ser o banco de dados

[ x ] Deve ser possivel a criação de uma task
[ x ] deve ser possivel listar as tasks
[ x ] deve ser possivel atualizar uma task pelo seu id
[ x ] deve ser possivel atualizar o status da task
[ x ] deve ser possivel remover uma task
[] deve ser possivel importar via stream, varias tasks via csv

[ x ] Validar se as propriedades title e description das rotas POST e PUT estão presentes no body da requisição.
[ x ] Nas rotas que recebem o /:id, além de validar se o id existe no banco de dados, retornar a requisição com uma mensagem informando que o registro não existe.

Rotas:

- `POST - /tasks`
  Deve ser possível criar uma task no banco de dados, enviando os campos `title` e `description` por meio do `body` da requisição.
  Ao criar uma task, os campos: `id`, `created_at`, `updated_at` e `completed_at` devem ser preenchidos automaticamente, conforme a orientação das propriedades acima.
- `GET - /tasks`
  Deve ser possível listar todas as tasks salvas no banco de dados.
  Também deve ser possível realizar uma busca, filtrando as tasks pelo `title` e `description`
- `PUT - /tasks/:id`
  Deve ser possível atualizar uma task pelo `id`.
  No `body` da requisição, deve receber somente o `title` e/ou `description` para serem atualizados.
  Se for enviado somente o `title`, significa que o `description` não pode ser atualizado e vice-versa.
  Antes de realizar a atualização, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.
- `DELETE - /tasks/:id`
  Deve ser possível remover uma task pelo `id`.
  Antes de realizar a remoção, deve ser feito uma validação se o `id` pertence a uma task salva no banco de dados.
- `PATCH - /tasks/:id/complete`
