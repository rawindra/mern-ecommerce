import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';
import cookieParser from 'cookie-parser';
import { Client } from '@elastic/elasticsearch';

import ErrorMiddleware from "./middleware/error.middleware";

import BrandRoutes from "./routes/brand.routes";
import CategoryRoutes from "./routes/category.routes";
import AttributeRoutes from "./routes/attribute.routes";
import ProductRoutes from "./routes/product.routes";
import AttributeOptionRoutes from "./routes/attributeOption.routes";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import FilterRoutes from "./routes/filter.routes";

const app = express();
const port = Number(process.env.PORT) || 8000;
const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`)
  .then(() => console.log("Db connection established"))
  .catch((err) => console.log(err));

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'elastic'
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.use((req, res, next) => {
  req.elasticClient = client;
  next();
});


app.use('/uploads', express.static('uploads'))
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/brands', BrandRoutes);
app.use('/api/v1/categories', CategoryRoutes);
app.use('/api/v1/attributes', AttributeRoutes);
app.use('/api/v1/attribute-options', AttributeOptionRoutes);
app.use('/api/v1/products', ProductRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1', FilterRoutes);

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`App listening on the port ${port}`);
});