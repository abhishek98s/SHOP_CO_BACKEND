
import express from 'express';import cors from 'cors';
import 'express-async-errors';
import pathToSwaggerUi from 'swagger-ui-dist';
import bodyParser from 'body-parser';

import { config } from './config/config';
import { swagger } from './swagger/swagger';

import notFoundHandler from './middleware/notFoundHandler';
import customErrorHandler from './middleware/errorHandler';

import authRoutes from './auth/auth.routes';
import categoryRoutes from './entities/category/category.routes';
import imageRoutes from './entities/image/image.routes';
import productRoutes from './entities/product/product.routes';
import productSizeRoutes from './entities/product_size/product_size.route';
import reviewRoutes from './entities/review/review.route';
import sizeRoutes from './entities/size/size.routes';
import styleRoutes from './entities/style/style.routes';
import typeRoutes from './entities/type/type.routes';
import userRoutes from './entities/user/user.routes';

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
app.use('/api/category', categoryRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/product', productRoutes);
app.use('/api/productSize', productSizeRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/size', sizeRoutes);
app.use('/api/style', styleRoutes);
app.use('/api/type', typeRoutes);
app.use('/api/user', userRoutes);

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
