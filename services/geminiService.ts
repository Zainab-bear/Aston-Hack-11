
import { GoogleGenAI, Type } from "@google/genai";

export async function getImpactEstimation(description: string): Promise<number> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Estimate the environmental and community impact for this local community initiative: "${description}". 
      Respond with a single number representing estimated kg of CO2 saved or social benefit points (1-50).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            impactScore: {
              type: Type.NUMBER,
              description: "A number representing the estimated impact from 1 to 50"
            },
            reasoning: {
              type: Type.STRING,
              description: "Short one sentence reasoning"
            }
          },
          required: ["impactScore"]
        }
      }
    });

    const result = JSON.parse(response.text || '{"impactScore": 5}');
    return result.impactScore;
  } catch (error) {
    console.error("Gemini Error:", error);
    return 5;
  }
}
