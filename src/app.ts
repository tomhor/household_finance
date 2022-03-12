import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import { logger } from './utils/logger';

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (request: Request, response: Response) => response.send('App is working'));

app.use('/', routes);

app.listen(PORT, () => logger.info(`server is listening on port ${PORT}`));

module.exports = {
  app
};
