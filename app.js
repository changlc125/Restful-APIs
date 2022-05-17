const express = require('express');
// npm i morgan
const morgan = require('morgan');
//npm i cors
const cors = require('cors');
// load index.js by default if you dont specify any xxx.js
const router = require('./router');
const errorHandler = require('./middleware/error-handler');
require('./model');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/api', router);

app.use(errorHandler());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
