const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin:  "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"]
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", require("./controllers"));

app.listen(4000, () => console.log("Apps listening on port 4000"));