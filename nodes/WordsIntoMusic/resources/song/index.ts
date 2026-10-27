import type { INodeProperties } from 'n8n-workflow';
import { songPrepareDescription } from './prepare';
import { songStartDescription } from './start';
import { songGetDescription } from './get';
import { songGetManyDescription } from './getAll';

const showOnlyForSongs = {
	resource: ['song'],
};

export const songDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForSongs,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a song',
				description: 'Get one song from your private library',
				routing: {
					request: {
						method: 'GET',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many songs',
				description: 'List songs in your private library, newest first',
				routing: {
					request: {
						method: 'GET',
						url: '/songs',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'songs',
								},
							},
						],
					},
				},
			},
			{
				name: 'Prepare',
				value: 'prepare',
				action: 'Prepare a song',
				description:
					'Validate a song brief and get a prepared request ID. Does not use a song credit. Preparations expire after one hour.',
				routing: {
					request: {
						method: 'POST',
						url: '/songs/prepare',
					},
				},
			},
			{
				name: 'Start',
				value: 'start',
				action: 'Start generating a prepared song',
				description:
					'Generate a prepared song. Uses one song credit. Starting the same preparation again returns the same job.',
				routing: {
					request: {
						method: 'POST',
						url: '/songs/start',
					},
				},
			},
		],
		default: 'prepare',
	},
	...songPrepareDescription,
	...songStartDescription,
	...songGetDescription,
	...songGetManyDescription,
];
