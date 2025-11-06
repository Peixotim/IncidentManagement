# 🚔 API de Gerenciamento de Ocorrências (AGO)

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-E0234E?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Licença](https://img.shields.io/badge/license-MIT-blue.svg)

Este é um projeto de estudo para praticar e aprofundar conceitos do **Nest.js**. A aplicação simula o backend de um sistema de gerenciamento de ocorrências policiais (AGO), onde o foco principal não é a regra de negócio "policial", mas sim a implementação de um sistema de **autorização complexa** e **fluxo de trabalho**.

O sistema lida com diferentes níveis de permissão (Patentes/Ranks) e posse de recursos (quem é o oficial designado para o caso), explorando ao máximo os mecanismos de **Guards** e **Pipes** do Nest.js.

> ⚠️ **Este é um projeto de estudo e está em constante desenvolvimento.**

---

## 🎯 Principais Conceitos Praticados

O objetivo deste projeto é ser um playground para as seguintes features do Nest.js:

* **Autenticação e Autorização:** Login com JWT (`AuthModule` + `Passport.js`).
* **Guards (Controle de Acesso):** Implementação de `RolesGuard` (baseado no `rank` do oficial) e `OwnershipGuard` (só o oficial designado pode editar).
* **Pipes (Validação):** Uso do `ValidationPipe` global e `ParseUUIDPipe` em parâmetros de rota.
* **TypeORM (ORM):** Definição de entidades e relações complexas (One-to-Many, Many-to-Many).
* **Interceptors (Transformação):** Padronização de todas as respostas da API (ex: `{"statusCode": 200, "data": ...}`).
* **Cache (Performance):** Uso do `CacheModule` para otimizar rotas de consulta (ex: estatísticas).
* **Módulos (Organização):** Estruturação do projeto em módulos coesos (`UserModule`, `IncidentModule`, `AuthModule`, etc.).

## 🛠️ Tecnologias Utilizadas

* **Framework:** [Nest.js](https://nestjs.com/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **ORM:** [TypeORM](https://typeorm.io/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (ou outro de sua preferência)
* **Autenticação:** [Passport.js](https://www.passportjs.org/) (com `passport-jwt`)
* **Validação:** `class-validator` e `class-transformer`
* **Containerização:** [Docker](https://www.docker.com/) (Opcional)

---

## 🏁 Como Rodar o Projeto

### 1. Pré-requisitos

* [Node.js](https://nodejs.org/en/) (v18 ou superior)
* [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)
* Uma instância de Banco de Dados (ex: PostgreSQL) rodando.

### 2. Configuração do Ambiente

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  Instale as dependências:
    ```bash
    yarn install
    ```

3.  Crie um arquivo `.env` na raiz do projeto. Você pode copiar o `.env.example`:
    ```bash
    cp .env.example .env
    ```

4.  Preencha o arquivo `.env` com as suas variáveis de ambiente:

    ```ini
    # Configuração do Banco de Dados (TypeORM)
    DB_TYPE=postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha
    DB_DATABASE=policia_db

    # Segredo para o JWT
    JWT_SECRET=seu_segredo_super_secreto
    ```

### 3. Rodando a Aplicação

1.  Execute as migrações do TypeORM (se houver):
    ```bash
    yarn typeorm:run
    ```

2.  Inicie o servidor em modo de desenvolvimento:
    ```bash
    yarn start:dev
    ```

A API estará disponível em `http://localhost:3000`.

---

## 🐳 Rodando com Docker (Alternativa)

Se você tiver o Docker e o Docker Compose instalados, pode subir o ambiente de forma isolada:

1.  Configure o arquivo `.env` (o `DB_HOST` deve ser o nome do serviço do docker, ex: `database`).
2.  Execute o comando:
    ```bash
    docker-compose up -d
    ```

---

## API (Endpoints Principais)

Abaixo estão algumas das rotas principais e as regras de negócio associadas:

| Método | Rota | Descrição | Regras de Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Login do oficial (usuário). | Pública |
| `POST` | `/users` | Cria um novo oficial. | `CAPTAIN` |
| `POST` | `/reports` | Registra um novo B.O. | Autenticado (Qualquer rank) |
| `GET` | `/reports/:id` | Vê um B.O. específico. | `SERGEANT+` ou `AssignedOfficer` |
| `PATCH`| `/reports/:id` | Atualiza um B.O. | Apenas `AssignedOfficer` |
| `PATCH`| `/reports/:id/assign` | Designa um B.O. para um oficial. | `SERGEANT+` |

---

## 🚀 Próximos Passos (Roadmap)

Este projeto é um trabalho em progresso. Próximos passos incluem:

* [ ] Implementar testes unitários e e2e (Jest).
* [ ] Adicionar upload de arquivos (para a entidade `Evidence`).
* [ ] Substituir `console.log` por um `LoggerService` customizado do Nest.
* [ ] Criar um fluxo de "soft delete" (exclusão lógica) para os B.O.s.