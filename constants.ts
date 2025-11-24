
import { Project, Skill, Experience, Certification, Education } from './types';

export const RESUME_DATA = {
  name: "Anantkumar Saunshi",
  role: "Junior Data Analyst",
  location: "Bangalore, Karnataka",
  phone: "+91-6361569670",
  email: "anantbs2323@gmail.com",
  summary: "Analytical and motivated Computer Science Engineering student (B.E., 2025) with strong proficiency in Python (Pandas, NumPy, PyTorch), SQL, and Power BI. Experienced in building dashboards, automating reports, and leveraging AI tools for data-driven business insights. Passionate about Data Analytics, BI, and AI-powered analytics.",
  status: "Available for roles",
  avatar: "https://picsum.photos/seed/anant/600/600",
  resumeUrl: ""
};

export const SKILLS: Skill[] = [
  { name: "Python & Pandas", level: 90 },
  { name: "SQL (MySQL)", level: 85 },
  { name: "Power BI & Excel", level: 88 },
  { name: "Data Visualization", level: 80 },
  { name: "Machine Learning Basics", level: 70 },
  { name: "Gen AI Tools (Gemini/ChatGPT)", level: 85 },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Data Analytics Intern",
    company: "Beasent Technology",
    period: "Jul 2025 – Sep 2025 (Remote)",
    description: [
      "Reduced manual reporting time by 30% by developing automated HR analytics dashboards in Power BI and Excel.",
      "Improved HR decision-making speed by 25% by integrating real-time datasets and defining actionable KPIs.",
      "Designed and implemented KPIs to track employee satisfaction, leading to a 4% reduction in turnover."
    ]
  }
];

export const INITIAL_EDUCATION: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Engineering (CSE)",
    school: "Agadi College of Engineering",
    period: "2021 – 2025 | CGPA: 7.9",
    description: "Focused on Data Analytics, Database Management, and AI."
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "HR Data Analytics Dashboard",
    tech: ["Power BI", "Excel", "DAX"],
    description: [
      "Analyzed 7+ workforce metrics including attrition, hiring trends, promotions, and demographics.",
      "Automated Excel preprocessing (removing nulls, converting datatypes, merging sheets).",
      "Designed DAX measures to calculate attrition %, average tenure, and engagement insights."
    ],
    image: "https://picsum.photos/id/0/800/600", // Tech placeholder
    link: "#",
    github: "https://github.com"
  },
  {
    id: 2,
    title: "Bank Loan Report Dashboard",
    tech: ["MySQL", "Power BI", "SQL"],
    description: [
      "Cleaned and transformed 5,000+ financial records using SQL queries (joins, grouping, aggregates).",
      "Built a Power BI dashboard showing loan approval trends, repayment behavior, and KPI comparisons.",
      "Segmented loans into Good vs Bad categories using DTI ratio and credit indicators."
    ],
    image: "https://picsum.photos/id/20/800/600", // Tech placeholder
    link: "#",
    github: "https://github.com"
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  { 
    id: 1, 
    name: "Python Programming", 
    issuer: "Geeks for Geeks", 
    year: "2025",
    link: "https://www.geeksforgeeks.org/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" 
  },
  { 
    id: 2, 
    name: "Data Analytics Job Simulation", 
    issuer: "Deloitte", 
    year: "2025",
    link: "https://www.theforage.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/1200px-Deloitte.svg.png"
  },
  { 
    id: 3, 
    name: "Gen AI-Powered Data Analytics Simulation", 
    issuer: "Tata", 
    year: "2025",
    link: "https://www.tata.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/1200px-Tata_logo.svg.png" 
  }
];
