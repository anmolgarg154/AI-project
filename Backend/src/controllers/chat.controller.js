import Conversation from
  "../models/conversation.model.js";

import {
  generateAIResponse
} from "../services/ai.service.js";

export const askQuestion =
  async (req, res, next) => {

    try {
console.log("0")
      const { question } = req.body;
console.log("1")

      if (!question) {
        return res.status(400).json({
          success: false,
          message:
            "Question is required"
        });
      }
console.log("2")

      const answer =
        await generateAIResponse(
          question
        );
console.log("3")

      const conversation =
        await Conversation.create({
          question,
          answer
        });

      res.status(200).json({
        success: true,
        data: conversation
      });

    } catch (error) {
      next(error);
    }
  };

export const getConversations =
  async (req, res, next) => {

    try {

      const conversations =
        await Conversation.find()
          .sort({
            createdAt: -1
          });

      res.status(200).json({
        success: true,
        count:
          conversations.length,
        data: conversations
      });

    } catch (error) {
      next(error);
    }
  };

export const searchConversations =
  async (req, res, next) => {

    try {

      const { q } = req.query;

      const conversations =
        await Conversation.find({
          question: {
            $regex: q,
            $options: "i"
          }
        });

      res.status(200).json({
        success: true,
        data: conversations
      });

    } catch (error) {
      next(error);
    }
  };