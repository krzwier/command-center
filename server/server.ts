import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/Router.js';

const PORT = process.env.PORT || 4001;

const app = module.exports = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

const internalServerErrorHandler: ErrorRequestHandler = (err, req, res, next) => res.status(500).send(`Server error: ${err.stack}`);

app.use(internalServerErrorHandler);

app.use((req, res, next) => res.status(404).send('Not found'));

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));