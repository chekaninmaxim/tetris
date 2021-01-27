import express from "express";
import path from "path";
import mongodb from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import users from './routes/users.js';
import auth from "./routes/auth.js";

const app = express();

dotenv.config({
  path: path.join(__dirname, ".env")
});
// const isDev = app.get("env") === "development";
// console.log(process.env);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 4000;
const mongoUrl = `${process.env.DB_CONNECTION}`;

mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db(process.env.DB_NAME);
    console.log('connected to db');
    app.set("db", db);

    app.listen(port, () => console.log(`Running on localhost:${port}`));
  })
  .catch(err => console.log("Error connect"));
// app.listen(port, () => console.log(`Running on localhost:${port}`))