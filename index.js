import cors from 'cors';
import express from 'express';
import * as priceCafe from './routers/token.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use('/token', priceCafe.default);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
