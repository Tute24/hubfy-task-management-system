## Documentação dos Endpoints da aplicação:

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

Autentica um usuário já cadastrado e retorna um token **JWT** para acesso às rotas protegidas da aplicação.

🔗 **URL**

POST /api/auth/login

📝 **Descrição**

Este endpoint realiza a autenticação de um usuário a partir do email e da senha. Ele valida os dados enviados, verifica se o usuário existe, compara a senha informada com a senha criptografada armazenada no banco e, em caso de sucesso, retorna um token **JWT** válido.

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