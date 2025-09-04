"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YandexTelemost = void 0;
const GenericFunctions_1 = require("./GenericFunctions");
class YandexTelemost {
    constructor() {
        this.description = {
            displayName: 'Yandex Telemost',
            name: 'yandexTelemost',
            icon: 'file:telemost.svg',
            group: ['input'],
            version: 1,
            description: 'Работа с API Яндекс.Телемост',
            defaults: {
                name: 'Yandex Telemost',
            },
            credentials: [
                {
                    name: 'yandexOAuth2Api',
                    required: true,
                },
            ],
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    options: [{ name: 'Conference', value: 'conference' }],
                    default: 'conference',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    displayOptions: { show: { resource: ['conference'] } },
                    options: [
                        { name: 'Create', value: 'create' },
                        { name: 'Get', value: 'get' },
                        { name: 'List', value: 'list' },
                        { name: 'Delete', value: 'delete' },
                    ],
                    default: 'list',
                },
                // Create
                {
                    displayName: 'Title',
                    name: 'title',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { resource: ['conference'], operation: ['create'] } },
                },
                {
                    displayName: 'Start Time',
                    name: 'startTime',
                    type: 'dateTime',
                    required: false,
                    default: '',
                    description: 'ISO8601 datetime',
                    displayOptions: { show: { resource: ['conference'], operation: ['create'] } },
                },
                {
                    displayName: 'Additional Fields',
                    name: 'additionalFields',
                    type: 'collection',
                    placeholder: 'Add Field',
                    default: {},
                    displayOptions: { show: { resource: ['conference'], operation: ['create'] } },
                    options: [
                        {
                            displayName: 'Description',
                            name: 'description',
                            type: 'string',
                            default: '',
                        },
                    ],
                },
                // Get/Delete
                {
                    displayName: 'Conference ID',
                    name: 'conferenceId',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { resource: ['conference'], operation: ['get', 'delete'] } },
                },
                // List
                {
                    displayName: 'Limit',
                    name: 'limit',
                    type: 'number',
                    default: 50,
                    description: 'Max items to return',
                    displayOptions: { show: { resource: ['conference'], operation: ['list'] } },
                },
            ],
        };
    }
    async execute() {
        var _a;
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            if (resource === 'conference') {
                if (operation === 'create') {
                    const title = this.getNodeParameter('title', itemIndex);
                    const startTime = this.getNodeParameter('startTime', itemIndex, '');
                    const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {});
                    const body = { title, ...additionalFields };
                    if (startTime)
                        body.start_time = startTime;
                    const response = await GenericFunctions_1.yandexTelemostApiRequest.call(this, 'POST', '/conferences', body);
                    returnData.push({ json: response });
                }
                else if (operation === 'get') {
                    const conferenceId = this.getNodeParameter('conferenceId', itemIndex);
                    const response = await GenericFunctions_1.yandexTelemostApiRequest.call(this, 'GET', `/conferences/${conferenceId}`);
                    returnData.push({ json: response });
                }
                else if (operation === 'list') {
                    const limit = this.getNodeParameter('limit', itemIndex);
                    const response = await GenericFunctions_1.yandexTelemostApiRequest.call(this, 'GET', '/conferences', {}, { limit });
                    const data = Array.isArray(response) ? response : (_a = response.items) !== null && _a !== void 0 ? _a : response;
                    returnData.push(...(Array.isArray(data) ? data.map((d) => ({ json: d })) : [{ json: data }]));
                }
                else if (operation === 'delete') {
                    const conferenceId = this.getNodeParameter('conferenceId', itemIndex);
                    const response = await GenericFunctions_1.yandexTelemostApiRequest.call(this, 'DELETE', `/conferences/${conferenceId}`);
                    returnData.push({ json: response });
                }
            }
        }
        return this.prepareOutputData(returnData);
    }
}
exports.YandexTelemost = YandexTelemost;
//# sourceMappingURL=YandexTelemost.node.js.map