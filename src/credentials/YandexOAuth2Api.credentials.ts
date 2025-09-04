import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class YandexOAuth2Api implements ICredentialType {
	name = 'yandexOAuth2Api';
	displayName = 'Yandex OAuth2 API';
	documentationUrl = 'https://yandex.ru/dev/id/doc/ru/authorization';
	extends = ['oAuth2Api'];
	properties: INodeProperties[] = [
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'string',
      default:
        'telemostapi:conferences.read telemostapi:conferences.create telemostapi:conferences.update telemostapi:conferences.delete',
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


