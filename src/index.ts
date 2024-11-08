import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import pathToSwaggerUi from 'swagger-ui-dist';
import bodyParser from 'body-parser';
import bodyParser from 'body-parser';

import { config } from './config/config';
import { swagger } from './swagger/swagger';

import notFoundHandler from './middleware/notFoundHandler';
import userRoutes from './entities/user/user.routes';


import reviewRoutes from './entities/review/review.route';
import categoryRoutes from './entities/category/category.routes';
import authRoutes from './auth/auth.routes';
import sizeRoutes from './entities/size/size.routes';
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
app.use('/api/review', reviewRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/size', sizeRoutes);


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
