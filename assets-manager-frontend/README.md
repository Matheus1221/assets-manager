# Assets Manager

Sistema full stack para gerenciamento de ativos (assets) de uma empresa, como computadores, monitores e periféricos.

Este projeto foi desenvolvido utilizando **React, TypeScript, Spring Boot e PostgreSQL**, com execução completa via **Docker Compose**, permitindo rodar todo o ambiente de forma simples e reproduzível.

---

# Funcionalidades

- Criar novo ativo
- Listar ativos em um grid
- Editar ativos existentes
- Remover ativos
- Filtrar ativos por categoria
- Filtrar ativos por status
- Validação de dados no formulário
- Feedback visual para o usuário
- Integração completa com API REST
- Execução completa via Docker

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
- Dayjs

## Backend

- Java 17
- Spring Boot
- Spring Data JPA

## Banco de dados

- PostgreSQL

## DevOps

- Docker
- Docker Compose

---

# Arquitetura

O projeto está dividido em dois serviços:

assets-manager
│
├── assets-manager-frontend
│
├── assets-manager-backend
│
└── docker-compose.yml

O frontend consome os dados através da API REST exposta pelo backend.

---

# Como executar o projeto

## Pré-requisitos

Ter instalado:

- Docker
- Docker Compose

---

## Passo a passo

Clone o repositório:

```bash
git clone https://github.com/Matheus1221/assets-manager.git
Entre na pasta:

cd assets-manager
Execute o Docker Compose:

docker compose up --build
Acesso à aplicação
Frontend:

http://localhost:5173
Backend:

http://localhost:8080
API REST
Base URL:

http://localhost:8080/assets
Endpoints disponíveis:

Método	Endpoint	Descrição
GET	/assets	Listar todos os ativos
POST	/assets	Criar novo ativo
PUT	/assets/{id}	Atualizar ativo
DELETE	/assets/{id}	Remover ativo
Estrutura de um ativo
Exemplo:

{
  "name": "Notebook Dell",
  "serialNumber": "ABC123",
  "category": "COMPUTER",
  "status": "AVAILABLE",
  "acquisitionDate": "2024-01-01"
}
Regras de validação
Campo	Regra
name	obrigatório
serialNumber	obrigatório
category	obrigatório
status	obrigatório
acquisitionDate	opcional
Decisões técnicas
React Hook Form + Zod
Utilizados para garantir validação eficiente, tipagem segura e melhor performance no formulário.

Material UI
Utilizado para construção da interface e do grid de listagem, proporcionando melhor experiência do usuário.

Spring Boot
Utilizado no backend para construção da API REST e gerenciamento da lógica de negócio.

PostgreSQL
Utilizado como banco de dados relacional, executado via Docker.

Docker Compose
Utilizado para subir frontend, backend e banco de dados com um único comando, garantindo ambiente reproduzível.

Testes manuais recomendados
Criar um novo ativo

Editar um ativo existente

Remover um ativo

Testar validação de campos obrigatórios

Testar filtros por categoria e status

Reiniciar os containers e validar funcionamento

Execução via Docker
Todo o ambiente é executado via Docker Compose.

Nenhuma instalação adicional é necessária além do Docker.

Melhorias futuras
Testes automatizados

Paginação

Autenticação de usuários

Deploy em ambiente cloud

Autor
Matheus

GitHub:

https://github.com/Matheus1221/assets-manager
```
