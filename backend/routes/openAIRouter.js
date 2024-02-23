const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const openAIController = require("../controllers/openAIController");
const checkApiRquestLimit = require("../middlewares/checkApiRequestLimit");

const openAIRouter = express.Router();

openAIRouter.post(
  "/generate-content",
  isAuthenticated,
  checkApiRquestLimit,
  openAIController
);

module.exports = openAIRouter;
