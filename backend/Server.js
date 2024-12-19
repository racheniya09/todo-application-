const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/ToDoRoute');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT 
app.use(cors());
app.use(express.json())

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected To MongoDB...'))
    .catch((err) => console.log(err))

app.use(routes);


app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
