# Udhamshil Nepal

Official web application for **Udhamshil Nepal Global Trade Company** — a machinery exporter/manufacturer based in Kohalpur-11, Banke, Nepal (est. 2020).

**Website:** <https://www.udhamsilnepal.com.np/>

The project has two parts:

- **`backend/`** — Django 6.1 content API + admin CMS
- **`frontend/`** — TanStack Start (React 19) company website

---

## Tech Stack

### Backend (`backend/`)

- Django 6.1 / Python ≥ 3.13 (managed with [uv](https://docs.astral.sh/uv/))
- Django REST Framework (public read-only content API)
- MySQL (production) / SQLite (development)
- Jazzmin admin theme, TinyMCE rich-text editor
- django-vite, Whitenoise static files, gunicorn
- ruff, pytest (dev tooling)
- Task runner: [just](https://github.com/casey/just) (`backend/justfile`)

### Frontend (`frontend/`)

- TanStack Start + TanStack Router (file-based routing) + TanStack Query
- React 19, TypeScript 5.8, Vite 8
- Tailwind CSS 4, shadcn/ui (Radix primitives), lucide-react
- react-hook-form + zod, recharts, sonner
- Package manager: [bun](https://bun.sh/) (`bun.lock`)

---

## Project Architecture

The two apps are designed to run as **one application on one domain** — React builds into static assets that Django serves — making deployment on traditional shared hosting (cPanel) straightforward.

```text
                  udhamsilnepal.com.np
                            │
                            ▼
                  ┌──────────────────┐
                  │      Django      │
                  │    Application   │
                  └────────┬─────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
      ┌─────────────────┐       ┌─────────────────┐
      │ Django Backend  │       │ React Frontend  │
      │ - REST APIs     │       │ - Components    │
      │ - Business Logic│       │ - User Interface│
      │ - Database      │       │ - Client Logic  │
      │ - Admin CMS     │       │ - Interactions  │
      └────────┬────────┘       └────────┬────────┘
               └────────────┬────────────┘
                            ▼
                      Single Domain
```

> **Status note:** django-vite is configured on the Django side, but the frontend build is not yet wired into Django templates, and the frontend currently uses hardcoded page data rather than calling the API. The two apps run independently today; the single-domain integration is the target architecture.

---

## Features

### Content management (Django admin at `/admin/`)

Admin is organized into virtual sections: Website Content, About & Company, Careers, Products, Projects & Events, Our Team, Testimonials, Contact Messages.

Content models: `Organization` (singleton with social links/map/hours), `AboutUs`, `Vision`, `Mision`, `Values`, `WhatWeDo`, `Patner`, `SisterCompanies`, `OurService`, `Product` + `ProductFeatures`, `Project`, `Events`, `Team`, `Testimonial`, `Career`, `HeroSection`, `Stats`, `MarqueeService`, `Contact`.

### Public API (`/api/`)

Read-only JSON endpoints (paginated, page size 20):

| Endpoint | Description |
|---|---|
| `/api/homepage/hero/`, `/api/homepage/stats/`, `/api/homepage/marquee/` | Homepage sections |
| `/api/org/about/`, `vision/`, `mision/`, `values/`, `what-we-do/`, `partners/`, `sister-companies/`, `services/`, `organization/` | Organization content |
| `/api/products/` | Products (with features) |
| `/api/projects/`, `/api/events/` | Projects & events |
| `/api/team/` | Team members |
| `/api/testimonials/` | Testimonials |
| `/api/career/` | Job listings (filters: `job_time`, `location`; search) |
| `/api/contact/` | `POST` create (public); list requires admin |

### Website pages (frontend)

Home, About, Team, Projects & Events, Products, Career (list + detail + application form), Contact.

---

## Local Development

### Backend

```bash
cd backend
cp .env.sample .env          # set DJANGO_SETTINGS_MODULE=app.settings.development
uv sync                      # install dependencies (or: pip install -r requirements.txt)

# No migrations are committed yet — generate them on first run:
uv run python manage.py makemigrations
just migrate                 # uv run python manage.py migrate

just createsuperuser         # optional — create admin user
uv run python manage.py demo_seed   # optional — seed demo data

just dev                     # uv run python manage.py runserver
```

Other useful recipes: `just lint`, `just format`, `just test`, `just check`, `just ci`, `just collectstatic`, `just server` (gunicorn).

### Frontend

```bash
cd frontend
bun install                  # bun.lock is the lockfile (npm install also works)
bun run dev                  # vite dev → TanStack Start dev server
```

Other scripts: `bun run build`, `bun run lint`, `bun run format`, `bun run preview`.

### Full stack

Run backend and frontend in two terminals — backend on `:8000`, frontend dev server on its own port. CORS is wide open in development settings.

> **Note:** `just vite` and `just dev-full` are currently broken (they run npm from `backend/` where no `package.json` exists).

---

## Production

- Build the frontend (`bun run build` in `frontend/`), integrate assets with Django, and run everything from Django behind a single domain.
- Production settings (`app.settings.production`) use MySQL, HSTS/SSL redirects, secure cookies, CORS restricted to `FRONTEND_URL`, and SMTP email.
- Run with gunicorn (`just server`), Whitenoise serves static files.
- Typical deploy steps: build frontend → upload to cPanel → configure env → `makemigrations`/`migrate` → `collectstatic` → start Django.

React development server is **not** required in production — Django serves the built application.

---

## Project Structure

```text
udhamshil-nepal/
├── backend/
│   ├── manage.py
│   ├── pyproject.toml          # uv, deps source of truth
│   ├── requirements.txt
│   ├── justfile                # dev task runner
│   ├── .env.sample
│   ├── .github/workflows/ci.yml
│   └── app/
│       ├── settings/           # base / development / production
│       ├── models/             # all content models
│       ├── api/                # DRF viewsets, serializers, urls
│       ├── admin/              # Jazzmin admin config
│       ├── management/commands/demo_seed.py
│       ├── tests/
│       ├── urls.py
│       └── wsgi.py / asgi.py
│
├── frontend/                   # nested git repo (Lovable-connected)
│   ├── package.json
│   ├── bun.lock
│   ├── vite.config.ts
│   └── src/
│       ├── routes/             # file-based routes (index, about, team, ...)
│       ├── components/
│       │   ├── site/           # Header, Footer, Parallax, forms
│       │   └── ui/             # shadcn components
│       ├── integrations/supabase/
│       ├── lib/
│       └── assets/
│
├── LICENSE                     # BSD 3-Clause
└── README.md
```

---

## CI

`backend/.github/workflows/ci.yml` runs on push/PR: uv sync → ruff check/format → `manage.py check` → tests → `makemigrations --check` → `check --deploy`.

---

## License

BSD 3-Clause — see [LICENSE](LICENSE).

---

## Website

**Udhamshil Nepal:** <https://www.udhamsilnepal.com.np/>
