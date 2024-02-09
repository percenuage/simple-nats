import express from 'express';
import morgan from 'morgan';

const app = express();

app.set('trust proxy', true);
app.use(morgan('dev'));

app.get('/', (req, res) => res.sendStatus(200));

app.get('/env', (req, res) => res.json({ env: process.env }));

export const start = async () => {
  const { PORT } = process.env;
  return app.listen(PORT, () => console.info(`App listening on ${PORT}`));
}


