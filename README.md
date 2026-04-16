# CodeXClear — Vite + React 18 Website

Public-facing marketing website for **CodeXClear.com**, built with:

- **Vite 6** (fast dev server + optimised build)
- **React 18.3** — functional components, hooks only
- **React Router v6.27** — lazy-loaded pages, `<Link>` for internal routes
- **3-theme design system** — Deep Navy, Purple Aurora, Arctic Light

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Configure environment (already set, edit if needed)
cp .env.example .env

# 3. Add your logos to src/assets/
#    logo.png  — square icon (navbar)
#    logo-full.png  — full wordmark (footer)

# 4. Start dev server (opens http://localhost:3000)
npm run dev

# 5. Production build
npm run build

# 6. Preview production build locally
npm run preview
```

---

## Project Layout

```
my-react-app/
├── index.html              ← Vite entry HTML
├── package.json
├── vite.config.js          ← port 3000, vendor chunk split
├── .env                    ← VITE_API_BASE_URL etc.
├── .env.example
├── public/
│   ├── manifest.json
│   ├── _redirects          ← Netlify SPA fallback
│   └── logo.png       ← copy your icon here
└── src/
    ├── main.jsx            ← ReactDOM.createRoot
    ├── App.jsx             ← Router + lazy pages
    ├── App.css
    ├── assets/
    │   ├── logo.png
    │   └── logo-full.png
    ├── context/
    │   └── ThemeContext.jsx ← 3 themes, localStorage
    ├── hooks/
    │   ├── useScrollReveal.js
    │   └── useCounter.js
    ├── utils/
    │   ├── validation.js    ← validateContact()
    │   └── contactApi.js    ← fetch to .NET Core API
    ├── styles/
    │   └── global.css       ← full design system
    ├── components/
    │   ├── Navbar/
    │   │   ├── Navbar.jsx   ← mega-menu, theme switcher, mobile drawer
    │   │   └── Navbar.css
    │   ├── Footer/
    │   │   ├── Footer.jsx   ← newsletter form
    │   │   └── Footer.css
    │   └── shared/
    │       ├── BottomNav.jsx
    │       └── ScrollToTop.jsx
    └── pages/
        ├── Home.jsx + .css
        ├── Services.jsx + .css
        ├── Products.jsx + .css
        ├── About.jsx + .css
        ├── Blog.jsx + .css
        ├── Contact.jsx + .css  ← full validation + API
        └── NotFound.jsx
```

---

## Environment Variables

All prefixed with `VITE_` (Vite convention — accessible via `import.meta.env.VITE_*`):

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `https://codexclear.com` | .NET Core API base URL |
| `VITE_LOGIN_URL` | `https://login.codexclear.com/login` | Angular app login |
| `VITE_REGISTER_URL` | `https://login.codexclear.com/register` | Angular app register |
| `VITE_INVOICE_APP_URL` | `https://login.codexclear.com/login?app=invoice` | Invoice app |
| `VITE_MUSIC_APP_URL` | `https://login.codexclear.com/login?app=music` | Music app |

---

## Contact Form API

The contact form POSTs to your .NET Core backend:

```
POST /api/contact/send
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "phone": "string | null",
  "company": "string | null",
  "service": "string | null",
  "message": "string"
}
```

Expected response: `{ "message": "Message sent successfully!" }`

If your endpoint path differs, edit `src/utils/contactApi.js`.

### CORS (add to your .NET Core API)

```csharp
builder.Services.AddCors(options => {
    options.AddPolicy("ReactApp", policy =>
        policy.WithOrigins("https://your-domain.com", "http://localhost:3000")
              .AllowAnyHeader().AllowAnyMethod());
});
app.UseCors("ReactApp");
```

---

## Themes

Three themes persisted in `localStorage` under key `cxc-theme`:

| Key | Name | Text colour |
|---|---|---|
| `default` | Deep Navy | White `#FFFFFF` |
| `aurora`  | Purple Aurora | White `#FFFFFF` |
| `arctic`  | Arctic Light | Dark `#0E1B2A` ✓ |

**Arctic Light** uses `--text-primary: #0E1B2A` and `--input-text: #0E1B2A` so all text is fully visible on the light background.

---

## Deployment

### Netlify
1. Build: `npm run build` → output: `dist/`
2. The `public/_redirects` file handles SPA routing automatically.
3. Add env vars in Netlify dashboard.

### Vercel
Create `vercel.json` in root:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

### Manual / Nginx
Serve the `dist/` folder. Configure your web server to return `index.html` for all routes:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
