import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeCompanyWithGemini = async (company: string, role: string) => {
  // Try to get key from environment or window state (set by the UI)
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || (window as any).GEMINI_API_KEY || "";

  if (!API_KEY) {
    throw new Error("Gemini API Key not found. Please provide an API key in the input box above.");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);

  // Using 'gemini-pro' which is the most widely compatible model name
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Analyze the company "${company}" for the role of "${role}".
    Provide a detailed professional analysis in JSON format with the following structure:
    {
      "data": {
        "company_profile": {
          "company_category": "string",
          "engineering_culture": "string",
          "industry": "string",
          "organization_scale": "string"
        },
        "role_profile": {
          "role_summary": "string",
          "key_responsibilities": ["string"]
        },
        "required_skills": {
          "core_skills": ["string"],
          "supporting_skills": ["string"],
          "bonus_skills": ["string"]
        },
        "programming_languages": {
          "primary_languages": ["string"],
          "secondary_languages": ["string"]
        },
        "tools_and_technologies": [
          {
            "tool": "string",
            "expected_level": "string"
          }
        ],
        "preparation_guidance": {
          "focus_areas": ["string"],
          "common_mistakes": ["string"],
          "what_distinguishes_strong_candidates": ["string"]
        }
      }
    }

    ONLY return the JSON. No markdown formatting or extra text.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Robust JSON parsing (handles markdown blocks if AI generates them)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
