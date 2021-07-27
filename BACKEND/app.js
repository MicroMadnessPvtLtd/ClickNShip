const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;

app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

const productsRoutes = require('./routers/products');
const categoriesRoutes = require('./routers/categories');
const ordersRoutes = require('./routers/orders');
const usersRoutes = require('./routers/users');
const authenticationRoutes = require('./routers/authentication');


/* Routers */
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/authenticate`, authenticationRoutes);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: process.env.DB_NAME
}).then(() => {
    console.log('Database connection established');
}).catch((err) => {
    console.log(err);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running now on port 3000');
})