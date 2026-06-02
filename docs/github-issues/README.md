# GitHub Issues — тексты тикетов v0.1

Канонические **описания** для issues [#4–#9](https://github.com/VladikAN/rpg-retro/issues) в репозитории `VladikAN/rpg-retro`. Обновлены по итогам сессии [PR #14](https://github.com/VladikAN/rpg-retro/pull/14) и состоянию `main` на 2026-06-02.

| Файл | Issue | Эпик | Состояние на `main` |
|------|-------|------|---------------------|
| [004.md](004.md) | [#4](https://github.com/VladikAN/rpg-retro/issues/4) | E1 | **Готово** → закрыть; `GetByCode` в [#6](https://github.com/VladikAN/rpg-retro/issues/6) |
| [005.md](005.md) | [#5](https://github.com/VladikAN/rpg-retro/issues/5) | E2 | Черновик [PR #13](https://github.com/VladikAN/rpg-retro/pull/13) |
| [006.md](006.md) | [#6](https://github.com/VladikAN/rpg-retro/issues/6) | E3 | Не начато |
| [007.md](007.md) | [#7](https://github.com/VladikAN/rpg-retro/issues/7) | E4 | Не начато |
| [008.md](008.md) | [#8](https://github.com/VladikAN/rpg-retro/issues/8) | E5 | Не начато |
| [009.md](009.md) | [#9](https://github.com/VladikAN/rpg-retro/issues/9) | DoD/ops | После E5 |

## Синхронизация с GitHub

Токен Cloud Agent **не имеет** `issues: write`. Владелец (или CI с PAT) применяет тексты локально:

```bash
./scripts/sync-github-issues.sh
```

Скрипт обновляет тела issues #4–#9 и **закрывает #4** с комментарием о merge PR #12.

Контракт WS/HTTP: [PROTOCOL.md](../PROTOCOL.md). Эпики: [MVP.md](../MVP.md).
