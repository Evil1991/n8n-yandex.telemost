"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yandexTelemostApiRequest = yandexTelemostApiRequest;
async function yandexTelemostApiRequest(method, endpoint, body = {}, qs = {}, options = {}) {
    const baseUrl = 'https://api.telemost.yandex.net/v1';
    const requestOptions = {
        method,
        url: `${baseUrl}${endpoint}`,
        json: true,
        qs,
        body: Object.keys(body).length ? body : undefined,
    };
    if (options.headers) {
        requestOptions.headers = options.headers;
    }
    const response = await this.helpers.requestOAuth2.call(this, 'yandexOAuth2Api', requestOptions);
    return response;
}
//# sourceMappingURL=GenericFunctions.js.map