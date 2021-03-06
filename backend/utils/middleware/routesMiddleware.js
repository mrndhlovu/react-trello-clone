const path = require("path");
const express = require("express");

const boardRoutes = require("../../routes/board");
const cardRoutes = require("../../routes/cards");
const uploadRoutes = require("../../routes/awsUpload");
const authRoutes = require("../../routes/auth");

const BUILD_DIR = path.join(__dirname, "../../../frontend/build");

const routesConfig = (app) => {
  app.use(express.json());
  app.use("/api/boards", boardRoutes);
  app.use("/api/cards", cardRoutes);
  app.use("/api/upload", uploadRoutes);
  app.use("/api/auth", authRoutes);

  app.use(express.static(BUILD_DIR));
};

module.exports = { routesConfig };
