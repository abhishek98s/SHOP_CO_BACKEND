import { errorSchema } from './error.schema';
export const docs = {
  '/user': {
    post: {
      tags: ['User'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new user',
      requestBody: {
        description: 'User data',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
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
                  status: { type: 'boolean' },
                  message: { type: 'string' },
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
          '409': {
            ...errorSchema.CONFLICT,
          },
          '413': {
            ...errorSchema.BAD_REQUEST,
          },
        },
      },
    },
  },
  '/user/{id}': {
    get: {
      tags: ['User'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Get a user by ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'User ID',
          required: true,
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
                  status: { type: 'boolean' },
                  data: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                      },
                      username: {
                        type: 'string',
                      },
                      email: {
                        type: 'string',
                      },
                      image_id: {
                        type: 'integer',
                      },
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
      tags: ['User'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'User ID',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      summary: 'Update a username and password by user ID',
      requestBody: {
        description: 'User data',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
                password: {
                  type: 'string',
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
                  status: { type: 'boolean' },
                  data: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                      },
                      username: {
                        type: 'string',
                      },
                      email: {
                        type: 'string',
                      },
                      image_id: {
                        type: 'integer',
                      },
                    },
                  },
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
        '413': {
          ...errorSchema.PAYLOAD_TOO_LARGE,
        },
      },
    },
    delete: {
      tags: ['User'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete a user by ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'User ID',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Deleted User Successfully',
          content: {
            'application/json': {
              schema: {
                properties: {
                  status: { type: 'boolean' },
                  data: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                      },
                      username: {
                        type: 'string',
                      },
                      email: {
                        type: 'string',
                      },
                      image_id: {
                        type: 'integer',
                      },
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
        '413': {
          ...errorSchema.PAYLOAD_TOO_LARGE,
        },
      },
    },
  },
};

export const schema = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        readOnly: true,
      },
      username: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      image_id: {
        type: 'integer',
      },
      role: {
        type: 'string',
        readOnly: true,
      },
      updated_by: {
        type: 'string',
        readOnly: true,
      },
      created_by: {
        type: 'string',
        readOnly: true,
      },
    },
    required: ['username', 'email', 'password'],
    example: {
      username: 'Examp',
      email: 'example@gmail.com',
      password: 'Example123!',
    },
  },
};
