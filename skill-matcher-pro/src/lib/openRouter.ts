export const FREE_MODELS = [
  "google/gemini-flash-1.5-8b:free",
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "deepseek/deepseek-r1:free",
  "mistralai/mistral-small-24b-instruct-2501:free",
  "google/gemma-3-27b:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "nvidia/llama-3.1-nemotron-nano-8b-v1:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "microsoft/phi-3-medium-128k-instruct:free",
  "qwen/qwq-32b-preview:free",
  "deepseek/deepseek-chat:free",
  "google/learnlm-1.5-pro-experimental:free",
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

  console.log(`[AI Engine] Attempting analysis with model: ${model}`);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : 'https://skillmatcher.pro',
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
    const errorData = await response.json().catch(() => ({}));
    const msg = errorData.error?.message || `HTTP ${response.status}`;
    throw new Error(msg);
  }

  const result = await response.json();
  const text = result.choices?.[0]?.message?.content || "";

  if (!text.trim()) {
    throw new Error("Model returned an empty response.");
  }

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const validJson = jsonMatch ? jsonMatch[0] : text;
    return JSON.parse(validJson);
  } catch (e) {
    console.warn("[AI Engine] JSON Parse failed for model output:", text);
    throw new Error("Failed to parse AI response as valid JSON.");
  }
};

export const analyzeCompanyWithOpenRouter = async (
  company: string,
  role: string,
  onStatusUpdate?: (status: string) => void
) => {
  const API_KEY = (window as any).OPENROUTER_API_KEY || import.meta.env.VITE_OPENROUTER_API_KEY || "";

  if (!API_KEY) {
    throw new Error("OpenRouter API Key not found. Please provide yours in the activation box.");
  }

  let finalError = null;
  const failedModels: string[] = [];

  // Try models sequentially
  for (let i = 0; i < FREE_MODELS.length; i++) {
    const model = FREE_MODELS[i];
    try {
      const modelShortName = model.split('/').pop()?.split(':')[0] || model;
      onStatusUpdate?.(`Agent ${i + 1}/${FREE_MODELS.length}: Initializing ${modelShortName}...`);

      const startTime = Date.now();
      const result = await fetchAnalysis(company, role, model, API_KEY);
      console.log(`[AI Engine] SUCCESS with ${model} in ${Date.now() - startTime}ms`);
      onStatusUpdate?.(`Success! Extracting strategic insights...`);
      return result;
    } catch (error: any) {
      const errorMsg = error.message;
      console.warn(`[AI Engine] Model ${model} failed: ${errorMsg}`);
      failedModels.push(`${model}: ${errorMsg}`);
      finalError = error;

      // If it's a credits/quota issue with the key itself, don't bother trying other models
      if (errorMsg.toLowerCase().includes("credit") || errorMsg.toLowerCase().includes("insufficient balance")) {
        throw new Error("Your OpenRouter key has insufficient credits or is restricted. Please check your account.");
      }

      onStatusUpdate?.(`Agent ${i + 1} busy. Switching to backup agent...`);

      // Small pause before next model
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }

  // If we exhausted all models
  console.error("[AI Engine] All free models exhausted.", failedModels);

  const lastMsg = finalError?.message || "Internal Error";
  throw new Error(`Strategic analysis failed after ${FREE_MODELS.length} attempts. Last error: ${lastMsg}. Tip: During peak hours, free models may be busy. Try again in a few minutes or provide a paid key.`);
};
