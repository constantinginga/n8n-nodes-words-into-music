import type { INodeProperties } from 'n8n-workflow';
import { languageOptions } from '../../shared/descriptions';

const showOnlyForSongPrepare = {
	operation: ['prepare'],
	resource: ['song'],
};

export const songPrepareDescription: INodeProperties[] = [
	{
		displayName: 'Request ID',
		name: 'requestId',
		type: 'string',
		required: true,
		displayOptions: { show: showOnlyForSongPrepare },
		default:
			"={{ ('n8n-' + $workflow.id + '-' + $execution.id + '-' + $itemIndex).replace(/[^A-Za-z0-9_-]/g, '') }}",
		description:
			'A stable ID for this song brief (16-100 letters, numbers, dashes or underscores). Repeating the same brief with the same ID returns the same preparation. Use a new ID for a different song.',
		routing: {
			send: {
				type: 'body',
				property: 'requestId',
			},
		},
	},
	{
		displayName: 'Mode',
		name: 'mode',
		type: 'options',
		displayOptions: { show: showOnlyForSongPrepare },
		options: [
			{
				name: 'From Idea',
				value: 'idea',
				description: 'Describe what the song is about. Lyrics are written for you.',
			},
			{
				name: 'From Lyrics',
				value: 'lyrics',
				description: 'Provide the lyrics to sing',
			},
		],
		default: 'idea',
		routing: {
			send: {
				type: 'body',
				property: 'input.mode',
			},
		},
	},
	{
		displayName: 'Idea',
		name: 'idea',
		type: 'string',
		required: true,
		typeOptions: { rows: 4 },
		displayOptions: {
			show: {
				...showOnlyForSongPrepare,
				mode: ['idea'],
			},
		},
		default: '',
		placeholder: 'A birthday song for my sister Ana, who loves hiking and terrible puns',
		description: 'What the song is about, up to 2,000 characters',
		routing: {
			send: {
				type: 'body',
				property: 'input.idea',
			},
		},
	},
	{
		displayName: 'Lyrics',
		name: 'lyrics',
		type: 'string',
		required: true,
		typeOptions: { rows: 8 },
		displayOptions: {
			show: {
				...showOnlyForSongPrepare,
				mode: ['lyrics'],
			},
		},
		default: '',
		description: 'The lyrics to sing, up to 4,000 characters',
		routing: {
			send: {
				type: 'body',
				property: 'input.lyrics',
			},
		},
	},
	{
		displayName: 'Musical Direction',
		name: 'direction',
		type: 'string',
		required: true,
		typeOptions: { rows: 2 },
		displayOptions: { show: showOnlyForSongPrepare },
		default: '',
		placeholder: 'Upbeat acoustic folk, hand claps, warm female vocals',
		description: 'Musical style, instruments, mood and vocal delivery, up to 400 characters',
		routing: {
			send: {
				type: 'body',
				property: 'input.direction',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: { show: showOnlyForSongPrepare },
		default: {},
		options: [
			{
				displayName: 'Duration (Seconds)',
				name: 'duration',
				type: 'number',
				typeOptions: { minValue: 60, maxValue: 180 },
				default: 120,
				description: 'Target song length, from 60 to 180 seconds',
				routing: {
					send: {
						type: 'body',
						property: 'input.duration',
					},
				},
			},
			{
				displayName: 'Instrumental',
				name: 'instrumental',
				type: 'boolean',
				default: false,
				description: 'Whether to generate the song without vocals',
				routing: {
					send: {
						type: 'body',
						property: 'input.instrumental',
					},
				},
			},
			{
				displayName: 'Interface Language',
				name: 'uiLocale',
				type: 'options',
				options: languageOptions,
				default: 'en',
				description: 'Language for messages returned by the API',
				routing: {
					send: {
						type: 'body',
						property: 'uiLocale',
					},
				},
			},
			{
				displayName: 'Song Language',
				name: 'language',
				type: 'options',
				options: languageOptions,
				default: 'en',
				description: 'Language of the lyrics',
				routing: {
					send: {
						type: 'body',
						property: 'input.language',
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Song title, up to 100 characters. Leave empty to have one suggested.',
				routing: {
					send: {
						type: 'body',
						property: 'input.title',
					},
				},
			},
		],
	},
];
