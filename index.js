const express = require("express");
const applyMiddleware = require("./src/middleWares/applyMiddlewares");
const { connectDatabase } = require("./src/database/connectDatabase");
require("dotenv").config();

const app = express();
const port = 5000 || process.env.PORT;

const authenticationRoutes = require("./src/routes/authentication/index");
const categoryRoutes = require("./src/routes/categories/index");
const jobRoutes = require("./src/routes/jobs/index");
const bidRoutes = require("./src/routes/bids/index");
const popularityRoutes = require("./src/routes/popularity/index");
const reviewsRoutes = require("./src/routes/reviews/index");

const globalErrorHandler = require("./src/middleWares/globalErrorHandler");

applyMiddleware(app);

app.use(authenticationRoutes);
app.use(categoryRoutes);
app.use(jobRoutes);
app.use(bidRoutes);
app.use(popularityRoutes);
app.use(reviewsRoutes);

app.get("/", (req, res) => {
  res.send("server started");
});

app.all("*", (req, res, next) => {
  const err = new Error(`requested url [${req.url}] is invalid`);
  err.status = 404;
  next(err);
});

app.use(globalErrorHandler);

const main = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
};

main();
