// api/chat.ts
import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: 'edge', // Fast execution close to the user
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { prompt } = await req.json();
    const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return new Response(JSON.stringify({ text: response.text() }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch AI response" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
