import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getExpiryAdvice = async (productName: string, category: string, isExpired: boolean): Promise<string> => {
  const client = getClient();
  if (!client) return "Please configure your API Key to get AI advice.";

  const prompt = `
    I have a product: "${productName}" (Category: ${category}).
    It is ${isExpired ? 'currently EXPIRED' : 'expiring soon'}.
    
    Please provide brief, bulleted advice on:
    1. Is it safe to use?
    2. How to properly dispose of it if needed.
    3. Storage tips to prolong life (if not expired).
    
    Keep the tone helpful and concise (max 150 words). Format as Markdown.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No advice available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't fetch advice at this moment. Please check your internet connection.";
  }
};
