
cd infra
docker compose up -d --build
docker compose logs backend
docker compose down -v


docker compose ps
docker exec -it infra-db-1 psql -U postgres -d pg_articles
\l
\c 
\d


# 📘 Auto-Generated Blog — README

## 📝 Descrição do Projeto

O **Auto-Generated Blog** é uma aplicação composta por frontend, backend e base de dados PostgreSQL, totalmente containerizada com Docker. O sistema permite gerar, armazenar e exibir artigos criados automaticamente, possivelmente com apoio de inteligência artificial.

O ambiente de desenvolvimento e produção é facilmente replicável graças ao `docker-compose.yml`, que orquestra todos os serviços.

---

## 🏗️ Arquitetura

A solução é composta por três serviços:
```
┌────────────────────────┐
│      Frontend          │
│         React          │
│      Porta 3000        │
└─────────────▲──────────┘
              │
              │ HTTP
              │
┌─────────────┴──────────┐
│       Backend          │
│      Node.js / IA      │
│      Porta 8080        │
└─────────────▲──────────┘
              │
              │ PostgreSQL
              │
┌─────────────┴──────────┐
│       Database         │
│     Postgres 15        │
│      Porta 5432        │
└────────────────────────┘
```

---

## 🧱 Tecnologias utilizadas

### Backend
- Node.js
- Integração com IA 
- Postgres client (`pg`)

### Frontend
- React 
- Nginx 

### Database
- PostgreSQL 15

### Infraestrutura
- Docker
- Docker Compose

---

## 📦 Como executar o projeto

### ✔️ 1. Certifica-te que tens o Docker instalado
Docker Desktop ou Docker Engine + Compose Plugin.

### ✔️ 2. Acede à pasta onde está o `docker-compose.yml`
```bash
cd infra
```

### ✔️ 3. Lança todos os serviços
```bash
docker compose up --build
```

---

## 🌍 Aceder à aplicação

| Serviço  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:8080 |
| Postgres | localhost:5432        |

---

## 🗃️ Configuração da Base de Dados

O container `db` cria automaticamente:

- **Base de dados:** `pg_articles`
- **Utilizador:** `postgres`
- **Senha:** `*********`

O volume `db_data` garante que os dados persistem entre execuções.

---

## 🔧 Variáveis de Ambiente do Backend

O backend recebe:

| Variável      | Valor       |
|---------------|-------------|
| PORT          | 8080        |
| DB_HOST       | db          |
| DB_USER       | postgres    |
| DB_PASSWORD   | ******      |
| DB_NAME       | pg_articles |
| DB_PORT       | 5432        |

---

## 🔄 Dependências entre serviços

O backend só levanta quando o PostgreSQL está `healthy`, graças ao:
```yaml
depends_on:
  db:
    condition: service_healthy
```

O frontend levanta apenas depois do backend.

---

## 💾 Persistência

O volume:
```yaml
volumes:
  db_data:
```

Garante que o PostgreSQL mantém os dados mesmo após:
```bash
docker compose down
```

---

## 🤖 Fallback da IA 

Se o backend usa IA para gerar textos, é recomendado ter fallback quando:

- A API da IA falha
- O crédito do provider acaba
- A resposta vem vazia ou inválida

### Exemplos de fallback úteis:

- Se a IA não gerar título → usar `"Untitled Article"`
- Se não gerar corpo → usar uma mensagem padrão
- Se timeout → armazenar artigo como rascunho
- Se a IA falhar durante update → manter o valor existente

Implementar isto evita quebra total do sistema.

---

## 🧪 Comandos úteis

**Ver logs:**
```bash
docker compose logs -f backend
```

**Reiniciar serviço:**
```bash
docker compose restart backend
```

**Destruir tudo (incluindo volume):**
```bash
docker compose down -v
```

---

## 📝 Technical Decisions

**Why HuggingFace?** Free tier, good quality models (Llama 3.2)  
**Why PostgreSQL?** Robust, scalable, free on EC2  
**Why node-cron?** Simple, reliable, no external dependencies

## 📌 Notas finais

- O sistema funciona 100% em Docker.
- A arquitetura é modular e fácil de estender.
- Suporta futuras integrações com IA.
- O frontend comunica com o backend pela porta 8080.
