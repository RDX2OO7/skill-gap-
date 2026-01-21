// Mock data for SkillAlign platform

export interface CompanyType {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  icon: string;
  description: string;
  requiredSkills: SkillRequirement[];
  dsaTopics: DSATopic[];
}

export interface SkillRequirement {
  skillId: string;
  name: string;
  requiredLevel: number; // 1-4
  category: 'technical' | 'dsa' | 'tools' | 'soft';
}

export interface DSATopic {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  required: boolean;
}

export interface UserSkill {
  skillId: string;
  name: string;
  level: number; // 1-4
  category: 'technical' | 'dsa' | 'tools' | 'soft';
}

export const companyTypes: CompanyType[] = [
  { id: 'faang', name: 'FAANG-like', icon: '🏢', description: 'Google, Meta, Amazon, Apple, etc.' },
  { id: 'product', name: 'Product Company', icon: '🚀', description: 'Atlassian, Notion, Stripe, etc.' },
  { id: 'startup', name: 'Startup', icon: '⚡', description: 'Early-stage, fast-paced environment' },
  { id: 'fintech', name: 'FinTech', icon: '💳', description: 'Razorpay, Zerodha, PayTM, etc.' },
];

export const roles: Role[] = [
  {
    id: 'backend',
    name: 'Backend Intern',
    icon: '⚙️',
    description: 'Server-side development, APIs, databases',
    requiredSkills: [
      { skillId: 'python', name: 'Python', requiredLevel: 3, category: 'technical' },
      { skillId: 'sql', name: 'SQL/Databases', requiredLevel: 3, category: 'technical' },
      { skillId: 'apis', name: 'REST APIs', requiredLevel: 3, category: 'technical' },
      { skillId: 'dsa', name: 'DSA', requiredLevel: 3, category: 'dsa' },
      { skillId: 'git', name: 'Git', requiredLevel: 2, category: 'tools' },
      { skillId: 'linux', name: 'Linux/CLI', requiredLevel: 2, category: 'tools' },
    ],
    dsaTopics: [
      { id: 'arrays', name: 'Arrays & Strings', difficulty: 'easy', required: true },
      { id: 'hashmaps', name: 'Hash Maps', difficulty: 'easy', required: true },
      { id: 'trees', name: 'Trees & BST', difficulty: 'medium', required: true },
      { id: 'graphs', name: 'Graphs', difficulty: 'medium', required: true },
      { id: 'dp', name: 'Dynamic Programming', difficulty: 'hard', required: false },
      { id: 'recursion', name: 'Recursion', difficulty: 'medium', required: true },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Intern',
    icon: '🎨',
    description: 'UI/UX development, React, modern web',
    requiredSkills: [
      { skillId: 'javascript', name: 'JavaScript', requiredLevel: 3, category: 'technical' },
      { skillId: 'react', name: 'React', requiredLevel: 3, category: 'technical' },
      { skillId: 'css', name: 'CSS/Tailwind', requiredLevel: 3, category: 'technical' },
      { skillId: 'typescript', name: 'TypeScript', requiredLevel: 2, category: 'technical' },
      { skillId: 'git', name: 'Git', requiredLevel: 2, category: 'tools' },
      { skillId: 'dsa', name: 'DSA', requiredLevel: 2, category: 'dsa' },
    ],
    dsaTopics: [
      { id: 'arrays', name: 'Arrays & Strings', difficulty: 'easy', required: true },
      { id: 'hashmaps', name: 'Hash Maps', difficulty: 'easy', required: true },
      { id: 'recursion', name: 'Recursion', difficulty: 'medium', required: true },
      { id: 'trees', name: 'Trees & BST', difficulty: 'medium', required: false },
    ],
  },
  {
    id: 'ml',
    name: 'ML Intern',
    icon: '🤖',
    description: 'Machine learning, data science, AI',
    requiredSkills: [
      { skillId: 'python', name: 'Python', requiredLevel: 4, category: 'technical' },
      { skillId: 'ml', name: 'Machine Learning', requiredLevel: 3, category: 'technical' },
      { skillId: 'math', name: 'Math/Statistics', requiredLevel: 3, category: 'technical' },
      { skillId: 'pandas', name: 'Pandas/NumPy', requiredLevel: 3, category: 'technical' },
      { skillId: 'sql', name: 'SQL', requiredLevel: 2, category: 'technical' },
      { skillId: 'dsa', name: 'DSA', requiredLevel: 2, category: 'dsa' },
    ],
    dsaTopics: [
      { id: 'arrays', name: 'Arrays & Strings', difficulty: 'easy', required: true },
      { id: 'hashmaps', name: 'Hash Maps', difficulty: 'easy', required: true },
      { id: 'recursion', name: 'Recursion', difficulty: 'medium', required: true },
    ],
  },
];

export const skillLevels = [
  { level: 1, name: 'Basics', description: 'Understand fundamentals' },
  { level: 2, name: 'Problem-solving', description: 'Can solve problems independently' },
  { level: 3, name: 'Framework/Library', description: 'Proficient with tools and frameworks' },
  { level: 4, name: 'Real-world', description: 'Built production-level projects' },
];

export const mockUserSkills: UserSkill[] = [
  { skillId: 'python', name: 'Python', level: 2, category: 'technical' },
  { skillId: 'sql', name: 'SQL/Databases', level: 1, category: 'technical' },
  { skillId: 'apis', name: 'REST APIs', level: 1, category: 'technical' },
  { skillId: 'dsa', name: 'DSA', level: 1, category: 'dsa' },
  { skillId: 'git', name: 'Git', level: 3, category: 'tools' },
  { skillId: 'javascript', name: 'JavaScript', level: 2, category: 'technical' },
  { skillId: 'react', name: 'React', level: 1, category: 'technical' },
];

export const mockDSAProgress = {
  completed: ['arrays'],
  inProgress: ['hashmaps'],
  notStarted: ['trees', 'graphs', 'dp', 'recursion'],
};

export const projectSuggestions = [
  {
    id: 'expense-tracker',
    name: 'Expense Tracker API',
    description: 'Build a RESTful API to track expenses with authentication',
    skillsImproved: ['python', 'sql', 'apis', 'git'],
    difficulty: 'Medium',
    timeEstimate: '2-3 weeks',
  },
  {
    id: 'task-manager',
    name: 'Task Manager App',
    description: 'Full-stack task management with React frontend',
    skillsImproved: ['react', 'javascript', 'apis', 'git'],
    difficulty: 'Medium',
    timeEstimate: '2-3 weeks',
  },
  {
    id: 'url-shortener',
    name: 'URL Shortener Service',
    description: 'Build a URL shortening service with analytics',
    skillsImproved: ['python', 'sql', 'apis'],
    difficulty: 'Easy',
    timeEstimate: '1 week',
  },
  {
    id: 'ml-classifier',
    name: 'Image Classifier',
    description: 'Build and deploy an image classification model',
    skillsImproved: ['python', 'ml', 'pandas'],
    difficulty: 'Hard',
    timeEstimate: '3-4 weeks',
  },
];

export const dsaPracticePlatforms = [
  { name: 'LeetCode', url: 'https://leetcode.com', icon: '💻' },
  { name: 'Codeforces', url: 'https://codeforces.com', icon: '🏆' },
  { name: 'HackerRank', url: 'https://hackerrank.com', icon: '🎯' },
  { name: 'GeeksforGeeks', url: 'https://geeksforgeeks.org', icon: '📚' },
];

export function calculateAlignment(
  userSkills: UserSkill[],
  requiredSkills: SkillRequirement[]
): number {
  let totalScore = 0;
  let maxScore = 0;

  requiredSkills.forEach((req) => {
    const userSkill = userSkills.find((s) => s.skillId === req.skillId);
    const userLevel = userSkill?.level || 0;
    const score = Math.min(userLevel / req.requiredLevel, 1);
    totalScore += score;
    maxScore += 1;
  });

  return Math.round((totalScore / maxScore) * 100);
}

export function getSkillGap(
  userSkill: UserSkill | undefined,
  required: SkillRequirement
): 'met' | 'partial' | 'gap' {
  const userLevel = userSkill?.level || 0;
  if (userLevel >= required.requiredLevel) return 'met';
  if (userLevel > 0) return 'partial';
  return 'gap';
}
