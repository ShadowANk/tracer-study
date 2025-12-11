import { GoogleGenAI, Type } from "@google/genai";
import { Alumni, AIAnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize client
const ai = new GoogleGenAI({ apiKey });

export const analyzeTracerData = async (data: Alumni[]): Promise<AIAnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your configuration.");
  }

  // Optimize payload size by sending only relevant fields for analysis
  const simplifiedData = data.map(d => ({
    status: d.status,
    title: d.jobTitle,
    relevance: d.relevance,
    feedback: d.feedback,
    gradYear: d.graduationYear,
    salary: d.salary
  }));

  const prompt = `
    You are a Senior University Data Analyst. Analyze the following Tracer Study (Alumni) data.
    Provide a strategic report containing:
    1. An executive summary of the employment landscape.
    2. Specific recommendations for curriculum improvement based on job titles and feedback.
    3. Trending skills or job roles inferred from the data.
    4. Identification of any gaps in the current curriculum (what are alumni complaining about or lacking?).

    Data: ${JSON.stringify(simplifiedData)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            trendingSkills: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            curriculumGaps: { type: Type.STRING }
          },
          required: ["summary", "recommendations", "trendingSkills", "curriculumGaps"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");
    
    return JSON.parse(resultText) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      summary: "Failed to generate analysis. Please try again.",
      recommendations: ["Ensure your API Key is valid."],
      trendingSkills: [],
      curriculumGaps: "N/A"
    };
  }
};
