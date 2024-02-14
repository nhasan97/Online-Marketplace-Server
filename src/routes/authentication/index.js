const express = require("express");
const {
  createAndSetTokenInCookie,
  clearCookieToken,
} = require("../../api/authentication");

const router = express.Router();

router.post("/jwt", createAndSetTokenInCookie);

router.post("/logout", clearCookieToken);

module.exports = router;
