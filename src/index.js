const express = require('express');
require('express-async-errors');
require('dotenv').config();

const passport = require('passport');
require('./config/passport')(passport);

const app = express();
const logger = require('./config/logger');

app.use(passport.initialize());

app.use(express.json());

app.use('/user', require('./routes/users'));
app.use('/profiles', require('./routes/profiles'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
})

app.use(require('./middlewares/errorHandler'));

const db = require('./models');
db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
  })
})