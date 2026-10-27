import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WordsIntoMusicApi implements ICredentialType {
	name = 'wordsIntoMusicApi';

	displayName = 'Words Into Music API';

	icon: Icon = {
		light: 'file:../icons/wordsintomusic.svg',
		dark: 'file:../icons/wordsintomusic.dark.svg',
	};

	documentationUrl = 'https://wordsintomusic.com/developers/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			placeholder: 'wim_...',
			description:
				'Create a key in Settings at https://wordsintomusic.com/app/settings/. Keys start with wim_.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://mcp.wordsintomusic.com/v1',
			url: '/account',
			method: 'GET',
		},
	};
}
