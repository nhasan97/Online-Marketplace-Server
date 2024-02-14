const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  LOCAL_CLIENT,
  PRODUCTION_CLIENT_ONE,
  PRODUCTION_CLIENT_TWO,
} = require("../configuration/default");

const applyMiddleware = (app) => {
  app.use(
    cors({
      origin: [LOCAL_CLIENT, PRODUCTION_CLIENT_ONE, PRODUCTION_CLIENT_TWO],
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(cookieParser());
};

module.exports = applyMiddleware;
