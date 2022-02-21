import express from 'express';
// import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Router from './routes/route.js';
import dotEnv from 'dotenv'
import path from 'path'

// const { Server } = require("socket.io");
// const io = new Server(server);

const app = express();

// -----deploy-----
const __dirname=path.resolve()
console.log(__dirname)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/user/build")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running..");
    });
  }
// --deploy----

dotEnv.config()
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);




const PORT=5000
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
Connection()