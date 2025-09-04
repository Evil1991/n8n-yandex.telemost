import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
export declare function yandexTelemostApiRequest(this: IExecuteFunctions, method: 'GET' | 'POST' | 'PATCH' | 'DELETE', endpoint: string, body?: IDataObject, qs?: IDataObject, options?: IDataObject): Promise<IDataObject>;
