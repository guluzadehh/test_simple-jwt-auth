const express = require('app');
require('express-async-errors');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // log
})