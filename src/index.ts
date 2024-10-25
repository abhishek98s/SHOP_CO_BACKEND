import express from 'express';
import cors from 'cors';
import pathToSwaggerUi from 'swagger-ui-dist';

import { config } from './config/config';
import { swagger } from './swagger/swagger';
import userRoutes from './entities/user/user.routes';
import authRoutes from './auth/auth.routes';
import bodyParser from 'body-parser';

const app = express();
const port = config.app.port;
const name = config.app.name;
app.use(cors());

import notFoundHandler from './middleware/notFoundHandler';
import errorHandler from './middleware/errorhandler';

app.use(express.static(pathToSwaggerUi.absolutePath()));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

swagger(app);

app.get('/', (request, response) => {
  response.send('Hello world');
});

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`${name} started at http://localhost:${port}`);
});

export default app;
