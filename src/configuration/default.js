require("dotenv").config();

const configuration = {
  LOCAL_CLIENT: process.env.LOCAL_CLIENT_URL,
  PRODUCTION_CLIENT_ONE: process.env.PRODUCTION_CLIENT_URL_ONE,
  PRODUCTION_CLIENT_TWO: process.env.PRODUCTION_CLIENT_URL_TWO,
};

module.exports = configuration;
