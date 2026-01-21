import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Briefcase, Sparkles, Loader2, Target, Users, Code, TrendingUp } from 'lucide-react';
import { SkillDomain } from '@/lib/skillDomains';

interface AnalysisResult {
  companyType: string;
  companyDescription: string;
  expectedSkills: {
    category: string;
    skills: string[];
    importance: 'critical' | 'important' | 'nice-to-have';
  }[];
  tips: string[];
}

// Webhook response interface
interface WebhookResponse {
  company_snapshot?: any;
  skill_match?: any;
  gap_analysis?: any;
  action_plan?: any;
  [key: string]: any; // Allow additional properties
}

// Mock analysis function - will be replaced by AI agent later
const mockAnalyze = (company: string, role: string): AnalysisResult => {
  const companyLower = company.toLowerCase();
  
  let companyType = 'Tech Company';
  let companyDescription = 'A technology-focused organization with modern development practices.';
  
  if (companyLower.includes('google') || companyLower.includes('meta') || companyLower.includes('amazon') || companyLower.includes('microsoft') || companyLower.includes('apple')) {
    companyType = 'FAANG / Big Tech';
    companyDescription = 'Large-scale tech company known for rigorous technical interviews and high engineering standards. Focus on algorithms, system design, and scalable solutions.';
  } else if (companyLower.includes('stripe') || companyLower.includes('razorpay') || companyLower.includes('paypal')) {
    companyType = 'FinTech';
    companyDescription = 'Financial technology company requiring strong security awareness, API design skills, and understanding of payment systems.';
  } else if (companyLower.includes('startup') || company.length < 10) {
    companyType = 'Startup';
    companyDescription = 'Fast-paced environment valuing versatility, quick learning, and end-to-end ownership of features.';
  }

  const roleLower = role.toLowerCase();
  let skills: AnalysisResult['expectedSkills'] = [];

  if (roleLower.includes('backend') || roleLower.includes('server')) {
    skills = [
      { category: 'Core Programming', skills: ['Python', 'Java', 'Go', 'Node.js'], importance: 'critical' },
      { category: 'Data Structures & Algorithms', skills: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming'], importance: 'critical' },
      { category: 'Databases', skills: ['SQL', 'PostgreSQL', 'MongoDB', 'Redis'], importance: 'important' },
      { category: 'System Design', skills: ['API Design', 'Microservices', 'Caching', 'Load Balancing'], importance: 'important' },
      { category: 'DevOps', skills: ['Docker', 'CI/CD', 'AWS/GCP', 'Linux'], importance: 'nice-to-have' },
    ];
  } else if (roleLower.includes('frontend') || roleLower.includes('ui')) {
    skills = [
      { category: 'Core Technologies', skills: ['JavaScript', 'TypeScript', 'HTML', 'CSS'], importance: 'critical' },
      { category: 'Frameworks', skills: ['React', 'Vue', 'Angular', 'Next.js'], importance: 'critical' },
      { category: 'State Management', skills: ['Redux', 'Zustand', 'Context API'], importance: 'important' },
      { category: 'UI/UX', skills: ['Responsive Design', 'Accessibility', 'Figma'], importance: 'important' },
      { category: 'Testing', skills: ['Jest', 'Cypress', 'React Testing Library'], importance: 'nice-to-have' },
    ];
  } else if (roleLower.includes('ml') || roleLower.includes('machine learning') || roleLower.includes('data')) {
    skills = [
      { category: 'Programming', skills: ['Python', 'NumPy', 'Pandas', 'Jupyter'], importance: 'critical' },
      { category: 'ML Fundamentals', skills: ['Linear Algebra', 'Statistics', 'Calculus'], importance: 'critical' },
      { category: 'ML Libraries', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn'], importance: 'important' },
      { category: 'Data Engineering', skills: ['SQL', 'ETL', 'Data Pipelines'], importance: 'important' },
      { category: 'MLOps', skills: ['Model Deployment', 'MLflow', 'Docker'], importance: 'nice-to-have' },
    ];
  } else {
    skills = [
      { category: 'Programming', skills: ['Python', 'JavaScript', 'Java'], importance: 'critical' },
      { category: 'Problem Solving', skills: ['Data Structures', 'Algorithms', 'Logic'], importance: 'critical' },
      { category: 'Tools', skills: ['Git', 'Linux', 'IDE proficiency'], importance: 'important' },
      { category: 'Soft Skills', skills: ['Communication', 'Teamwork', 'Problem-solving'], importance: 'important' },
    ];
  }

  return {
    companyType,
    companyDescription,
    expectedSkills: skills,
    tips: [
      `Research ${company}'s recent projects and tech blog posts`,
      `Practice ${companyType === 'FAANG / Big Tech' ? 'LeetCode medium/hard' : 'fundamental coding'} problems`,
      `Prepare examples of past projects relevant to ${role}`,
      `Understand the company\'s products and how they make money`,
    ],
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
          level: skill.level,
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

      // Store the full webhook response
      if (webhookResult) {
        console.log('Storing webhook response:', webhookResult);
        setWebhookResponse(webhookResult);
      }

      // Use webhook result if available, otherwise fall back to mock
      if (webhookResult && webhookResult.companyType) {
        console.log('Using webhook result:', webhookResult);
        setResult(webhookResult);
      } else {
        console.log('Webhook did not return valid result, using mock analysis');
        // Fallback to mock analysis
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

  const getImportanceBadge = (importance: string) => {
    const styles = {
      critical: 'bg-status-danger/10 text-status-danger border-status-danger/20',
      important: 'bg-status-warning/10 text-status-warning border-status-warning/20',
      'nice-to-have': 'bg-status-success/10 text-status-success border-status-success/20',
    };
    return styles[importance as keyof typeof styles] || styles['nice-to-have'];
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
              className="space-y-6"
            >
              {/* Company Type Card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{companyName}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {result.companyType}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{result.companyDescription}</p>
                  </div>
                </div>
              </div>

              {/* Expected Skills */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Code className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Expected Skills for {roleName}</h3>
                </div>

                <div className="space-y-6">
                  {result.expectedSkills.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-medium">{category.category}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getImportanceBadge(category.importance)}`}>
                          {category.importance.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Preparation Tips</h3>
                </div>
                <ul className="space-y-3">
                  {result.tips.map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link to="/select">Use Skill Alignment Flow</Link>
                </Button>
                <Button variant="hero" onClick={() => { setResult(null); setCompanyName(''); setRoleName(''); }}>
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
