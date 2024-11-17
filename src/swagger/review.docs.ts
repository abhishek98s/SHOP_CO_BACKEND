import { errorSchema } from './error.schema';export const docs = {
  '/review': {
    get: {
      tags: ['Review'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Retrive a list of reviews',
      description: 'This endpoint retrive all available review',
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
                      $ref: '#/components/schemas/Review',
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
      tags: ['Review'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new review of a product',
      description: 'This endpoint create a new review for a product',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                rating: {
                  type: 'float',
                  description: 'Raring for the product',
                },
                comment: {
                  type: 'string',
                  description: 'Comment of a product',
                },
                product_id: {
                  type: 'number',
                  description: 'Id of a product',
                },
                user_id: {
                  type: 'string',
                  description: 'User Id of a user',
                },
              },
              required: ['rating', 'comment', 'product_id', 'user_id'],
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
      },
    },
  },
  '/review/{id}': {
    get: {
      tags: ['Review'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Retrive a list of reviews',
      description: 'This endpoint retrive all available review',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the review to be retrive',
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
                  data: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Review',
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
        '404': {
          ...errorSchema.NOT_FOUND,
        },
      },
    },
    patch: {
      tags: ['Review'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update an existing review',
      description: 'This endpoint update an existing review',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the review to be updated',
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
                rating: {
                  type: 'float',
                  description: 'Raring for the product',
                },
                comment: {
                  type: 'string',
                  description: 'Comment of a product',
                },
                product_id: {
                  type: 'number',
                  description: 'Id of a product',
                },
                user_id: {
                  type: 'string',
                  description: 'User Id of a user',
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
      tags: ['Review'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete an existing review',
      description: 'This endpoint delete an existing review',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the review to be deleted',
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
  Review: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Unique identifier for the review',
      },
      rating: {
        type: 'float',
        description: 'Raring for the product',
      },
      comment: {
        type: 'string',
        description: 'Comment of a product',
      },
      product_id: {
        type: 'number',
        description: 'Id of a product',
      },
      user_id: {
        type: 'string',
        description: 'User Id of a user',
      },
    },
  },
};
