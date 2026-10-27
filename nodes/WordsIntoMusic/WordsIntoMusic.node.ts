import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { accountDescription } from './resources/account';
import { jobDescription } from './resources/job';
import { songDescription } from './resources/song';

export class WordsIntoMusic implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Words into Music',
		name: 'wordsIntoMusic',
		icon: {
			light: 'file:../../icons/wordsintomusic.svg',
			dark: 'file:../../icons/wordsintomusic.dark.svg',
		},
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Create AI songs from ideas or lyrics and manage your Words into Music library',
		defaults: {
			name: 'Words into Music',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'wordsIntoMusicApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://mcp.wordsintomusic.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Job',
						value: 'job',
					},
					{
						name: 'Song',
						value: 'song',
					},
				],
				default: 'song',
			},
			...songDescription,
			...jobDescription,
			...accountDescription,
		],
	};
}
