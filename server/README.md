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
| `CONFIG_ADMIN_KEY` | Chave secreta para o painel de configuração no frontend (`/config`). Sem isto, `POST /admin/verify-config-key` e rotas `PUT/POST/DELETE /admin/*` respondem 503 ou 401. |

### Rotas de configuração

- `GET /app-settings` — textos e metadados públicos (merge com defaults no servidor); sem autenticação.
- `POST /admin/verify-config-key` — corpo `{ "key": "..." }`; valida contra `CONFIG_ADMIN_KEY`.
- `PUT /admin/app-settings` — cabeçalho `x-config-key: <CONFIG_ADMIN_KEY>`; corpo com campos de texto, `accordion`, `themeVariation` (inteiro 1–30, paleta de cores) e opcional `heroImageDataUrl` (base64) ou vazio para remover imagem personalizada.
- `POST /admin/itens` — adiciona item à lista; cabeçalho `x-config-key`.
- `DELETE /admin/itens/:mongoId` — remove por `_id` do MongoDB; cabeçalho `x-config-key`.

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
