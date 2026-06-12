import mongoose from "mongoose";

const conversationSchema =new mongoose.Schema(
    {
      question: {
        type: String,
        required: true
      },

      answer: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true
    }
  );

const Conversation =mongoose.model("Conversation",conversationSchema);

export default Conversation;