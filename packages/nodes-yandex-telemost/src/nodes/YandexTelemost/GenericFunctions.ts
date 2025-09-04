import type { IDataObject, IHttpRequestOptions, IExecuteFunctions } from 'n8n-workflow';

export async function yandexTelemostApiRequest(
  this: IExecuteFunctions,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
  options: IDataObject = {},
) {
  const baseUrl = 'https://api.telemost.yandex.net/v1';

  const requestOptions: IHttpRequestOptions = {
    method,
    url: `${baseUrl}${endpoint}`,
    json: true,
    qs,
    body: Object.keys(body).length ? body : undefined,
  };

  if (options.headers) {
    requestOptions.headers = options.headers as IDataObject;
  }

  const response = await this.helpers.requestOAuth2.call(
    this,
    'yandexOAuth2Api',
    requestOptions,
  );
  return response as IDataObject;
}


