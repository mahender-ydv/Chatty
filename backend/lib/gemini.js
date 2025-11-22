// // utils/gemini.js
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // We’ll use a lightweight model for real-time chat
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// export async function getAIResponse(prompt) {
//   try {
//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (err) {
//     console.error("Gemini error:", err);
//     return "⚠️ Sorry, I couldn’t process that.";
//   }
// }



// backend/lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getAIResponse(prompt) {
  try {
    // Use the latest available model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
