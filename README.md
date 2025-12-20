## Meu contato:

e-mail: arthurtute01@gmail.com
linkedin: https://www.linkedin.com/in/arthur-martins-araujo-824b14192/

## 📋 Projeto Task Management System  

O **Task Management System** é uma aplicação full stack que permite aos usuários criarem e gerenciarem tarefas para organizar o dia a dia.    
Cada task possui **título**, **descrição** e **status**, podendo ser atualizada ou removida pelo próprio usuário.  

Para criar e gerenciar tarefas, o usuário precisa estar autenticado na aplicação, realizando **registro (register)** ou **login** previamente.  

---  

## 🚀 Principais tecnologias utilizadas  

- **TypeScript**  
- **Next.js**  
- **React**  
- **Tailwind **CSS****  
- **shadcn/ui** (padronização e reutilização de componentes)  
- **Prisma **ORM****  
- **MySQL**  
- **Docker & Docker Compose**  
- **Zod** (validação de dados)  
- **React Hook Form** (gerenciamento de formulários)  
- **Axios** (requisições **HTTP**)  
- **JWT** (autenticação)  
- **bcryptjs** (hash de senhas)  
- **Zustand** (state management)  
- **Vitest** (testes unitários e de integração)  
- **React Testing Library** (testes de componentes)  
- **ESLint & Prettier**  

---  

## ✅ Requisitos da aplicação  

- **Frontend:** Interface moderna, responsiva e performática com React e Next.js  
- **Backend:** **API** RESTful para autenticação e **CRUD** de tasks  
- **Banco de Dados:** MySQL com modelagem via Prisma  
- **Autenticação:** Login, registro e logout com **JWT**  
- **Segurança:** Hash de senhas com bcryptjs  
- **Testes:**    
    - Testes unitários de componentes React    
    - Testes automatizados da **API**  
- **Infraestrutura:** Uso de Docker para padronização do ambiente  
- **Documentação:** **README**.md e **API**.md completos  

---  

## 🛠️ Instalação e execução do projeto  

📥 **Clonando o repositório (PRIMEIRO STEP PRIMORDIAL):**  

```bash  
git clone https://github.com/Tute24/hubfy-task-management-system
```  

🐳 **Rodando o projeto completo via Docker Compose:**  

Certifique-se de ter o Docker e o Docker Compose instalados e em execução.  

 🔐 Configuração das variáveis de ambiente:  

Preencha no docker-compose.yml:  

Serviço MySQL:  

MYSQL_ROOT_PASSWORD  

MYSQL_DATABASE  

Serviço Next.js:  

DATABASE_URL  

SECRET_KEY  

As variáveis seguem o modelo descrito em .env.example.  

▶️ **Executando:**  

```bash
docker-compose up --build 
``` 
Quando estiver tudo pronto, abrir http://localhost:3000/ no browser e navegar pelo projeto
## 💻 Rodando o projeto com MySQL em Docker e Next.js localmente:  

Embora o projeto tenha sido pensado para rodar totalmente via Docker, também é possível executar o Next.js localmente. Considerando que as variáveis do serviço do mysql já foram configuradas no step anterior, e que o arquivo .env já foi criado baseado no .env.example, o passo-a-passo é esse: 

1️⃣ Instalar dependências  

```bash  
npm install  
```  
2️⃣ Comentar ou retirar o service do next no docker-compose.yml, e rodar somento o service do sql:

```bash  
docker-compose up --build  
```

⚠️ **ATENÇÃO**  
Ao rodar o Next.js sem Docker, é necessário substituir @db por @localhost na variável DATABASE_URL.

3️⃣ Executar migrations e gerar o Prisma Client 

```bash  
npx prisma migrate dev  
```

```bash  
npx prisma generate  
```  

4️⃣ Iniciar o Next.js em modo desenvolvimento  

```bash  
npm run dev  
```  

## 🔐 Variáveis de ambiente:  

As variáveis de ambiente devem seguir o padrão do arquivo .env.example.    

## 🧪 Como rodar os testes unitários:  

Mesmo que o projeto esteja rodando via Docker, os testes unitários do frontend devem ser executados localmente.  

▶️ Instalar dependências (caso ainda não tenha sido feito)

```bash  
npm install  
```  

▶️ Executar testes unitários  

```bash  
npm run test:unit  
```  

▶️ Executar testes de integração automatizados

Para executar os testes de integração, é necessário criar o .env.test de acordo com o .env.test.example, 
já que os testes irão rodar em uma db (efêmera) diferente da dev db. Após criação do .env.test, rodar:

```bash  
npm run test:integration 
``` 

## 🗂️ Estrutura de pastas do projeto:  

__tests__/          → Testes unitários e de integração  
.github/             → Pipeline de CI (GitHub Actions)  
.vscode/             → Configurações do Prisma v6  
prisma/              → Schema e migrations do banco  
src/  
 ├─ app/  
 │   ├─ api/          → **API** (auth e tasks) — documentada no **API**.md  
 │   ├─ portal/       → Área logada (dashboard e criação de tasks)  
 │   ├─ register/     → Página de cadastro  
 │   └─ page.tsx      → Página de login  
 ├─ components/       → Componentes React reutilizáveis  
 ├─ core/  
 │   ├─ errors/       → Erros customizados da **API**  
 │   ├─ lib/          → Inicialização do Prisma Client  
 │   └─ middleware/   → Middleware de autenticação  
 ├─ modules/          → Controllers, services e repositories (auth e tasks)  
 ├─ requests/         → Requests via Axios  
 ├─ types/            → Tipagens compartilhadas  
 ├─ utils/            → Funções utilitárias  
 ├─ zodSchemas/       → Schemas de validação  
 └─ zustand-stores/   → State management com Zustand  
database-sql/         → Schema **SQL** baseado no Prisma  
lib/                  → Utilitário de classes (cn / tailwind-merge)  

## 🧠 Decisões técnicas importantes  

Organização do backend por módulos de domínio (auth e tasks), com separação clara entre rotas, controllers, services e repositórios, aplicando princípios do **SOLID**, especialmente o de inversão de dependências. Essa abordagem desacopla regras de negócio da camada de persistência, facilitando testes, manutenção e escalabilidade do projeto.  

Utilização de Docker Compose para padronizar o ambiente e evitar problemas de inconsistência entre máquinas.  

Uso do Prisma **ORM** para modelagem do banco de dados, migrations e acesso aos dados.  

Validação de dados com Zod tanto na **API** quanto no frontend.  

Gerenciamento de formulários com React Hook Form integrado ao Zod.  

Padronização visual e produtividade com shadcn/ui.  

State management com Zustand, incluindo persistência em sessionStorage e tratamento de hidratação.  

Pipeline de CI com GitHub Actions, garantindo execução de testes e lint a cada alteração no código.  

Resolvi direcionar o usuário para o dashboard após seu registro, ao invés de redirecionar ele de volta pra página de login, pois acredito que assim o fluxo da aplicação fica mais fluido.

O id do usuário, ao invés de ser um número que auto incrementa, é um random uuid, pois acredito ser mais seguro.

## 🔮 Futuras melhorias  

Paginação no dashboard  

Tasks compartilhadas entre usuários  

**CRUD** completo de usuários  

Testes **E2E** com Playwright  

**Este projeto foi desenvolvido para fins de estudo e como case de processo seletivo.**  