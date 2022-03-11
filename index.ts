import express, {
  Request,
  Response,
  NextFunction
} from 'express';

function loggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(
    `${request.method} ${request.path}`
  );
  next();
}

const app = express();

app.use(loggerMiddleware);

const sleep = (ms: number) =>
  new Promise((r) => setTimeout(r, ms));

app.get(
  '/hello',
  async (
    request: Request,
    response: Response
  ) => {
    console.log('asd');
    await sleep(5000);
    response.send(
      'abcdefgihjklmnopqrstuvwxyz'
    );
  }
);
console.log('a');
app.listen(5020);
console.log('b');