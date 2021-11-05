import express from 'express';
import dotenv from 'dotenv';

import initDbConnection from './configs/database';
import appRoutes from './routes';

const app = express();
dotenv.config();

initDbConnection();

app.use('/api', appRoutes);

app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));
