const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000 || process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server started");
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
