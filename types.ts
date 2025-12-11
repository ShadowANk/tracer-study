export enum EmploymentStatus {
  Employed = 'Employed',
  SelfEmployed = 'Self-Employed',
  Seeking = 'Seeking Employment',
  FurtherStudy = 'Further Study',
  Unemployed = 'Unemployed'
}

export enum JobRelevance {
  VeryRelated = 'Very Related',
  Related = 'Related',
  SomewhatRelated = 'Somewhat Related',
  NotRelated = 'Not Related'
}

export interface Alumni {
  id: string;
  fullName: string;
  studentId: string;
  graduationYear: number;
  email: string;
  status: EmploymentStatus;
  companyName?: string;
  jobTitle?: string;
  salary?: number;
  relevance?: JobRelevance;
  feedback?: string; // Qualitative feedback about curriculum
  submissionDate: string;
}

export interface AIAnalysisResult {
  summary: string;
  recommendations: string[];
  trendingSkills: string[];
  curriculumGaps: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
  postedDate: string;
  description: string;
}

export interface AlumniEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'Reunion' | 'Webinar' | 'Job Fair' | 'Workshop';
  attendees: number;
}