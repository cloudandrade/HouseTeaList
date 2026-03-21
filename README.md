# HouseTeaList — lista de presentes (Vite + React + API Node)

Projeto de lista online (ex.: chá de casa nova). O frontend está na raiz (**Vite**); a API em `server/`.

## Personalização (textos, lista e cores)

- `src/config/appContent.js` — objeto **`APP_CONTENT`** (textos e imagem); inclui **`theme`** (referência à paleta)
- `src/config/theme.js` — leitura das **`VITE_COLOR_*`** e injeção das variáveis CSS
- `data/listaInicial.json` — **fonte única** dos itens iniciais (usada pelo front e pelo seed da API quando o MongoDB está vazio)

A **imagem do topo** é o import `heroImage` em `appContent.js` (por defeito `src/img/img1.jpg`).

## Frontend — `.env` (API e tema)

Na raiz, o **`.env`** define:

- **`VITE_API_URL`** — URL da API (ex.: `http://localhost:5000`).
- **`VITE_COLOR_*`** — cores do tema (hex ou `rgb(...)`). Ver `src/config/theme.js` e comentários em **`.env.example`** (exemplos para azul, verde, amarelo, marrom, preto/branco).

As cores são aplicadas em `src/config/appContent.js` via **`APP_CONTENT.theme`** / **`APP_THEME`** e em variáveis CSS `--color-*`.

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
