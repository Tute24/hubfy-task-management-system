## Documentação dos Endpoints e Middleware da aplicação:

📌 **POST /api/auth/register**

Cria um novo usuário no sistema e retorna os dados básicos do usuário juntamente com um token JWT para autenticação.

🔗 **URL**

POST /api/auth/register

📝 **Descrição**

Este endpoint permite o cadastro de um novo usuário.
Ele valida os dados enviados, verifica se o email já está cadastrado, cria o usuário no banco de dados com a senha criptografada e retorna um token JWT válido.

📥 **Headers:**
- Content-Type: application/json

📦 **Body:**

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "senha12345",
  "confirmPassword": "senha12345"
}

🔎 **Regras de validação:**

name: string com no mínimo 2 caracteres

email: deve ser um email válido

password: mínimo de 8 caracteres

confirmPassword: deve ser igual ao campo password

O body não aceita campos extras (validação com strict() do Zod)

✅ **Resposta de Sucesso (201):**

{
  "message": "User succesfully registered!",
  "user": {
    "id": "clx123abc456",
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

❌ **Respostas de Erro:**

🔴 409 — Usuário já existente

Retornado quando já existe um usuário cadastrado com o mesmo email.

{
  "message": "There's already an user with this e-mail on the database!"
}

🔴 500 — Erro interno (JWT ou configuração)

Retornado quando há um erro interno na aplicação, como ausência da chave secreta do JWT.

{
  "message": "Secret Key is missing from .env!"
}

🔴 500 — Erro interno genérico
{
  "message": "Internal server error"
}

-----------------------------//-----------------------------

📌 **POST /api/auth/login**

Autentica um usuário já cadastrado e retorna um token JWT para acesso às rotas protegidas da aplicação.

🔗 **URL:**

POST /api/auth/login

📝 **Descrição:**

Este endpoint realiza a autenticação de um usuário a partir do email e da senha. Ele valida os dados enviados, verifica se o usuário existe, compara a senha informada com a senha criptografada armazenada no banco e, em caso de sucesso, retorna um token JWT válido.

📥 **Headers:**

Content-Type: application/json

📦 **Body:**

{
  "email": "john.doe@example.com",
  "password": "senha12345",
}


🔎 **Regras de validação:**

email: deve ser um email válido

password: string obrigatória com, no mínimo, 8 caracteres

O body não aceita campos extras (validação com schema Zod)

✅ **Resposta de Sucesso (200):**

{
  "message": "User succesfully registered!",
  "user": {
    "id": "clx123abc456",
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

❌ **Respostas de Erro:**

🔴 400 — Erro de configuração (JWT)

Retornado quando a chave secreta do JWT não está configurada corretamente no ambiente.

{ message: "Secret Key is missing from .env!" }

🔴 401 — Senha incorreta

Retornado quando a senha informada não corresponde à senha do usuário.

{ message: "Incorrect password. Try again." }

🔴 404 — Usuário não encontrado

Retornado quando não existe um usuário cadastrado com o email informado.

{ message: "There is not an user with this e-mail in the database!" }

🔴 500 — Erro interno genérico

{ message: "Internal server error" }

-----------------------------//-----------------------------

**POST /api/auth/logout**

Realiza o logout do usuário autenticado.

🔗 **URL**

POST /api/auth/logout

📝 **Descrição:**

Este endpoint realiza o logout do usuário atualmente autenticado.
Ele valida o token JWT enviado no header Authorization e, caso o token seja válido, retorna uma mensagem de sucesso.

⚠️ Observação: como a autenticação é feita via JWT stateless, este endpoint não invalida o token no servidor, apenas valida a autenticação. O logout efetivo deve ser feito no cliente, removendo o token armazenado na store auth do zustand (sessionStorage).

📥 **Headers:**

Content-Type: application/json

Authorization: Bearer <token>

📦 **Body:**

Este endpoint não recebe body.

🔎 **Regras de autenticação:**

O header Authorization é obrigatório

O token deve ser um JWT válido

O payload do token contém o id e o email

Tokens inválidos, expirados ou ausentes resultam em erro de autenticação

✅ **Resposta de Sucesso (200):**

{
  "message": "User successfully logged out!"
}


❌ **Respostas de Erro:**

🔴 400 — Erro de configuração (JWT)

Retornado quando a chave secreta do JWT não está configurada corretamente no ambiente.

{
  "message": "Secret Key is missing from .env!"
}


🔴 401 — Usuário não autenticado

Retornado quando o token não é enviado, é inválido, expirado ou não contém as informações necessárias.

{
  "message": "User is not authenticated."
}


🔴 500 — Erro interno genérico

{
  "message": "Internal server error"
}

-----------------------------//-----------------------------

📌 **POST /api/auth/token-check**  

Verifica se o token JWT do usuário ainda é válido.  

🔗 **URL:**  

POST /api/auth/token-check  

📝 **Descrição:**  

Este endpoint é utilizado para validar a sessão do usuário no frontend.  
Ele verifica se o token JWT enviado no header Authorization é válido, não expirou e contém as informações necessárias.  
Caso o token seja válido, a API retorna sucesso sem payload adicional.  

📥 **Headers:**  

Authorization: Bearer <token>  

📦 **Body:**  

Este endpoint não recebe body.  

🔎 Regras de autenticação:  

O header Authorization é obrigatório  

O token deve ser um JWT válido  

O payload do token contém o id e o email

Tokens inválidos, expirados ou ausentes resultam em erro  

✅ **Resposta de Sucesso (200):**  

{  
  *status*: 200  
}  


❌ **Respostas de Erro:**  

🔴 400 — Erro de configuração (JWT)  

Retornado quando a chave secreta do JWT não está configurada corretamente no ambiente.  

{  
  *message*: *Secret Key is missing from .env!*  
}  


🔴 401 — Usuário não autenticado  

Retornado quando o token JWT não é enviado, é inválido ou expirado.  

{  
  *message*: *User is not authenticated*  
}  


🔴 500 — Erro interno genérico  

{  
  *message*: *Internal server error*  
}  

-----------------------------//-----------------------------

**POST /api/tasks**

Cria uma ou mais tarefas associadas ao usuário autenticado.  

🔗 **URL**  

POST /api/tasks  

📝 **Descrição:** 

Este endpoint permite a criação de uma ou várias tarefas de uma só vez.  
Ele valida o token JWT do usuário autenticado, valida os dados enviados no body e cria as tarefas associadas ao usuário no banco de dados.  

📥 **Headers:**  

Content-Type: application/json  

Authorization: Bearer <token>  

📦 **Body:**  

{  
    "*"tasks"*": [  
    {  
    "*"title"*": "*"Title 1"*",  
    "*"description"*": "*"Description 2*  
    },  
    {  
    *title*: *Title 2*,  
    *description*: *Description 2*  
    }  
    ]  
}  


🔎 **Regras de validação:**  

tasks: array obrigatório  

Cada item do array deve conter:  

title: string com no mínimo 2 caracteres  

description: string opcional

O payload do token contém o id e o email  

O body não aceita campos extras (validação com strict() do Zod)  

✅ **Resposta de Sucesso (201):**  

{  
  *message*: *New tasks created: 2*  
}  


❌ **Respostas de Erro:**  

🔴 401 — Usuário não autenticado  

Retornado quando o token JWT não é enviado, é inválido ou expirou.  

{  
  *message*: *User is not authenticated.*  
}  


🔴 400 — Erro de configuração (JWT)  

Retornado quando a chave secreta do JWT não está configurada corretamente no ambiente.  

{  
  *message*: *Secret Key is missing from .env!*  
}  


🔴 500 — Erro interno genérico  

{  
  *message*: *Internal server error*  
}  

-----------------------------//-----------------------------

**GET /api/tasks**  

Retorna todas as tarefas associadas ao usuário autenticado.  

🔗 **URL:**  

GET /api/tasks  

📝 **Descrição:**  

Este endpoint retorna todas as tarefas pertencentes ao usuário autenticado.  
Ele valida o token JWT enviado no header Authorization e busca no banco de dados todas as tarefas associadas ao usuário.  

📥 **Headers:**  

Authorization: Bearer <token>  

📦 **Body:**  

Este endpoint não recebe body.  

🔎 Regras de autenticação:  

O header Authorization é obrigatório  

O token deve ser um JWT válido  

O payload do token contém o id e o email 

Tokens inválidos, expirados ou ausentes resultam em erro de autenticação  

✅ **Resposta de Sucesso (200):**  

{  
    *message*: *Tasks successfully fetched*,  
    *tasks*: [  
    {  
    *id*: 1,  
    *title*: *Title 1*,  
    *description*: *Description 1*,  
    *status*: *PENDING*,  
    *created_at*: "2025-12-18T22:15:00.000Z",  
    *updated_at*: "2025-12-18T22:15:00.000Z",  
    *user_id*: *clx123abc456*  
    },  
    {  
    *id*: 2,  
    *title*: *Title 2*,  
    *description*: null,  
    *status*: *COMPLETED*,  
    *created_at*: "2025-12-18T22:15:00.000Z",  
    *updated_at*: "2025-12-18T22:15:00.000Z",  
    *user_id*: *clx123abc456*  
    }  
    ]  
}  


❌ **Respostas de Erro:**  

🔴 401 — Usuário não autenticado  

Retornado quando o token JWT não é enviado, é inválido ou expirado.  

{  
  *message*: *User is not authenticated.*  
}  


🔴 400 — Erro de configuração (JWT)  

Retornado quando a chave secreta do JWT não está configurada corretamente no ambiente.  

{  
  *message*: *Secret Key is missing from .env!*  
}  


🔴 500 — Erro interno genérico  

{  
  *message*: *Internal server error*  
}

-----------------------------//-----------------------------

📌 **DELETE /api/tasks/{id}**  

Remove uma tarefa específica pertencente ao usuário autenticado.  

🔗 **URL:**  

DELETE /api/tasks/{id}  

📝 **Descrição:**  

Este endpoint permite a exclusão de uma tarefa específica.  
Ele valida o token JWT do usuário autenticado, verifica se a tarefa existe e se ela pertence ao usuário que realizou a requisição. Caso todas as validações sejam atendidas, a tarefa é removida do banco de dados.  

📥 **Headers:**  

Authorization: Bearer <token>  

🧩 **Path Parameters:**  

id: identificador da tarefa a ser removida  

📦 **Body:**  

Este endpoint não recebe body.  

🔎 Regras de autenticação e autorização:  

O header Authorization é obrigatório  

O token deve ser um JWT válido  

A tarefa deve existir  

A tarefa deve pertencer ao usuário autenticado  

Usuários não podem excluir tarefas de outros usuários  

✅ **Resposta de Sucesso (200):**  

{  
  *message*: *Task successfully deleted.*  
}  


❌ **Respostas de Erro:**  

🔴 400 — Parâmetro ausente ou erro de configuração  

Retornado quando o parâmetro id não é informado ou quando a chave secreta do JWT não está configurada.  

{  
  *message*: *Missing required parameter.*  
}  


ou  

{  
  *message*: *Secret Key is missing from .env!*  
}  


🔴 401 — Usuário não autenticado  

Retornado quando o token JWT não é enviado, é inválido ou expirado.  

{  
  *message*: *User is not authenticated.*  
}  


🔴 403 — Ação não permitida  

Retornado quando o usuário autenticado tenta excluir uma tarefa que não lhe pertence.  

{  
  *message*: *Action not allowed for this user.*  
}  


🔴 404 — Tarefa não encontrada  

Retornado quando a tarefa com o id informado não existe no banco de dados.  

{  
  *message*: *Couldn't find this task on the database.*  
}  


🔴 500 — Erro interno genérico  

{  
  *message*: *Internal server error*  
}  

-----------------------------//-----------------------------

📌 **PUT /api/tasks/{id}**  

Atualiza os dados de uma tarefa específica pertencente ao usuário autenticado.  

🔗 **URL:**  

PUT /api/tasks/{id}  

📝 **Descrição:**  

Este endpoint permite a atualização parcial de uma tarefa existente.  
Ele valida o token JWT do usuário autenticado, verifica se a tarefa existe e se pertence ao usuário, valida os dados enviados no body e atualiza apenas os campos informados.  

📥 **Headers:**  

Content-Type: application/json  

Authorization: Bearer <token>  

🧩 **Path Parameters:**  

id: identificador da tarefa a ser atualizada  

📦 **Body:**  

{  
    *title*: *Updated title*,  
    *description*: *Updated description*,  
    *status*: *IN_PROGRESS*  
}  


Todos os campos do body são opcionais, mas pelo menos um deve ser informado.  

🔎 **Regras de validação:**  

title: string opcional com no mínimo 2 caracteres  

description: string opcional  

status: enum com valores permitidos:  

PENDING  

IN_PROGRESS  

COMPLETED  

O body aceita apenas os campos definidos no schema de atualização.  

🔎 **Regras de autenticação e autorização:**  

O header Authorization é obrigatório  

O token deve ser um JWT válido  

A tarefa deve existir  

A tarefa deve pertencer ao usuário autenticado  

✅ **Resposta de Sucesso (200):**  

{  
    *message*: *Task successfully updated.*,  
    *task*: {  
    *id*: 1,  
    *title*: *Updated title*,  
    *description*: *Updated description*,  
    *status*: *IN_PROGRESS*,  
    *created_at*: "2025-12-18T22:15:00.000Z",  
    *updated_at*: "2025-12-18T22:15:00.000Z",  
    *user_id*: *clx123abc456*  
    }  
}  


❌ **Respostas de Erro:**  

🔴 400 — Dados inválidos ou erro de configuração  

Retornado quando:  

o parâmetro id não é informado  

nenhum campo válido é enviado no body  

a chave secreta do JWT não está configurada  

{  
  *message*: *Task Id is missing from the request.*
}  

ou  

{  
  *message*: *At least one property to update is required.*  
}  

ou  

{  
  *message*: *Secret Key is missing from .env!*  
}  


🔴 401 — Usuário não autenticado  

{  
  *message*: *User is not authenticated.*  
}  


🔴 403 — Ação não permitida  

Retornado quando o usuário tenta atualizar uma tarefa que não lhe pertence.  

{  
  *message*: *Action not allowed for this user.*  
}  


🔴 404 — Tarefa não encontrada  

{  
  *message*: *Couldn't find this task on the database.*  
}  


🔴 500 — Erro interno genérico  

{  
  *message*: *Internal server error*  
}  

-----------------------------//-----------------------------

**Sobre o middleware de autenticação (authCheck):**

O middleware authCheck é responsável por validar a autenticação do usuário através de um token JWT enviado no header da requisição.  

📝 **Descrição:**  

Este middleware verifica se a requisição contém um token JWT válido no header Authorization.  
Ele valida a assinatura do token, verifica a existência das informações essenciais do usuário no payload e garante que apenas usuários autenticados tenham acesso às rotas protegidas da aplicação.  

📥 **Header Esperado:**  
Authorization: Bearer <token>  

🔎 Processo de Validação  

O authCheck executa as seguintes etapas:  

Verifica se o header Authorization foi enviado  

Extrai o token JWT do header  

Valida a existência da variável de ambiente SECRET_KEY  

Verifica a assinatura e validade do token  

Garante que o payload contenha as propriedades obrigatórias:  

id  

email  

Retorna o payload do token em caso de sucesso  

✅ **Retorno em Caso de Sucesso:** 
{  
    id: string;  
    email: string;  
}  


O payload retornado pode ser utilizado pelas rotas para identificar o usuário autenticado.  

❌ **Erros Possíveis:**  

🔴 UserNotAuthenticatedError  
Lançado quando:  

o header Authorization não é enviado  

o token é inválido ou expirado  

o payload do token não contém as informações necessárias  

🔴 MissingSecretKeyError  
Lançado quando a variável de ambiente SECRET_KEY não está configurada.  

💡 **Observação Importante:**  

Erros relacionados a token inválido ou expirado são convertidos em erros de domínio (UserNotAuthenticatedError).  
Isso garante que as rotas que utilizam o middleware não precisem lidar diretamente com erros da biblioteca JWT, mantendo o código mais limpo e desacoplado.  