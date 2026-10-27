import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSongStart = {
	operation: ['start'],
	resource: ['song'],
};

export const songStartDescription: INodeProperties[] = [
	{
		displayName: 'Prepared Request ID',
		name: 'preparedRequestId',
		type: 'string',
		required: true,
		displayOptions: { show: showOnlyForSongStart },
		default: '',
		placeholder: '={{ $json.preparedRequestId }}',
		description:
			'The preparedRequestId returned by the Prepare operation. If a start request times out, retry with the same ID instead of preparing a new song.',
		routing: {
			send: {
				type: 'body',
				property: 'preparedRequestId',
			},
		},
	},
];
