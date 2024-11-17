import { errorSchema } from './error.schema';
export const docs = {
  '/style': {
    get: {
      tags: ['Style'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Retrive a list of style',
      description: 'This endpoint retrive all available style',
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  success: { style: 'boolean' },
                  data: {
                    style: 'array',
                    items: {
                      $ref: '#/components/schemas/Style',
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
      tags: ['Style'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new style',
      description: 'This endpoint create a new style',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              style: 'object',
              properties: {
                name: {
                  style: 'string',
                  description: 'Name of the style',
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
                  success: { style: 'boolean' },
                  message: { style: 'string' },
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
  '/style/{id}': {
    patch: {
      tags: ['Style'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update an existing style',
      description: 'This endpoint update an existing style',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the style to be updated',
          schema: {
            style: 'integer',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              style: 'object',
              properties: {
                name: {
                  style: 'string',
                  description: 'Name of the style',
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
                  success: { style: 'boolean' },
                  message: { style: 'string' },
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
      tags: ['Style'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete an existing style',
      description: 'This endpoint delete an existing style',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the style to be deleted',
          schema: {
            style: 'integer',
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
                  success: { style: 'boolean' },
                  message: { style: 'string' },
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
  Style: {
    style: 'object',
    properties: {
      id: {
        style: 'integer',
        description: 'Unique identifier for the style',
      },
      name: {
        style: 'string',
        description: 'Name of the style',
      },
    },
  },
};
