"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YandexOAuth2Api = void 0;
class YandexOAuth2Api {
    constructor() {
        this.name = 'yandexOAuth2Api';
        this.displayName = 'Yandex OAuth2 API';
        this.documentationUrl = 'https://yandex.ru/dev/id/doc/ru/authorization';
        this.extends = ['oAuth2Api'];
        this.properties = [
            {
                displayName: 'Scope',
                name: 'scope',
                type: 'string',
                default: 'telemostapi:conferences.read telemostapi:conferences.create telemostapi:conferences.update telemostapi:conferences.delete',
                description: 'Space-separated list of scopes',
            },
            {
                displayName: 'Auth URL',
                name: 'authUrl',
                type: 'hidden',
                default: 'https://oauth.yandex.ru/authorize',
            },
            {
                displayName: 'Access Token URL',
                name: 'accessTokenUrl',
                type: 'hidden',
                default: 'https://oauth.yandex.ru/token',
            },
        ];
    }
}
exports.YandexOAuth2Api = YandexOAuth2Api;
//# sourceMappingURL=YandexOAuth2Api.credentials.js.map