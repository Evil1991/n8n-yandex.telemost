import type { ICredentialType, INodeProperties } from 'n8n-workflow';
export declare class YandexOAuth2Api implements ICredentialType {
    name: string;
    displayName: string;
    documentationUrl: string;
    extends: string[];
    properties: INodeProperties[];
}
