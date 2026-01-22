export const FREE_MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "google/gemini-2.0-flash-thinking-exp:free",
  "google/gemini-exp-1206:free",
  "google/gemini-flash-1.5-8b:free",
  "google/learnlm-1.5-pro-experimental:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "meta-llama/llama-3.2-1b-instruct:free",
  "meta-llama/llama-3.1-8b-instruct:free",
  "microsoft/phi-3-mini-128k-instruct:free",
  "microsoft/phi-3-medium-128k-instruct:free",
  "qwen/qwen-2-7b-instruct:free",
  "huggingfaceh4/zephyr-7b-beta:free",
  "mistralai/mistral-7b-instruct:free",
  "gryphe/mythomax-l2-13b:free",
  "openchat/openchat-7b:free",
];

const fetchAnalysis = async (company: string, role: string, model: string, apiKey: string) => {
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
          "core_skills": [
            { "name": "string", "level": "number (1-4)" }
          ],
          "supporting_skills": [
            { "name": "string", "level": "number (1-4)" }
          ],
          "bonus_skills": [
            { "name": "string", "level": "number (1-4)" }
          ]
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

  console.log(`Attempting analysis with model: ${model}`); // Debug log

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : '',
      "X-Title": "Skill Matcher Pro",
    },
    body: JSON.stringify({
      "model": model,
      "messages": [{ "role": "user", "content": prompt }],
      "max_tokens": 1500,
      "temperature": 0.3
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `OpenRouter API error: ${response.status}`);
  }

  const result = await response.json();
  let text = result.choices[0]?.message?.content || "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) text = jsonMatch[0];
  return JSON.parse(text);
};

export const analyzeCompanyWithOpenRouter = async (company: string, role: string) => {
  const API_KEY = (window as any).OPENROUTER_API_KEY || import.meta.env.VITE_OPENROUTER_API_KEY || "";

  if (!API_KEY) {
    throw new Error("OpenRouter API Key not found. Please provide yours in the activation box.");
  }

  let lastError = null;

  // Try models sequentially
  for (const model of FREE_MODELS) {
    try {
      return await fetchAnalysis(company, role, model, API_KEY);
    } catch (error: any) {
      console.warn(`Model ${model} failed:`, error.message);
      lastError = error;
      // Continue to next model
    }
  }

  // If all failed
  throw new Error(`All free models failed. Last error: ${lastError?.message || "Unknown error"}`);
};
