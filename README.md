# Assets Manager

Aplicação Full Stack para gerenciamento de ativos corporativos (computadores, monitores, periféricos, etc.), desenvolvida com **React, Spring Boot e PostgreSQL**, totalmente containerizada com **Docker Compose** para execução plug and play.

---

# Tecnologias utilizadas

## Frontend

- React
- TypeScript
- Vite
- Material UI
- React Hook Form
- Zod
- Axios
- Vitest

## Backend

- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL

## Infraestrutura

- Docker
- Docker Compose

---

# Funcionalidades

- Listagem de ativos
- Cadastro de ativos
- Edição de ativos
- Exclusão de ativos
- Validação de formulário
- Integração com API REST
- Testes automatizados

---

# Como executar o projeto

## Pré-requisito

- Docker instalado

---

## Executar aplicação

Na raiz do projeto, execute:

```bash
docker compose up --build
```

---

# Acessos

Frontend
http://localhost:5173

Backend
http://localhost:8080/assets

---

# Endpoints da API

| Método | Endpoint     | Descrição       |
| ------ | ------------ | --------------- |
| GET    | /assets      | Listar ativos   |
| POST   | /assets      | Criar ativo     |
| PUT    | /assets/{id} | Atualizar ativo |
| DELETE | /assets/{id} | Remover ativo   |

---

# Testes

Frontend:

```bash
npm run test
```

Backend:

```bash
./mvnw test
```

---

# Execução Plug and Play

Todo o ambiente é iniciado com Docker Compose, sem necessidade de instalar dependências manualmente.

---

# Estrutura do projeto

```
assets-manager/
│
├── assets-manager-frontend/
├── assets-manager-backend/
└── docker-compose.yml
```

---

# Autor

Matheus
https://github.com/Matheus1221
