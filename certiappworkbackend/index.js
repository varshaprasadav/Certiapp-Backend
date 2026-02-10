import express,{json} from "express"
import dotenv from "dotenv"
import {router} from "./route/adminrouter.js"
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
dotenv.config();

const app=express();
app.use(json())

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/user",router);

const mongodbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/Certiapp"
mongoose.connect(mongodbURI).then(() => {
    console.log("MongoDB connected")
}).catch((err) => {
    console.log("MongoDB connection error:", err)
})


app.listen(process.env.PORT,() =>{ 
    console.log(`Server is running at ${process.env.PORT}`);
});
