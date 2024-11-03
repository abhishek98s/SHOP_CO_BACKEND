import { swaggerExceptionMessages } from './constant/swaggerExceptionMessages';export const docs = {
  '/product/new_arrival': {
    get: {
      tags: ['Product'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Retrieve a list of new arrival products',
      description:
        'This endpoint retrieves all available new arrival products.',
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
                      $ref: '#/components/schemas/ProductResponse',
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: swaggerExceptionMessages[401],
        },
        '500': {
          description: swaggerExceptionMessages[500],
        },
      },
    },
  },
  '/product/top_selling': {
    get: {
      tags: ['Product'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Retrieve a list of top selling products',
      description:
        'This endpoint retrieves all available top selling products.',
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
                      $ref: '#/components/schemas/ProductResponse',
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: swaggerExceptionMessages[401],
        },
        '500': {
          description: swaggerExceptionMessages[500],
        },
      },
    },
  },
  '/product': {
    post: {
      tags: ['Product'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Create a new product',
      description: 'This endpoint create a new product.',
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      description: 'Name of the product',
                    },
                    description: {
                      type: 'string',
                      description: 'Description of the product',
                    },
                    rating: {
                      type: 'number',
                      format: 'float',
                      description: 'Rating of the product',
                    },
                    price: {
                      type: 'number',
                      format: 'float',
                      description: 'Price of the product',
                    },
                    stock_quantity: {
                      type: 'integer',
                      description: 'Quantity of the product in stock',
                    },
                    discount: {
                      type: 'number',
                      format: 'float',
                      description: 'Discount percentage on the product',
                    },
                    discounted_price: {
                      type: 'number',
                      format: 'float',
                      description: 'Price after discount',
                    },
                    category: {
                      type: 'string',
                      enum: ['top_selling', 'new_arrival'],
                      description: 'Category of the product',
                    },
                    style: {
                      type: 'string',
                      enum: ['casual', 'formal', 'party', 'gym'],
                      description: 'Style of the product',
                    },
                    type: {
                      type: 'string',
                      enum: ['t-shirts', 'shorts', 'shirts', 'hoodie'],
                      description: 'Type of the product',
                    },
                    shop_co_image: {
                      type: 'string',
                      format: 'binary',
                      description: 'File to upload (e.g., product image)',
                    },
                  },
                },
              },
              required: [
                'name',
                'description',
                'rating',
                'price',
                'stock_quantity',
                'discount',
                'discounted_price',
                'category',
                'style',
                'type',
                'shop_co_image',
              ],
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Created Successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  sucess: { type: 'boolean' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '404': {
          description: 'Product not found',
        },
        '500': {
          description: 'Internal server error',
        },
      },
    },
  },
  '/product/{id}': {
    get: {
      tags: ['Product'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Retrieve a product by ID',
      description:
        'This endpoint retrieves a product using its unique identifier.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the product',
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
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        },
        '404': {
          description: 'Product not found',
        },
        '500': {
          description: 'Internal server error',
        },
      },
    },
    patch: {
      tags: ['Product'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update a product by ID',
      description:
        'This endpoint update a product using its unique identifier.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the product',
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
                name: {
                  type: 'string',
                  description: 'Name of the product',
                },
                description: {
                  type: 'string',
                  description: 'Description of the product',
                },
                rating: {
                  type: 'number',
                  format: 'float',
                  description: 'Rating of the product',
                },
                price: {
                  type: 'number',
                  format: 'float',
                  description: 'Price of the product',
                },
                stock_quantity: {
                  type: 'integer',
                  description: 'Quantity of the product in stock',
                },
                discount: {
                  type: 'number',
                  format: 'float',
                  description: 'Discount percentage on the product',
                },
                discounted_price: {
                  type: 'number',
                  format: 'float',
                  description: 'Price after discount',
                },
                category: {
                  type: 'string',
                  enum: ['top_selling', 'new_arrival'],
                  description: 'Category of the product',
                },
                style: {
                  type: 'string',
                  enum: ['casual', 'formal', 'party', 'gym'],
                  description: 'Style of the product',
                },
                type: {
                  type: 'string',
                  enum: ['t-shirts', 'shorts', 'shirts', 'hoodie'],
                  description: 'Type of the product',
                },
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
          description: 'Updated Successfully',
          content: {
            'application/json': {
              schema: {
                properties: {
                  success: { type: 'boolean' },
                  data: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        },
        '404': {
          description: 'Product not found',
        },
        '500': {
          description: 'Internal server error',
        },
      },
    },
    delete: {
      tags: ['Product'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete a product by ID',
      description:
        'This endpoint deletes a product using its unique identifier.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Unique identifier of the product to be deleted',
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Successful deletion',
          content: {
            'application/json': {
              schema: {
                properties: {
                  success: {
                    type: 'boolean',
                    description:
                      'Indicates whether the deletion was successful',
                  },
                  message: {
                    type: 'string',
                    description:
                      'A message providing additional information about the deletion',
                  },
                },
              },
            },
          },
        },
        '404': {
          description: 'Product not found',
        },
        '500': {
          description: 'Internal server error',
        },
      },
    },
  },
};

export const schema = {
  Product: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Unique identifier for the product',
      },
      name: {
        type: 'string',
        description: 'Name of the product',
      },
      description: {
        type: 'string',
        description: 'Description of the product',
      },
      rating: {
        type: 'number',
        format: 'float',
        description: 'Rating of the product',
      },
      price: {
        type: 'number',
        format: 'float',
        description: 'Price of the product',
      },
      discount: {
        type: 'number',
        format: 'float',
        description: 'Discount of the product',
      },
      discounted_price: {
        type: 'number',
        format: 'float',
        description: 'Discounted price of the product',
      },
      image_url: {
        type: 'string',
        description: 'Image url of the product',
      },
      stock_quantity: {
        type: 'number',
        description: 'Stock quantity of the product',
      },
      style_name: {
        type: 'string',
        description: 'Style name of the product',
      },
    },
  },
  ProductResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'Unique identifier for the product',
      },
      name: {
        type: 'string',
        description: 'Name of the product',
      },
      rating: {
        type: 'number',
        format: 'float',
        description: 'Rating of the product',
      },
      price: {
        type: 'number',
        format: 'float',
        description: 'Price of the product',
      },
      discount: {
        type: 'number',
        format: 'float',
        description: 'Discount of the product',
      },
      discounted_price: {
        type: 'number',
        format: 'float',
        description: 'Discounted price of the product',
      },
      image_url: {
        type: 'string',
        description: 'Image url of the product',
      },
    },
  },
};
