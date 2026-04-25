# rpg-retro

Небольшая **браузерная** игра-оболочка для **командных ретро**: несколько игроков в одной сессии по ключу приглашения, шуточные сценарии, фазы ретро и простая арена (персонажи, мобы). Целевые устройства: **ноутбуки** и **мобильные** браузеры.

## Документация

| Документ | Описание |
|----------|----------|
| [AGENTS.md](AGENTS.md) | Правила для агента и работы с репозиторием |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | Функциональные требования |
| [docs/NFR.md](docs/NFR.md) | Нефункциональные требования |
| [docs/CJM.md](docs/CJM.md) | Сценарии customer journey |
| [docs/E2E.md](docs/E2E.md) | Стратегия E2E |
| [docs/ROLES.md](docs/ROLES.md) | Роли в команде (ориентиры) |
| [docs/SCENARIOS.md](docs/SCENARIOS.md) | Сценарии ретро (контент) |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Архитектура |
| [docs/adr/](docs/adr/) | Архитектурные решения (ADR) |
| [docs/MVP.md](docs/MVP.md) | v0.1 / v0.2+, DoD, эпики |
| [docs/PROTOCOL.md](docs/PROTOCOL.md) | v0.1: маршруты `/g/`, `/join/`, имя **на арене**, lazy Phaser |

## Быстрый старт (Docker)

1. Скопировать переменные окружения: `cp .env.example .env` и при необходимости отредактировать.
2. Сборка и запуск: `docker compose up --build`.

Сервис `app` собирается из [Dockerfile](Dockerfile) (multi-stage: Vite `client/`, бинарник `server/`), публикует порт из `APP_PORT` (см. `.env.example`).

**Локально без Docker:** `cd client && npm install && npm run build`, затем скопировать `client/dist/*` в `server/web/dist/`, после чего `cd server && go run .` (порт `PORT` или `8080`).

## Монорепо

- **`server/`** — **Go** (HTTP, WebSocket, раздача `client` build).  
- **`client/`** — **TypeScript**, **Vite**, **Phaser 3** (лендинг, сцена арены с логом → далее геймплей).  
- Детали: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/adr/0003-client-rendering-phaser.md](docs/adr/0003-client-rendering-phaser.md).

## Репозиторий

- Развёртывание через **docker-compose**; секреты только через **env**, не в git.  
- Первая волна разработки (**v0.1**): группы + **лог** на арене — [docs/MVP.md](docs/MVP.md).  
- GitLab и тикеты — по мере подключения; [AGENTS.md](AGENTS.md).
