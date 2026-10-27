import type { INodeProperties } from 'n8n-workflow';

const showOnlyForJobs = {
	resource: ['job'],
};

export const jobDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForJobs,
		},
		options: [
			{
				name: 'Get Status',
				value: 'get',
				action: 'Get song generation status',
				description:
					'Check a generation job. Check at least 15 seconds apart. A ready job includes the private song link.',
				routing: {
					request: {
						method: 'GET',
						url: '=/jobs/{{encodeURIComponent($parameter.jobId)}}',
					},
				},
			},
		],
		default: 'get',
	},
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForJobs,
				operation: ['get'],
			},
		},
		default: '',
		placeholder: '={{ $json.jobId }}',
		description: 'The jobId returned by the Start operation',
	},
];
