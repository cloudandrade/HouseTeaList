# HouseTeaList — API (Node + Express + MongoDB)

API do projeto de lista de presentes. O frontend React fica na raiz do repositório (`../`).

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste.

| Variável | Descrição |
|----------|-----------|
| `APP_ENV` | `local` (padrão) usa MongoDB local; `prod` usa `MONGODB_URI` na nuvem. |
| `MONGODB_URI` | Obrigatório se `APP_ENV=prod` (ex.: MongoDB Atlas). |
| `MONGODB_URI_LOCAL` | Opcional em `local`; padrão `mongodb://127.0.0.1:27017/tealist`. |
| `PORT` | Porta HTTP (padrão `5000`). |

## MongoDB local com Docker

Na raiz do repositório:

```bash
docker compose up -d
```

Suba a API com `APP_ENV=local` (padrão). O banco ficará em `localhost:27017`.

## Seed da lista

Na primeira chamada a `GET /itens`, se a coleção estiver vazia, a API lê **`data/listaInicial.json`** (na raiz do repositório, ao lado de `server/`) e insere os itens no MongoDB.

## Executar

```bash
npm install
npm start
```
