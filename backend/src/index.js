require('dotenv').config();
require('./services/articleJob');
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const articlesRouter = require('./routes/articles');
const cors = require('cors');

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(express.json());
app.use('/articles', articlesRouter);

console.log(process.env.HUGGINGFACE_API_KEY);

// Importa rotas
sequelize.sync().then(() => {
  console.log('✅ Database synced (tables created if not exist)');
  app.listen(process.env.PORT || 8080, () => {
    console.log('✅ Backend running on 8080');
  });
}).catch(console.error);
