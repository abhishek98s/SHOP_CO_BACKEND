import { errorSchema } from './error.schema';export const docs = {
  '/image': {
    post: {
      tags: ['Image'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new image',
      description: 'This endpoint create a new image',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                shop_co_image: {
                  type: 'string',
                  format: 'binary',
                  description: 'File to upload (e.g., product image)',
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
  '/image/{id}': {
    get: {
      tags: ['Image'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Retrive a url of image',
      description: 'This endpoint retrive url of a image by id',
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
                      $ref: '#/components/schemas/Image',
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
      },
    },
    patch: {
      tags: ['Image'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update an existing image',
      description: 'This endpoint update an existing image',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the image to retrive',
          schema: {
            type: 'integer',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                shop_co_image: {
                  type: 'string',
                  format: 'binary',
                  description: 'File to upload (e.g., product image)',
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
      tags: ['Image'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete an existing image',
      description: 'This endpoint delete an existing image',
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
  Image: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Unique identifier for the product',
      },
      name: {
        type: 'string',
        description: 'Name of the image',
      },
    },
  },
};
