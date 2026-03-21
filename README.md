# HouseTeaList — lista de presentes (Vite + React + API Node)

Projeto de lista online (ex.: chá de casa nova). O frontend está na raiz (**Vite**); a API em `server/`.

## Personalização (textos, lista e cores)

- `src/config/appContent.js` — objeto **`APP_CONTENT`** (textos e imagem); inclui **`theme`** (referência à paleta)
- `src/config/theme.js` — aplica a paleta escolhida e injeta variáveis CSS `--color-*`
- `src/config/themePalettes.js` — **30 paletas** numeradas (1–30)
- **`themes.md`** — tabela de nomes e cores hex de cada tema
- `data/listaInicial.json` — **fonte única** dos itens iniciais (usada pelo front e pelo seed da API quando o MongoDB está vazio)

A **imagem do topo** é o import `heroImage` em `appContent.js` (por defeito `src/img/img1.jpg`).

## Frontend — `.env` (API e tema)

Na raiz, o **`.env`** define:

- **`VITE_API_URL`** — URL da API (ex.: `http://localhost:5000`).
- **`VITE_THEME_VARIATION`** — inteiro **1** a **30** para escolher a paleta. Detalhes e cores em **`themes.md`**.

As cores são aplicadas em `src/config/appContent.js` via **`APP_CONTENT.theme`** / **`APP_THEME`** e em variáveis CSS `--color-*`.

### Painel de configuração (`/config`)

Rota **`/config`** no Vite: permite alterar textos da página, **tema (paleta 1–30)**, imagem (base64 na base de dados) e itens da lista, mediante **`CONFIG_ADMIN_KEY`** no `server/.env`. A página pública lê **`GET /app-settings`** e usa os defaults em `src/config/defaultContent.js` quando não há overrides no MongoDB. O tema guardado na BD tem prioridade sobre **`VITE_THEME_VARIATION`** no `.env` (este último serve de fallback até existir `themeVariation` no documento ou se a API falhar).

## Rodar API + React

- **`npm run dev`** — servidor + Vite num terminal (prefixos `server` e `web`).
- **`npm run dev:win`** (Windows) — duas janelas do Prompt.

À mão: `npm run server` e noutro terminal `npm start` (Vite).

## Build

```bash
npm run build
npm run preview   # pré-visualizar o build em local
```

Saída em `dist/`.

## MongoDB local (Docker)

```bash
docker compose up -d
```

Depois suba a API em `server/` com `APP_ENV=local` (ver `server/README.md`).

## Link legado da app

http://tealist.herokuapp.com/
