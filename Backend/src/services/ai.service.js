import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const generateAIResponse = async (question) => {
  try {
    const completion = await client.chat.completions.create({
      model: "google/gemma-4-31b-it:free",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI FAQ assistant.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error?.response?.data || error.message
    );

    throw new Error(
      error?.response?.data?.error?.message ||
      error.message ||
      "AI response generation failed"
    );
  }
};