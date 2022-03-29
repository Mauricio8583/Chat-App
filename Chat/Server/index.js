const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const authRoutes = require("./routes/auth.js");

const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/auth", authRoutes); // Call the autentication route

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});