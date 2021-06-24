import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import uploadRoute from './routes/route.js';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.js";
//dotenv configuration
dotenv.config()

const app = express()
const port = process.env.API_PORT || 3000
//For API Documention from Swagger
app.use('/images', express.static('images'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json({ limit: '50mb' }));
app.use("/", cors(), uploadRoute);

app.listen(port, () => {
    console.log(`Server is running ${port}`);
});
//Export App.js file
export default app;