import express from "express";

import {askQuestion, getConversations, searchConversations} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/",askQuestion);

router.get("/history",getConversations);

router.get("/search",searchConversations);

export default router;