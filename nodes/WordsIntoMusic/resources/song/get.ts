import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSongGet = {
	operation: ['get'],
	resource: ['song'],
};

export const songGetDescription: INodeProperties[] = [
	{
		displayName: 'Song ID',
		name: 'songId',
		type: 'string',
		required: true,
		displayOptions: { show: showOnlyForSongGet },
		default: '',
		description: 'The ID of a song in your library',
	},
	{
		displayName: 'Include Lyrics',
		name: 'includeLyrics',
		type: 'boolean',
		displayOptions: { show: showOnlyForSongGet },
		default: false,
		description: 'Whether to include the song lyrics in the response',
		routing: {
			send: {
				type: 'query',
				property: 'includeLyrics',
			},
		},
	},
];
