import { GoogleGenerativeAI } from "@google/generative-ai";

const robustExecuteGemini = async (
  genAI: GoogleGenerativeAI,
  prompt: string,
  onStatusUpdate?: (status: string) => void
) => {
  const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`[Gemini] Attempting execution with model: ${modelName}`);
      onStatusUpdate?.(`Activating ${modelName.toUpperCase()} Engine...`);

      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Robust JSON parsing (handles markdown blocks if AI generates them)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        text = jsonMatch[0];
      }

      return JSON.parse(text);
    } catch (error: any) {
      console.warn(`[Gemini] Model ${modelName} failed:`, error.message);
      lastError = error;

      // Stop immediately if it's an API key issue
      if (error.message?.includes("API key not valid") || error.message?.includes("invalid API key")) {
        throw new Error("The Gemini API key provided is invalid.");
      }

      // If it's a 404/Not Found, we definitely try the next model
      if (error.message?.includes("404") || error.message?.includes("not found")) {
        onStatusUpdate?.(`Model ${modelName} unavailable. Trying backup...`);
        continue;
      }

      // For other errors (overloaded, etc.), we also try the next model
      onStatusUpdate?.(`Agent ${modelName} busy. Switching to backup agent...`);
      continue;
    }
  }

  throw lastError || new Error("Failed to execute with any available Gemini model.");
};

export const analyzeCompanyWithGemini = async (
  company: string,
  role: string,
  onStatusUpdate?: (status: string) => void
) => {
  const API_KEY = (window as any).GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || "";

  if (!API_KEY) {
    throw new Error("Gemini API Key not found. Please provide an API key in the input box above.");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);

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
          "core_skills": [{ "name": "string", "level": "number (1-4)" }],
          "supporting_skills": [{ "name": "string", "level": "number (1-4)" }],
          "bonus_skills": [{ "name": "string", "level": "number (1-4)" }]
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

    ONLY return the valid JSON object. Do not include any other text or markdown formatting.
    Skill Levels definition: 1 = Beginner/Noob, 2 = Basic/Moderate, 3 = Intermediate/Proficient, 4 = Expert.
  `;

  const result = await robustExecuteGemini(genAI, prompt, onStatusUpdate);
  onStatusUpdate?.("Finalizing strategic analysis...");
  return result;
};

export const evaluateInterviewAnswerWithGemini = async (
  question: string,
  answer: string,
  category: string,
  difficulty: string
) => {
  const API_KEY = (window as any).GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || "";

  if (!API_KEY) {
    throw new Error("Gemini API Key for evaluation not found.");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const prompt = `
    Evaluate this interview answer:
    Category: ${category}
    Difficulty: ${difficulty}
    Question: ${question}
    Candidate Answer: ${answer}

    Provide a professional evaluation in JSON format:
    {
      "score": number (0-10),
      "feedback": "structured multi-line feedback with pros, cons and suggestions for improvement",
      "model_answer": "a concise example of an ideal answer"
    }

    Keep the feedback encouraging but honest. Return ONLY valid JSON.
  `;

  return robustExecuteGemini(genAI, prompt);
};
