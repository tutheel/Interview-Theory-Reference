import app from './app.js';
import { connectDb } from './db/mongo.js';

const PORT = Number(process.env.PORT) || 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`PlayGround API running on http://localhost:${PORT}`);
  });
});
