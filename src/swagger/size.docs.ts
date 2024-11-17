import { errorSchema } from './error.schema';
export const docs = {
  '/size': {
    get: {
      tags: ['Size'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Retrive a list of size',
      description: 'This endpoint retrive all available size',
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  success: { type: 'boolean' },
                  data: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Size',
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          ...errorSchema.UNAUTHORIZED,
        },
      },
    },
    post: {
      tags: ['Size'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new size',
      description: 'This endpoint create a new size',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the size',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '400': {
          ...errorSchema.BAD_REQUEST,
        },
        '401': {
          ...errorSchema.UNAUTHORIZED,
        },
        '422': {
          ...errorSchema.CONFLICT,
        },
      },
    },
  },
  '/size/{id}': {
    patch: {
      tags: ['Size'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update an existing size',
      description: 'This endpoint update an existing size',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the size to be updated',
          schema: {
            type: 'integer',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the size',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '400': {
          ...errorSchema.BAD_REQUEST,
        },
        '401': {
          ...errorSchema.UNAUTHORIZED,
        },
        '404': {
          ...errorSchema.NOT_FOUND,
        },
        '422': {
          ...errorSchema.CONFLICT,
        },
      },
    },
    delete: {
      tags: ['Size'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete an existing size',
      description: 'This endpoint delete an existing size',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the size to be deleted',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '400': {
          ...errorSchema.BAD_REQUEST,
        },
        '401': {
          ...errorSchema.UNAUTHORIZED,
        },
        '404': {
          ...errorSchema.NOT_FOUND,
        },
      },
    },
  },
};

export const schema = {
  Size: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Unique identifier for the size',
      },
      name: {
        type: 'string',
        description: 'Name of the size',
      },
    },
  },
};
