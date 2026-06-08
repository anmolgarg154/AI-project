import express from "express";
import cors from "cors";

import chatRoutes
from "./routes/chat.routes.js";

import errorHandler
from "./middleware/error.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/chat",
  chatRoutes
);

app.use(errorHandler);

export default app;