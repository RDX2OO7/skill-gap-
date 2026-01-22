# Webhook Data Mapping - Company Analyzer

## Your Webhook Response Structure

Based on your example, the webhook returns data in this format:

```
company_profile
  company_category: "Technology"
  industry: "Software Development"
  engineering_culture: "Agile and collaborative"
  organization_scale: "Large-scale"

role_profile
  role_summary: "A software engineer responsible for..."
  key_responsibilities
    0: "Designing and implementing scalable software solutions"
    1: "Collaborating with cross-functional teams..."
    2: "Debugging and optimizing code..."

required_skills
  core_skills
    0: { skill: "Problem-solving", expected_level: "Expert" }
    1: { skill: "Algorithm design", expected_level: "Advanced" }
    2: { skill: "System architecture", expected_level: "Intermediate" }
  supporting_skills
    0: { skill: "Version control (Git)", expected_level: "Intermediate" }
    1: { skill: "CI/CD pipelines", expected_level: "Basic" }
  bonus_skills
    0: { skill: "Cloud computing (AWS/Azure)", expected_level: "Basic" }
    1: { skill: "Containerization (Docker/Kubernetes)", expected_level: "Basic" }

programming_languages
  primary_languages
    0: { language: "Java", expected_level: "Advanced" }
    1: { language: "Python", expected_level: "Intermediate" }
  secondary_languages
    0: { language: "JavaScript", expected_level: "Basic" }
    1: { language: "SQL", expected_level: "Intermediate" }

tools_and_technologies
  0: { tool: "IntelliJ IDEA", expected_level: "Advanced" }
  1: { tool: "Jenkins", expected_level: "Intermediate" }
  2: { tool: "Postman", expected_level: "Basic" }

preparation_guidance
  focus_areas
    0: "Data structures and algorithms"
    1: "System design principles"
    2: "Agile methodologies"
  common_mistakes
    0: "Neglecting edge cases in code"
    1: "Overcomplicating solutions"
    2: "Poor communication in team settings"
  what_distinguishes_strong_candidates
    0: "Clear problem-solving approach"
    1: "Ability to optimize code"
    2: "Strong collaboration skills"
```

---

## How It Maps to UI Sections

### ✅ SECTION 1: Company Profile
**Displays in a 2-column grid:**
- **Company Category**: Technology
- **Industry**: Software Development
- **Engineering Culture**: Agile and collaborative
- **Organization Scale**: Large-scale

### ✅ SECTION 2: Role Overview
**Displays in a single card:**
- **Role Summary**: "A software engineer responsible for..."
- **Key Responsibilities** (bullet list):
  - Designing and implementing scalable software solutions
  - Collaborating with cross-functional teams to define and ship new features
  - Debugging and optimizing code for performance and scalability

### ✅ SECTION 3: Required Skills
**Displays in 3 columns:**

**Core Skills** (Primary color):
- Problem-solving → Expert (purple badge)
- Algorithm design → Advanced (purple badge)
- System architecture → Intermediate (green badge)

**Supporting Skills** (Blue):
- Version control (Git) → Intermediate (green badge)
- CI/CD pipelines → Basic (blue badge)

**Bonus Skills** (Green):
- Cloud computing (AWS/Azure) → Basic (blue badge)
- Containerization (Docker/Kubernetes) → Basic (blue badge)

### ✅ SECTION 4: Programming Languages
**Displays in 2 columns:**

**Primary Languages**:
- Java → Advanced (purple badge)
- Python → Intermediate (green badge)

**Secondary Languages**:
- JavaScript → Basic (blue badge)
- SQL → Intermediate (green badge)

### ✅ SECTION 5: Tools & Technologies
**Displays in a 3-column grid:**
- IntelliJ IDEA → Advanced (purple badge)
- Jenkins → Intermediate (green badge)
- Postman → Basic (blue badge)

### ✅ SECTION 6: Preparation Guidance
**Displays in 3 colored panels:**

**Focus Areas** (Green panel):
- Data structures and algorithms
- System design principles
- Agile methodologies

**Common Mistakes** (Orange panel):
- Neglecting edge cases in code
- Overcomplicating solutions
- Poor communication in team settings

**Strong Candidates** (Purple panel):
- Clear problem-solving approach
- Ability to optimize code
- Strong collaboration skills

---

## Badge Color Logic

The `getLevelBadgeClass()` function assigns colors based on the level text:

- **Purple**: Expert, Advanced
- **Green**: Intermediate, Proficient
- **Blue**: Basic, Beginner

---

## Data Parsing

The code uses two helper functions:

1. **`convertToArray(input)`**: Converts objects with numeric keys (0, 1, 2...) into proper arrays
   - Used for: skills, languages, tools

2. **`sanitizeList(input)`**: Converts to array AND removes numeric prefixes like "0:", "1:"
   - Used for: text lists (responsibilities, focus areas, etc.)

---

## Testing Instructions

1. Make sure your n8n webhook is running on `http://localhost:5678`
2. Open the app at `http://localhost:8080/`
3. Navigate to Company Analyzer
4. Enter a company name and role
5. Click "Analyze Company & Role"
6. Open browser console (F12) to see detailed logs
7. Check the UI - all 6 sections should display with your webhook data

---

## Troubleshooting

If data is not showing:
1. Check browser console for the detailed logs
2. Look for "=== SANITIZED WEBHOOK RESPONSE ===" in console
3. Verify each section has data
4. Check for any TypeScript errors in the console
5. Ensure webhook is returning the correct structure
