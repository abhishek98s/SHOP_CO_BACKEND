import express from 'express';import cors from 'cors';
import pathToSwaggerUi from 'swagger-ui-dist';
import bodyParser from 'body-parser';

import { config } from './config/config';
import { swagger } from './swagger/swagger';

import notFoundHandler from './middleware/notFoundHandler';
import userRoutes from './entities/user/user.routes';

import productRoutes from './entities/product/product.routes';
import authRoutes from './auth/auth.routes';
import customErrorHandler from './middleware/errorHandler';

const app = express();
const port = config.app.port;
const name = config.app.name;
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(pathToSwaggerUi.absolutePath()));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

swagger(app);

app.get('/', (request, response) => {
  response.send('Hello world');
});

app.use(customErrorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`${name} started at http://localhost:${port}`);
});

export default app;
