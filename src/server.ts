import { PORT } from './common/config';
import app from './app';

const start = async () => {
  try {
    await app.listen(PORT);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
