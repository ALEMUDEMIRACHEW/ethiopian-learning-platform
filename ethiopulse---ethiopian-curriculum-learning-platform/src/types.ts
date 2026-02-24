export type Grade = 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4' | 'Grade 5' | 'Grade 6' | 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12' | 'KG';
export type Stream = 'Natural Science' | 'Social Science' | 'General' | 'TVET';
export type Language = 'English' | 'Amharic' | 'Afaan Oromo' | 'Tigrinya';

export interface User {
  id: string;
  name: string;
  email: string;
  grade: Grade;
  stream?: Stream;
  language: Language;
  avatar: string;
  points: number;
  badges: Badge[];
  enrolledClasses: string[];
  competencies: CompetencyScore[];
}

export interface CompetencyScore {
  domain: 'Literacy' | 'Numeracy' | 'Scientific Reasoning' | 'Digital Literacy' | 'Civic Understanding' | 'Critical Thinking';
  score: number; // 0-100
  level: 'Beginner' | 'Developing' | 'Proficient' | 'Advanced' | 'Master';
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Course {
  id: string;
  title: string;
  teacher: string;
  thumbnail: string;
  progress: number;
  subject: string;
  grade: Grade;
  stream?: Stream;
  isFavorite: boolean;
  description: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
  isCompleted: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  learningObjectives: string[];
  materials: string[]; // Material IDs
  isCompleted: boolean;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'note';
  subject: string;
  chapter: string;
  unitId?: string;
  date: string;
  isBookmarked: boolean;
  language: Language;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questionsCount: number;
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  score?: number;
  type: 'Daily' | 'Weekly' | 'Chapter' | 'National Exam Simulation';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isAi?: boolean;
}
