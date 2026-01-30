# 🚀 Skill Gap & Internship Readiness Analyzer

<p align="center">
  <img 
    src="https://readme-typing-svg.demolab.com?font=Inter&weight=800&size=40&duration=2500&pause=1000&color=22C3A6&center=true&vCenter=true&width=900&height=80&lines=Stop+Guessing+What+to+Learn%7C"
    alt="Stop Guessing What to Learn"
  />
</p>


A web-based platform that helps students and early-career developers analyze their **skill gaps**, **internship readiness**, and **role-specific preparation needs** based on a target **company** and **role**.

The system uses modern **LLM APIs** to generate **structured, actionable insights** such as:
- Company & role overview
- Required skills and tools
- Programming languages & technologies
- Preparation guidance
- Common mistakes
- What differentiates strong candidates
---

## ✨ Features

- 🔍 **Company & Role Analyzer**
  - Enter a target company and role
  - Receive structured, industry-aligned expectations

- 🧠 **Skill Gap & Readiness Analysis**
  - Identifies required skills, tools, and technologies
  - Highlights gaps and preparation focus areas

- 📊 **Structured Output**
  - Clean JSON → UI-rendered sections
  - No unstructured AI chat responses

- 🌐 **LLM-Powered Intelligence**
  - Google Gemini SDK
  - OpenRouter API
  - Prompt-engineered structured responses

---

## 🛠️ Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Antigravity IDE** (UI + logic generation)

### AI & APIs
- **Google Gemini SDK**
- **OpenRouter API**
- Strict **JSON-based prompting**

### Tooling
- Node.js
- npm / yarn
- Git & GitHub

---

## ⚙️ How the System Works (High Level)

1. User enters:
   - Target Company
   - Target Role
2. Frontend sends structured input to AI using SDKs
3. LLM generates **strict structured JSON**
4. UI parses JSON and renders:
   - Company Profile
   - Role Overview
   - Required Skills
   - Programming Languages
   - Tools & Technologies
   - Preparation Guidance

---
## 🧠 Skill Gap Analyzer – System Flow

```bash
┌──────────────────────────────────────────────────────────────────────────────┐
│                          SKILL GAP ANALYZER SYSTEM                           │
└──────────────────────────────────────────────────────────────────────────────┘


┌──────────────────────────────┐        ┌──────────────────────────────┐
│            USER              │        │      FRONTEND (WEB APP)      │
│                              │        │                              │
│  - Enters Company Name       │ ───▶   │  React / Next.js            │
│  - Selects Role / Domain     │        │  Antigravity-generated UI    │
│  - Uses Saved Skills Profile │        │                              │
└──────────────────────────────┘        │  - Form Validation           │
                                        │  - JSON Payload Builder      │
                                        │  - Analyze Button Trigger    │
                                        └──────────────┬───────────────┘
                                                       │
                                                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         CLIENT-SIDE AI LOGIC                         │
│                                                                      │
│  - Structures Input JSON                                             │
│  - Injects Prompt Template                                           │
│  - Calls LLM SDK directly (No workflow tools)                        │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                          AI INTELLIGENCE LAYER                       │
│                                                                      │
│  Google Gemini SDK / OpenRouter API                                  │
│                                                                      │
│  - Company Intelligence Analysis                                     │
│  - Role Expectation Inference                                        │
│  - Required Skills Mapping                                           │
│  - Industry-standard Benchmarking                                    │
│                                                                      │
│  (No n8n / No external workflow automation)                          │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────┐        ┌──────────────────────────────┐
│  STRUCTURED AI OUTPUT (JSON) │        │        UI RENDERING          │
│                              │ ───▶  │                              │
│  - Company Profile           │        │  - Parses structured JSON    │
│  - Role Summary              │        │  - Renders cards & sections  │
│  - Required Skills           │        │  - Clean visual layout       │
│  - Programming Languages     │        │                              │
│  - Tools & Technologies      │        │  Sections:                   │
│  - Preparation Guidance      │        │   ▸ Company Overview         │
│  - Common Mistakes           │        │   ▸ Role Overview            │
│  - Strong Candidate Traits   │        │   ▸ Skills & Tools           │
└──────────────────────────────┘        │   ▸ Preparation Guidance     │
                                        └──────────────┬───────────────┘
                                                       │
                                                       ▼
                                        ┌──────────────────────────────┐
                                        │        USER ACTIONS          │
                                        │                              │
                                        │  - Update Skills             │
                                        │  - Analyze Another Role      │
                                        │  - Explore Dashboard         │
                                        └──────────────────────────────┘
```

---
## ▶️ Running the Project Locally (Step-by-Step)

###  Prerequisites

Make sure you have:
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- Modern browser (Chrome / Edge)
- API keys for:
  - Google Gemini
  - OpenRouter
  - GROQ 

### Clone the Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm run dev
```
----
