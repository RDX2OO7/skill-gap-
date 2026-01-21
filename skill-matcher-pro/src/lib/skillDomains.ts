import { Code, Database, Brain, Shield, Cloud, Smartphone, Sparkles, Cpu } from 'lucide-react';

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 0-4: None, Beginner, Intermediate, Advanced, Expert
}

export interface SkillDomain {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  subTracks?: string[];
  skills: SkillItem[];
}

export const skillLevels = [
  { value: 0, label: 'None', color: 'bg-muted' },
  { value: 1, label: 'Beginner', color: 'bg-blue-500' },
  { value: 2, label: 'Intermediate', color: 'bg-yellow-500' },
  { value: 3, label: 'Advanced', color: 'bg-success' },
  { value: 4, label: 'Expert', color: 'bg-purple-500' },
];

export const defaultDomains: SkillDomain[] = [
  {
    id: 'sde',
    name: 'Software Development',
    icon: 'Code',
    color: 'from-blue-500 to-cyan-500',
    description: 'Backend, Frontend & Full Stack Development',
    subTracks: ['Backend Development', 'Frontend Development', 'Full Stack Development'],
    skills: [
      { id: 'javascript', name: 'JavaScript', level: 0 },
      { id: 'typescript', name: 'TypeScript', level: 0 },
      { id: 'python', name: 'Python', level: 0 },
      { id: 'java', name: 'Java', level: 0 },
      { id: 'cpp', name: 'C++', level: 0 },
      { id: 'react', name: 'React', level: 0 },
      { id: 'nodejs', name: 'Node.js', level: 0 },
      { id: 'sql', name: 'SQL', level: 0 },
      { id: 'mongodb', name: 'MongoDB', level: 0 },
      { id: 'graphql', name: 'GraphQL', level: 0 },
    ],
  },
  {
    id: 'dsa',
    name: 'DSA',
    icon: 'Database',
    color: 'from-purple-500 to-pink-500',
    description: 'Data Structures & Algorithms',
    skills: [
      { id: 'arrays', name: 'Arrays & Strings', level: 0 },
      { id: 'hashmaps', name: 'Hashmaps & Sets', level: 0 },
      { id: 'linkedlists', name: 'Linked Lists', level: 0 },
      { id: 'trees', name: 'Trees & BST', level: 0 },
      { id: 'graphs', name: 'Graphs', level: 0 },
      { id: 'recursion', name: 'Recursion', level: 0 },
      { id: 'dp', name: 'Dynamic Programming', level: 0 },
      { id: 'sorting', name: 'Sorting & Searching', level: 0 },
      { id: 'greedy', name: 'Greedy Algorithms', level: 0 },
      { id: 'backtracking', name: 'Backtracking', level: 0 },
    ],
  },
  {
    id: 'datascience',
    name: 'Data Science & ML',
    icon: 'Brain',
    color: 'from-green-500 to-emerald-500',
    description: 'Machine Learning & Data Analysis',
    skills: [
      { id: 'python-data', name: 'Python for Data', level: 0 },
      { id: 'numpy', name: 'NumPy', level: 0 },
      { id: 'pandas', name: 'Pandas', level: 0 },
      { id: 'matplotlib', name: 'Matplotlib/Seaborn', level: 0 },
      { id: 'sklearn', name: 'Scikit-learn', level: 0 },
      { id: 'ml-basics', name: 'ML Fundamentals', level: 0 },
      { id: 'tensorflow', name: 'TensorFlow/PyTorch', level: 0 },
      { id: 'sql-analytics', name: 'SQL for Analytics', level: 0 },
    ],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: 'Shield',
    color: 'from-red-500 to-orange-500',
    description: 'Security & Ethical Hacking',
    skills: [
      { id: 'networking', name: 'Networking Basics', level: 0 },
      { id: 'linux', name: 'Linux Fundamentals', level: 0 },
      { id: 'owasp', name: 'OWASP Top 10', level: 0 },
      { id: 'cryptography', name: 'Cryptography', level: 0 },
      { id: 'pentesting', name: 'Penetration Testing', level: 0 },
      { id: 'nmap', name: 'Nmap', level: 0 },
      { id: 'burpsuite', name: 'Burp Suite', level: 0 },
      { id: 'wireshark', name: 'Wireshark', level: 0 },
    ],
  },
  {
    id: 'devops',
    name: 'Cloud & DevOps',
    icon: 'Cloud',
    color: 'from-sky-500 to-indigo-500',
    description: 'Cloud Services & CI/CD',
    skills: [
      { id: 'git', name: 'Git & GitHub', level: 0 },
      { id: 'docker', name: 'Docker', level: 0 },
      { id: 'kubernetes', name: 'Kubernetes', level: 0 },
      { id: 'cicd', name: 'CI/CD Pipelines', level: 0 },
      { id: 'aws', name: 'AWS', level: 0 },
      { id: 'gcp', name: 'GCP', level: 0 },
      { id: 'azure', name: 'Azure', level: 0 },
      { id: 'terraform', name: 'Terraform', level: 0 },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    icon: 'Smartphone',
    color: 'from-teal-500 to-green-500',
    description: 'Android, iOS & Cross-Platform',
    skills: [
      { id: 'kotlin', name: 'Kotlin (Android)', level: 0 },
      { id: 'swift', name: 'Swift (iOS)', level: 0 },
      { id: 'flutter', name: 'Flutter', level: 0 },
      { id: 'react-native', name: 'React Native', level: 0 },
      { id: 'mobile-apis', name: 'REST API Integration', level: 0 },
      { id: 'firebase', name: 'Firebase', level: 0 },
    ],
  },
  {
    id: 'genai',
    name: 'AI Engineering',
    icon: 'Sparkles',
    color: 'from-violet-500 to-purple-500',
    description: 'GenAI & LLM Integration',
    skills: [
      { id: 'prompt-eng', name: 'Prompt Engineering', level: 0 },
      { id: 'openai-api', name: 'OpenAI API', level: 0 },
      { id: 'gemini-api', name: 'Gemini API', level: 0 },
      { id: 'langchain', name: 'LangChain', level: 0 },
      { id: 'rag', name: 'RAG Systems', level: 0 },
      { id: 'fine-tuning', name: 'Model Fine-tuning', level: 0 },
    ],
  },
  {
    id: 'embedded',
    name: 'Embedded & IoT',
    icon: 'Cpu',
    color: 'from-amber-500 to-yellow-500',
    description: 'Microcontrollers & Sensors',
    skills: [
      { id: 'c-embedded', name: 'C Programming', level: 0 },
      { id: 'arduino', name: 'Arduino', level: 0 },
      { id: 'raspberry-pi', name: 'Raspberry Pi', level: 0 },
      { id: 'sensors', name: 'Sensors & Actuators', level: 0 },
      { id: 'mqtt', name: 'MQTT Protocol', level: 0 },
      { id: 'rtos', name: 'RTOS Basics', level: 0 },
    ],
  },
];
