const express = require("express");

const { getCategoriesFromDB } = require("../../api/categories");

const router = express.Router();

router.get("/categories", getCategoriesFromDB);

module.exports = router;
