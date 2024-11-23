import express from 'express';import swaggerUi from 'swagger-ui-express';import { OAS3Definition } from 'swagger-jsdoc';

import * as auth_docs from './auth.docs';
import * as category_docs from './category.docs';
import * as image_docs from './image.docs';
import * as product_docs from './product.docs';
import * as size_docs from './size.docs';
import * as style_docs from './style.docs';
import * as type_docs from './type.docs';
import * as review_docs from './review.docs';
import * as user_docs from './user.docs';

export const swaggerConfig: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'SHOP_CO_BACKEND',
    version: '1.0.0',
    description: 'Documentation for shop co ecommerce site',
  },
  servers: [
    {
      url: 'https://shop-co-backend-nine.vercel.app/api',
      description: 'Production development server',
    },
  ],
  paths: {
    ...auth_docs.docs,
    ...category_docs.docs,
    // ...image_docs.docs,
    ...product_docs.docs,

    // ...size_docs.docs,
    // ...type_docs.docs,
    // ...style_docs.docs,
    ...review_docs.docs,

    ...user_docs.docs,
  },
  components: {
    ...auth_docs.schema,
    schemas: {
      ...category_docs.schema,
      // ...image_docs.schema,
      ...product_docs.schema,

      // ...size_docs.schema,
      // ...type_docs.schema,
      // ...style_docs.schema,
      ...review_docs.schema,

      ...user_docs.schema,
    },
  },
};

const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css';

export const swagger = function (app: express.Application) {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerConfig, {
      customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
      customCssUrl: CSS_URL,
    }),
  );
};
