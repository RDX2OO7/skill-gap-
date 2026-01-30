export const GROQ_MODELS = [
    "llama-3.3-70b-versatile",
    "llama-3.1-70b-versatile",
    "llama3-70b-8192",
    "mixtral-8x7b-32768"
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

    console.log(`[Groq Engine] Attempting analysis with model: ${model}`);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "model": model,
            "messages": [{ "role": "user", "content": prompt }],
            "max_tokens": 1500,
            "temperature": 0.3,
            "response_format": { "type": "json_object" }
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
        console.warn("[Groq Engine] JSON Parse failed for model output:", text);
        throw new Error("Failed to parse AI response as valid JSON.");
    }
};

export const analyzeCompanyWithGroq = async (
    company: string,
    role: string,
    onStatusUpdate?: (status: string) => void
) => {
    const API_KEY = (window as any).GROQ_API_KEY || import.meta.env.VITE_GROQ_API_KEY || "";

    if (!API_KEY) {
        throw new Error("Groq API Key not found. Please provide yours in the activation box.");
    }

    let finalError = null;
    const failedModels: string[] = [];

    for (let i = 0; i < GROQ_MODELS.length; i++) {
        const model = GROQ_MODELS[i];
        try {
            onStatusUpdate?.(`Groq Agent ${i + 1}/${GROQ_MODELS.length}: Initializing ${model}...`);

            const startTime = Date.now();
            const result = await fetchAnalysis(company, role, model, API_KEY);
            console.log(`[Groq Engine] SUCCESS with ${model} in ${Date.now() - startTime}ms`);
            onStatusUpdate?.(`Success! Extracting strategic insights...`);
            return result;
        } catch (error: any) {
            const errorMsg = error.message;
            console.warn(`[Groq Engine] Model ${model} failed: ${errorMsg}`);
            failedModels.push(`${model}: ${errorMsg}`);
            finalError = error;

            if (errorMsg.toLowerCase().includes("api key") || errorMsg.toLowerCase().includes("unauthorized")) {
                throw new Error("The Groq API key provided is invalid.");
            }

            onStatusUpdate?.(`Groq Agent ${i + 1} busy. Switching to backup...`);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    const lastMsg = finalError?.message || "Internal Error";
    throw new Error(`Strategic analysis failed with Groq after ${GROQ_MODELS.length} attempts. ${lastMsg}`);
};
