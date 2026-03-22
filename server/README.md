# HouseTeaList — API (Node + MongoDB)

Modelos e lógica partilhados com as **API Routes** do Next.js (`src/pages/api/...`). O site em produção usa o Next; este `server/` documenta sobretudo modelos e utilitários.

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste.

| Variável | Descrição |
|----------|-----------|
| `APP_ENV` | `local` (padrão) usa MongoDB local; `prod` usa `MONGODB_URI` na nuvem. |
| `MONGODB_URI` | Obrigatório se `APP_ENV=prod` (ex.: MongoDB Atlas). |
| `MONGODB_URI_LOCAL` | Opcional em `local`; padrão `mongodb://127.0.0.1:27017/tealist`. |
| `PORT` | Porta HTTP (padrão `5000`) se correr um servidor Express à parte. |

### Rotas por tenant (`/api/t/[slug]/...`)

- `GET /app-settings` — textos públicos (sem autenticação).
- `POST /admin/verify-config-key` — corpo `{ "key": "..." }`; valida contra a **chave do evento** (hash na BD).
- `PUT /admin/app-settings`, `POST /admin/itens`, `DELETE /admin/itens/:id` — cabeçalho `x-config-key` com a mesma chave do tenant.

Criação de eventos: convites em `access_invites` + primeiro acesso em **`POST /api/config/unlock`** (não há mais `CONFIG_ADMIN_KEY` nem rotas `/api/sys/*`).

## MongoDB local com Docker

Na raiz do repositório:

```bash
docker compose up -d
```

## Executar (legado)

```bash
npm install
npm start
```
