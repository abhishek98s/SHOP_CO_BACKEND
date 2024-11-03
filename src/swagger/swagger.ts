import express from 'express';import swaggerUi from 'swagger-ui-express';
import { OAS3Definition } from 'swagger-jsdoc';
import * as user_docs from './user.docs';
import * as auth_docs from './auth.docs';
import * as product_docs from './product.docs';

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
    ...user_docs.docs,
    ...product_docs.docs,
  },
  components: {
    ...auth_docs.schema,
    schemas: {
      ...user_docs.schema,
      ...product_docs.schema,
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
