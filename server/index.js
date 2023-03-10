import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// import User from './models/User.js';
// import Product from './models/Product.js';
// import Transaction from './models/Transaction.js';
// import ProductStat from './models/ProductStat.js';
// import OverallStat from './models/OverallStat.js';
// import AffiliateStat from './models/AffiliateStat.js';
// import{ 
//     dataUser, 
//     dataProduct, 
//     dataProductStat, 
//     dataTransaction,
//     dataOverallStat,
//     dataAffiliateStat,
// } from './data/index.js';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9001;
const hostName = "localhost";

mongoose.set('strictQuery', true); // to prevent deprecation warning
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {

    /* ADD DATA ONE TIME */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // Transaction.insertMany(dataTransaction);
    // ProductStat.insertMany(dataProductStat);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);

    app.listen(PORT, hostName, () => console.log(`Server is listening on port ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));