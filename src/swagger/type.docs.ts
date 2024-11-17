import { errorSchema } from './error.schema';export const docs = {
  '/type': {
    get: {
      tags: ['Type'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Retrive a list of type',
      description: 'This endpoint retrive all available type',
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
                      $ref: '#/components/schemas/Type',
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
      tags: ['Type'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new type',
      description: 'This endpoint create a new type',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the type',
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
  '/type/{id}': {
    patch: {
      tags: ['Type'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update an existing type',
      description: 'This endpoint update an existing type',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the type to be updated',
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
                  description: 'Name of the type',
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
      tags: ['Type'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete an existing type',
      description: 'This endpoint delete an existing type',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the type to be deleted',
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
  Type: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Unique identifier for the type',
      },
      name: {
        type: 'string',
        description: 'Name of the type',
      },
    },
  },
};
