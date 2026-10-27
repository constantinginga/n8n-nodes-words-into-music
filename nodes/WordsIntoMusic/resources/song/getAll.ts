import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSongGetMany = {
	operation: ['getAll'],
	resource: ['song'],
};

// The API returns at most 20 songs per page. Larger limits follow the cursor
// and n8n trims the combined result to the limit. The pagination qs replaces
// the request qs, so it carries the page size forward. n8n keeps the first
// paginate flag it sees, so Limit stays first; both send the same page size.
const followCursor = {
	pagination: {
		type: 'generic' as const,
		properties: {
			continue: '={{ !!$response.body.cursor }}',
			request: {
				qs: {
					limit: '={{ $request.qs.limit }}',
					cursor: '={{ $response.body.cursor }}',
				},
			},
		},
	},
};

export const songGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForSongGetMany,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		routing: {
			send: {
				paginate: '={{ $value > 20 }}',
				type: 'query',
				property: 'limit',
				value: '={{ Math.min($value, 20) }}',
			},
			operations: followCursor,
			output: {
				maxResults: '={{$value}}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForSongGetMany,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'limit',
				value: '={{ $value ? 20 : Math.min($parameter.limit, 20) }}',
			},
			operations: followCursor,
		},
	},
];
