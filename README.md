# Assets Manager

Aplicação fullstack para gerenciamento de ativos empresariais (assets), permitindo cadastro, edição, listagem e remoção de ativos.

---

# 📌 Sobre o projeto

Este projeto foi desenvolvido como desafio técnico com foco em:

* CRUD completo de ativos
* Validação de dados no frontend
* Integração frontend + backend
* Organização de código e boas práticas
* Uso de Docker para facilitar execução

---

# 🚀 Tecnologias utilizadas

## Frontend

* React
* TypeScript
* React Hook Form
* Zod (validação)
* MUI (Material UI)
* Dayjs

## Backend

* Java 17
* Spring Boot
* Spring Data JPA

## Banco de dados

* PostgreSQL

## DevOps

* Docker
* Docker Compose

---

# 📂 Estrutura do projeto

```
assets-manager/
│
├── assets-manager-frontend/
├── assets-manager-backend/
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Funcionalidades

## ✅ Cadastro de ativos

* Nome
* Número de série
* Categoria
* Status
* Data de aquisição

## ✅ Listagem

* Exibição em grid (DataGrid)

## ✅ Edição

* Preenchimento automático do formulário
* Atualização do registro

## ✅ Remoção

* Exclusão de ativos

## ✅ Validação

* Campos obrigatórios
* Validação com Zod

## ✅ Feedback visual

* Snackbar de sucesso/erro

---

# 🧠 Regras de negócio

* Nome é obrigatório
* Serial number é obrigatório
* Categoria deve ser válida
* Status deve ser válido
* Data pode ser opcional

---

# 🐳 Rodando com Docker

## Pré-requisitos

* Docker
* Docker Compose

## Passos

Na raiz do projeto:

```bash
docker-compose up --build -d
```

A aplicação ficará disponível em:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:8080](http://localhost:8080)

---

# 🔄 Atualizando o projeto

Sempre que fizer alterações no código:

```bash
docker-compose up --build
```

Se houver problema de cache:

```bash
docker-compose build --no-cache
```

---

# 🧪 Testes manuais recomendados

## Cadastro

* Criar ativo com dados válidos
* Testar campos obrigatórios

## Edição

* Editar todos os campos
* Verificar se formulário preenche corretamente

## Exclusão

* Remover ativo e validar atualização da lista

## Validação

* Enviar formulário vazio
* Testar valores inválidos

## UX

* Verificar mensagens de sucesso/erro

---

# ⚠️ Pontos de atenção

* Garantir que o backend esteja rodando antes do frontend
* Verificar CORS no backend
* Garantir que o banco esteja conectado corretamente

---

# 📌 Melhorias futuras

* Autenticação de usuários
* Paginação no grid
* Filtros e busca
* Upload de arquivos
* Testes automatizados
* Deploy em cloud (AWS, Vercel, etc)
* Tema escuro

---

# 💡 Diferenciais implementados

* Validação com Zod separada do código
* Formulário reutilizável para criação e edição
* Feedback visual com Snackbar
* Integração completa frontend/backend
* Dockerização da aplicação

---

# 👨‍💻 Autor

Desenvolvido por Matheus

---

# 📄 Licença

Este projeto é apenas para fins de avaliação técnica.
