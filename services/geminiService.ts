import { GoogleGenAI } from "@google/genai";
import { MOCK_CATS } from "../constants";

let aiClient: GoogleGenAI | null = null;

// Initialize securely with environment variable
if (process.env.API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const getChatResponse = async (userMessage: string, chatHistory: { role: string; text: string }[]) => {
  if (!aiClient) {
    return "I'm sorry, my brain is currently offline (API Key missing). Please try again later!";
  }

  try {
    // Construct a context-aware prompt
    const inventoryContext = JSON.stringify(MOCK_CATS.map(c => ({
        name: c.name,
        breed: c.breed,
        personality: c.personality,
        age: c.age,
        price: c.price,
        description: c.description
    })));

    const systemInstruction = `You are "PurrBot", the AI assistant for Sonu's Cat Pet Shop. 
    Your goal is to help users find the perfect cat from our inventory.
    
    Here is our current inventory in JSON format:
    ${inventoryContext}
    
    Rules:
    1. Be enthusiastic, polite, and use cat puns occasionally.
    2. Only recommend cats from the inventory provided.
    3. If the user asks for something we don't have, politely suggest the closest match.
    4. Keep responses concise (under 100 words) unless asked for details.
    5. Formatting: Use bullet points for lists.
    `;

    const model = 'gemini-2.5-flash';
    
    // Construct the history for the API
    // We only take the last few turns to save context window if needed, but for text it's usually fine
    const contents = [
      ...chatHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ];

    const response = await aiClient.models.generateContent({
      model: model,
      contents: contents, // Correct parameter for chat history in generateContent
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Purr... I'm thinking, but I got distracted by a laser pointer. Try again?";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! I seem to have coughed up a hairball (technical error). Please try again.";
  }
};
