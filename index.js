const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

//connect to the database
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;


app.use(express.json()); //Used to parse JSON bodies
app.use(cors())

const routes = require('./routes/api');
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});