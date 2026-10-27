import type { INodeProperties } from 'n8n-workflow';

export const accountDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Get Credits',
				value: 'get',
				action: 'Get available song credits',
				description: 'Check available and reserved song credits and supported languages',
				routing: {
					request: {
						method: 'GET',
						url: '/account',
					},
				},
			},
		],
		default: 'get',
	},
];
