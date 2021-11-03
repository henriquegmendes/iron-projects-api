import express from 'express';

const app = express();

app.get('/api', (req, res) => res.json({ message: 'TCHAUU!!!!! :-)' }));

app.listen(5000, () => console.log('App running on PORT 5000'));
