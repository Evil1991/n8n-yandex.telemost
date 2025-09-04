# n8n-nodes-yandex-telemost

Пользовательская нода n8n для работы с API Яндекс.Телемост: создание, получение, список и удаление конференций.

## Установка

1. Соберите пакет:

```bash
cd packages/nodes-yandex-telemost
npm install
npm run build
```

2. Скопируйте `dist` в папку с внешними нодами n8n или установите пакет в режиме локального файла.

## Настройка OAuth2

- Создайте приложение в Яндекс.OAuth и получите `Client ID` и `Client Secret`.
- Укажите скоупы: `telemostapi:conferences.read telemostapi:conferences.create telemostapi:conferences.update telemostapi:conferences.delete`.
- В n8n создайте креды `Yandex OAuth2 API` и задайте Redirect URI, соответствующий настройкам приложения.

## Использование

- Добавьте в воркфлоу ноду `Yandex Telemost`.
- Выберите ресурс `Conference` и операцию `Create`, `Get`, `List` или `Delete`.

> Примечание: базовый URL и формат полей могут отличаться от реальных, сверяйтесь с официальной документацией Яндекс.Телемост.
