
export interface Project {
  id: number;
  title: string;
  tech: string[];
  description: string[];
  image: string;
  link: string;
  github?: string;
}

export interface Skill {
  id?: number; // Optional for backward compatibility if needed, but useful for state
  name: string;
  level: number; // 0 to 100
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  id: number;
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  link?: string;
  image?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
  status?: string;
  avatar?: string;
  resumeUrl?: string;
}
