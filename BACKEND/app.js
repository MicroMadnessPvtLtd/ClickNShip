const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;

app.use(express.json());
app.use(morgan('tiny'));

const productsRoutes = require('./routers/products');
const categoriesRoutes = require('./routers/categories');
const ordersRoutes = require('./routers/orders');
const usersRoutes = require('./routers/users');


/* Routers */
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/users`, usersRoutes);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'CnSDev0'
}).then(() => {
    console.log('Database connection established');
}).catch((err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log('Server is running now on port 3000');
})