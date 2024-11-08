import { errorSchema } from './error.schema';export const docs = {
  '/category': {
    get: {
      tags: ['Category'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Retrive a list of category',
      description: 'This endpoint retrive all available category',
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
                      $ref: '#/components/schemas/Category',
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
      tags: ['Category'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new category',
      description: 'This endpoint create a new category',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the category',
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
  '/category/{id}': {
    patch: {
      tags: ['Category'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update an existing category',
      description: 'This endpoint update an existing category',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the catory to be updated',
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
                  description: 'Name of the category',
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
      tags: ['Category'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete an existing category',
      description: 'This endpoint delete an existing category',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the catory to be deleted',
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
  Category: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Unique identifier for the product',
      },
      name: {
        type: 'string',
        description: 'Name of the category',
      },
    },
  },
};
