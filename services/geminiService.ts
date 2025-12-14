import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateResumeSummary = async (jobTitle: string, skills: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Please configure your environment.";

  try {
    const prompt = `Write a professional, concise, and ATS-friendly resume professional summary for a ${jobTitle} with expertise in ${skills}. strictly no markdown formatting. Keep it under 50 words.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text?.trim() || '';
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate summary. Please try again.";
  }
};

export const improveDescription = async (text: string): Promise<string> => {
  if (!apiKey) return "API Key missing.";

  try {
    const prompt = `Rewrite the following resume bullet points to be more impactful, action-oriented, and ATS-friendly. Use strong verbs and quantify results where possible. Keep the same format. Text: "${text}". Output only the rewritten text without markdown.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return text;
  }
};