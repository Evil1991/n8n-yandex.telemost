import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { yandexTelemostApiRequest } from './GenericFunctions';

export class YandexTelemost implements INodeType {
  description: INodeTypeDescription = {
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

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      if (resource === 'conference') {
        if (operation === 'create') {
          const title = this.getNodeParameter('title', itemIndex) as string;
          const startTime = this.getNodeParameter('startTime', itemIndex, '') as string;
          const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as Record<string, any>;
          const body: { [key: string]: any } = { title, ...additionalFields };
          if (startTime) body.start_time = startTime;
          const response = await yandexTelemostApiRequest.call(this, 'POST', '/conferences', body);
          returnData.push({ json: response });
        } else if (operation === 'get') {
          const conferenceId = this.getNodeParameter('conferenceId', itemIndex) as string;
          const response = await yandexTelemostApiRequest.call(this, 'GET', `/conferences/${conferenceId}`);
          returnData.push({ json: response });
        } else if (operation === 'list') {
          const limit = this.getNodeParameter('limit', itemIndex) as number;
          const response = await yandexTelemostApiRequest.call(this, 'GET', '/conferences', {}, { limit });
          const data = Array.isArray(response) ? response : (response as any).items ?? response;
          returnData.push(...(Array.isArray(data) ? data.map((d) => ({ json: d })) : [{ json: data }]));
        } else if (operation === 'delete') {
          const conferenceId = this.getNodeParameter('conferenceId', itemIndex) as string;
          const response = await yandexTelemostApiRequest.call(this, 'DELETE', `/conferences/${conferenceId}`);
          returnData.push({ json: response });
        }
      }
    }

    return this.prepareOutputData(returnData);
  }
}


