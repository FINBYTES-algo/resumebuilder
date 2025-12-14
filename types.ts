export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  technologies: string;
}

export type TemplateType = 'classic' | 'modern' | 'timeline';

export interface Theme {
  primaryColor: string;
  template: TemplateType;
}

export type SectionKey = 'summary' | 'experience' | 'education' | 'skills' | 'projects';

export interface ResumeData {
  personalInfo: PersonalInfo;
  theme: Theme;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string; // Comma separated for simplicity in UI, parsed in view
  projects: Project[];
  sectionOrder?: SectionKey[]; // Order of sections in the resume
}

export enum SectionType {
  DESIGN = 'Design',
  PERSONAL = 'Personal',
  SUMMARY = 'Summary',
  EXPERIENCE = 'Experience',
  EDUCATION = 'Education',
  PROJECTS = 'Projects',
  SKILLS = 'Skills'
}