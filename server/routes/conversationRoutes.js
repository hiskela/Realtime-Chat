import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createConversation, getConversations } from "../controllers/conversationController.js";

const router = express.Router();

router.get("/", protect, getConversations);
router.post("/", protect, createConversation);

export default router;