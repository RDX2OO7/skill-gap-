import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { Building2, Briefcase, Sparkles, Loader2, Target, Users, Code, TrendingUp, CheckCircle, AlertTriangle, BookOpen, Layers } from 'lucide-react';
import { SkillDomain, skillLevels } from '@/lib/skillDomains';

interface CompanySnapshot {
  industry: string;
  company_type: string;
  hiring_nature: string;
  role_expectations: string[];
}

interface SkillProgress {
  skill: string;
  level: string; // Changed to string for labels like "Intermediate", "Expert"
}

interface RadarDataPoint {
  subject: string;
  userLevel: number; // 0-100 or 0-4
  requiredLevel: number; // 0-100 or 0-4
}

interface SkillMatch {
  readiness_percent: number;
  progress: SkillProgress[];
  radar: RadarDataPoint[]; // Updated to array of objects with both values
}

interface GapAnalysis {
  missing_skills: string[];
  underdeveloped_areas: string[];
}

interface ActionPlan {
  day_30_plan: string[];
  resources: string[];
  projects: string[];
}

interface AnalysisResult {
  company_snapshot: CompanySnapshot;
  skill_match: SkillMatch;
  gap_analysis: GapAnalysis;
  action_plan: ActionPlan;
}

// Webhook response interface
interface WebhookResponse extends AnalysisResult {
  [key: string]: any;
}

// Mock analysis function
const mockAnalyze = (company: string, role: string): AnalysisResult => {
  return {
    company_snapshot: {
      industry: "Technology",
      company_type: "Tech Company",
      hiring_nature: "Competitive",
      role_expectations: [
        "Strong fundamentals in Data Structures and Algorithms",
        "Proficiency in backend development languages",
        "Experience with APIs and databases",
        "Familiarity with version control"
      ]
    },
    skill_match: {
      readiness_percent: 70,
      progress: [
        { skill: "Data Structures", level: "Intermediate" },
        { skill: "APIs", level: "Beginner" },
        { skill: "Databases", level: "Intermediate" },
        { skill: "Backend Lang", level: "Advanced" }
      ],
      radar: [
        { subject: "Frontend", userLevel: 20, requiredLevel: 40 },
        { subject: "Backend", userLevel: 70, requiredLevel: 80 },
        { subject: "DSA", userLevel: 60, requiredLevel: 75 },
        { subject: "Security", userLevel: 30, requiredLevel: 50 },
        { subject: "Cloud", userLevel: 40, requiredLevel: 60 }
      ]
    },
    gap_analysis: {
      missing_skills: ["System Design"],
      underdeveloped_areas: ["APIs", "Cloud Deployment"]
    },
    action_plan: {
      day_30_plan: [
        "Complete a DSA challenge daily",
        "Build a RESTful API project",
        "Practice database design"
      ],
      resources: [
        "LeetCode",
        "MDN Web Docs",
        "System Design Primer"
      ],
      projects: [
        "Personal blog with CRUD",
        "Task API"
      ]
    }
  };
};

const WEBHOOK_URL = 'http://localhost:5678/webhook-test/22325e9a-f689-49b3-b342-d9d2dd05d3ea';

export default function AnalyzerPage() {
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [webhookResponse, setWebhookResponse] = useState<WebhookResponse | null>(null);

  // Get MY SKILLS data from localStorage
  const getMySkillsData = (): SkillDomain[] => {
    try {
      const saved = localStorage.getItem('mySkillDomains');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error reading skills from localStorage:', error);
      return [];
    }
  };

  // Format skills data for webhook payload
  const formatSkillsForWebhook = (domains: SkillDomain[]) => {
    const allSkills = domains.flatMap(domain =>
      domain.skills
        .filter(skill => skill.level > 0) // Only include skills with level > 0
        .map(skill => ({
          id: skill.id,
          name: skill.name,
          level: skillLevels[skill.level].label, // Send label instead of number
          domain: domain.name,
          domainId: domain.id
        }))
    );
    return allSkills;
  };

  const handleAnalyze = async () => {
    if (!companyName.trim() || !roleName.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setWebhookResponse(null);

    try {
      // Get MY SKILLS data
      const skillDomains = getMySkillsData();
      const formattedSkills = formatSkillsForWebhook(skillDomains);

      // Prepare webhook payload
      const webhookPayload = {
        company: companyName.trim(),
        role: roleName.trim(),
        skills: formattedSkills,
        timestamp: new Date().toISOString()
      };

      console.log('Sending webhook request to:', WEBHOOK_URL);
      console.log('Payload:', webhookPayload);

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      // Send to webhook
      let response;
      try {
        response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timeout: Webhook did not respond within 30 seconds');
        } else if (fetchError.message?.includes('Failed to fetch') || fetchError.message?.includes('NetworkError')) {
          throw new Error('Network error: Cannot connect to webhook. Make sure the server is running on localhost:5678');
        } else if (fetchError.message?.includes('CORS')) {
          throw new Error('CORS error: Webhook server needs to allow requests from this origin');
        }
        throw fetchError;
      }

      console.log('Response status:', response.status, response.statusText);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details');
        throw new Error(`Webhook request failed: ${response.status} ${response.statusText}. ${errorText}`);
      }

      // Parse and store the full webhook response
      let webhookResult: WebhookResponse | null = null;
      try {
        const contentType = response.headers.get('content-type');
        const responseText = await response.text();
        console.log('Response body:', responseText);

        if (contentType && contentType.includes('application/json')) {
          webhookResult = JSON.parse(responseText) as WebhookResponse;
        } else if (responseText) {
          // Try to parse as JSON even if content-type doesn't say so
          try {
            webhookResult = JSON.parse(responseText) as WebhookResponse;
          } catch {
            console.log('Response is not JSON, using mock analysis');
          }
        }
      } catch (parseError) {
        console.log('Error parsing webhook response, using mock analysis:', parseError);
      }

      // Helper to clean indexed strings and ensure array type
      const sanitizeList = (input: any): string[] => {
        if (!input) return [];
        let arr: any[] = [];
        if (Array.isArray(input)) {
          arr = input;
        } else if (typeof input === 'object') {
          // Handle object with numeric keys { "0": "...", "1": "..." }
          arr = Object.keys(input)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(key => input[key]);
        } else if (typeof input === 'string') {
          arr = [input];
        }

        return arr.map(item => {
          const str = String(item);
          // Remove leading "0:", "1:", "0. ", etc.
          return str.replace(/^\d+[:.]\s*/, '').trim();
        }).filter(Boolean);
      };

      // Store the full webhook response with sanitization
      if (webhookResult) {
        const sanitized: WebhookResponse = {
          ...webhookResult,
          company_snapshot: {
            ...(webhookResult.company_snapshot || {}),
            role_expectations: sanitizeList(webhookResult.company_snapshot?.role_expectations)
          },
          action_plan: {
            ...(webhookResult.action_plan || {}),
            day_30_plan: sanitizeList(webhookResult.action_plan?.day_30_plan),
            resources: sanitizeList(webhookResult.action_plan?.resources),
            projects: sanitizeList(webhookResult.action_plan?.projects)
          }
        };

        console.log('Storing sanitized webhook response:', sanitized);
        setWebhookResponse(sanitized);

        if (sanitized.company_snapshot && sanitized.company_snapshot.industry) {
          console.log('Using webhook result:', sanitized);
          setResult(sanitized);
        } else {
          console.log('Webhook did not return valid result, using mock analysis');
          const analysis = mockAnalyze(companyName, roleName);
          setResult(analysis);
        }
      } else {
        console.log('No webhook result, using mock analysis');
        const analysis = mockAnalyze(companyName, roleName);
        setResult(analysis);
      }
    } catch (error) {
      console.error('Error calling webhook:', error);
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to connect to webhook. Check console for details.';
      setError(errorMessage);
      // Fallback to mock analysis on error
      const analysis = mockAnalyze(companyName, roleName);
      setResult(analysis);
    } finally {
      setIsAnalyzing(false);
    }
  };



  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI-Powered Analysis
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Company Analyzer</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Enter any company name and role to get AI-powered insights on company type and expected skills
            </p>
          </motion.div>

          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-8 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  Company Name
                </Label>
                <Input
                  id="company"
                  placeholder="e.g., Google, Stripe, YC Startup..."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Role / Position
                </Label>
                <Input
                  id="role"
                  placeholder="e.g., Backend Intern, ML Engineer..."
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !companyName.trim() || !roleName.trim()}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Company & Role
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              🤖 Connected to AI agent webhook — skills data from MY SKILLS will be sent
            </p>
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                ⚠️ {error} (Using fallback analysis)
              </div>
            )}
          </motion.div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* 1. Company Snapshot */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Company Snapshot</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl border border-border p-5">
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Industry</span>
                        <div className="font-semibold">{result.company_snapshot.industry}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Company Type</span>
                        <div className="font-semibold">{result.company_snapshot.company_type}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Hiring Nature</span>
                        <div className="font-semibold">{result.company_snapshot.hiring_nature}</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-5">
                    <span className="text-sm text-muted-foreground block mb-3">Role Expectations</span>
                    <ul className="space-y-2">
                      {result.company_snapshot.role_expectations.map((exp, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. Skill Match */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Skill Match</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 bg-card rounded-xl border border-border p-6">
                  {/* Readiness & Radar */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-sm text-muted-foreground block mb-2">Readiness Score</span>
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-bold text-primary">{result.skill_match.readiness_percent}%</span>
                        <span className="text-sm text-muted-foreground mb-1">match</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000 ease-out"
                          style={{ width: `${result.skill_match.readiness_percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="h-[300px] w-full -ml-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={result.skill_match.radar}>
                          <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

                          <Radar
                            name="My Skills"
                            dataKey="userLevel"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                          />
                          <Radar
                            name="Required"
                            dataKey="requiredLevel"
                            stroke="#f97316"
                            fill="#f97316"
                            fillOpacity={0.3}
                          />

                          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--popover))',
                              borderColor: 'hsl(var(--border))',
                              borderRadius: '8px',
                              color: 'hsl(var(--popover-foreground))',
                              fontSize: '12px'
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Skills List with Levels */}
                  <div className="space-y-4">
                    <span className="text-sm font-medium block">Key Skills Breakdown</span>
                    {result.skill_match.progress.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                        <span className="font-medium text-sm">{item.skill}</span>
                        <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.level.toLowerCase().includes('expert') || item.level.includes('4') ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                          item.level.toLowerCase().includes('advanced') || item.level.includes('3') ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                            item.level.toLowerCase().includes('intermediate') || item.level.includes('2') ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                              'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          }`}>
                          {item.level}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 3. Gap Analysis */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Gap Analysis</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-destructive/5 rounded-xl border border-destructive/10 p-5">
                    <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Missing Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.gap_analysis.missing_skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-background rounded-md text-sm border border-destructive/20 text-destructive">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-orange-500/5 rounded-xl border border-orange-500/10 p-5">
                    <h3 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Underdeveloped Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.gap_analysis.underdeveloped_areas.map((area, i) => (
                        <span key={i} className="px-3 py-1 bg-background rounded-md text-sm border border-orange-500/20 text-orange-600">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Action Plan */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Action Plan</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card rounded-xl border border-border p-5">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" /> 30-Day Plan
                    </h3>
                    <ul className="space-y-2">
                      {result.action_plan.day_30_plan.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary font-bold">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-5">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" /> Resources
                    </h3>
                    <ul className="space-y-2">
                      {result.action_plan.resources.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary font-bold">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-5">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary" /> Recommended Projects
                    </h3>
                    <ul className="space-y-2">
                      {result.action_plan.projects.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary font-bold">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div className="flex justify-center gap-4 pt-6">
                <Button variant="outline" asChild>
                  <Link to="/select">Update My Skills</Link>
                </Button>
                <Button variant="hero" onClick={() => { setResult(null); setWebhookResponse(null); }}>
                  Analyze Another
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
