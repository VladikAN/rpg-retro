# rpg-retro

Небольшая **браузерная** игра для **командных ретро**: игроки по ссылке и ключу приглашения попадают в **сессию**, выбирают **персонажей**, на **арене** параллельно ходят, дерутся с простыми врагами и проходят **этапы ретро** под управлением **ведущего**. Целевые устройства: **ноутбуки и телефоны**; голос/чат — **вне** проекта (Zoom, Discord и т.д.).

## Документация

| Файл | Содержание |
|------|------------|
| [docs/AGENT.md](docs/AGENT.md) | Память и контекст для агентов, договорённости |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | Функциональные и нефункциональные требования |
| [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md) | Игровой дизайн, этапы ретро, локации, визуал |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Стек, **Go** и Node, WebSocket, WebRTC, монорепо |
| [docs/CJM.md](docs/CJM.md) | CJM: **сценарий** (локация + объект сбора), лобби, арена, ретро, **финал** (ЗА/ПРОТИВ) |
| [docs/E2E.md](docs/E2E.md) | E2E (Playwright) и привязка к CJM |
| [docs/ROLES_AND_SKILLS.md](docs/ROLES_AND_SKILLS.md) | Роли и навыки (QA, Dev, ревью, PM) |
| [docs/PROCESS.md](docs/PROCESS.md) | Процесс, тикеты, e2e в CI |
| [docs/CODE_STYLE.md](docs/CODE_STYLE.md) | Правила кода |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Docker, env, раскатка |

## Структура репозитория (монорепо)

- **`apps/client/`** — клиент: браузер, 2D-арена, UI ретро.
- **`apps/server/`** — бэкенд: ожидаемо **Go** (REST, статика клиента, WebSocket, сигналы WebRTC); альтернатива — **Node** (см. `docs/ARCHITECTURE.md`).

## Быстрый старт (когда появятся сервисы)

1. Скопируйте `.env.example` в `.env` и задайте переменные.
2. `docker compose up --build`

Сейчас `docker-compose.yml` — **каркас** (placeholder), заполняется вместе с клиентом и сервером.

## Секреты

Никаких ключей в репозитории — только **переменные окружения**; пример имён — в `.env.example`.

## Тикеты

На старте тикеты **не** ведём; после переноса в **GitLab** — по [docs/PROCESS.md](docs/PROCESS.md) и с **вашим согласованием** на структуру задач.
