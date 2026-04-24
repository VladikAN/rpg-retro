# Server (`apps/server`)

Бэкенд (ожидаемо **Go**): REST (CRUD групп/сессий), раздача собранного `apps/client/dist`, **WebSocket** (авторитетный game state), сигнальные маршруты или канал для **WebRTC**; при необходимости **Pion**. Подробно — [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md).

`go.mod` и `main` добавятся вместе с реализацией. **Node.js** остаётся допустимой альтернативой (см. §3.2 того же документа).
