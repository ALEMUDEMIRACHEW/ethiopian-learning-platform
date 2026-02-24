import { User, Course, Material, Quiz } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Abebe Bikila',
  email: 'abebe.bikila@ethiopulse.edu.et',
  grade: 'Grade 12',
  stream: 'Natural Science',
  language: 'English',
  avatar: 'https://picsum.photos/seed/abebe/200/200',
  points: 1250,
  badges: [
    { id: 'b1', name: 'Early Bird', icon: '🌅', color: 'bg-orange-100 text-orange-600' },
    { id: 'b2', name: 'Quiz Master', icon: '🏆', color: 'bg-yellow-100 text-yellow-600' },
    { id: 'b3', name: 'Note Taker', icon: '📝', color: 'bg-blue-100 text-blue-600' },
  ],
  enrolledClasses: ['c1', 'c2', 'c3'],
  competencies: [
    { domain: 'Literacy', score: 85, level: 'Advanced' },
    { domain: 'Numeracy', score: 78, level: 'Proficient' },
    { domain: 'Scientific Reasoning', score: 92, level: 'Master' },
    { domain: 'Digital Literacy', score: 70, level: 'Developing' },
    { domain: 'Civic Understanding', score: 88, level: 'Advanced' },
    { domain: 'Critical Thinking', score: 82, level: 'Advanced' },
  ],
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Grade 12 Physics',
    teacher: 'Dr. Kassahun Tadesse',
    thumbnail: 'https://picsum.photos/seed/physics/400/250',
    progress: 65,
    subject: 'Physics',
    grade: 'Grade 12',
    stream: 'Natural Science',
    isFavorite: true,
    description: 'Advanced physics topics including electromagnetism and quantum mechanics for Grade 12 students.',
    units: [
      {
        id: 'u1-1',
        title: 'Unit 1: Electromagnetism',
        isCompleted: true,
        lessons: [
          { id: 'l1-1-1', title: 'Electric Fields', learningObjectives: ['Define electric field', 'Calculate field strength'], materials: ['m1'], isCompleted: true },
          { id: 'l1-1-2', title: 'Magnetic Induction', learningObjectives: ['Explain Faraday\'s Law'], materials: [], isCompleted: true },
        ]
      },
      {
        id: 'u1-2',
        title: 'Unit 2: Quantum Mechanics',
        isCompleted: false,
        lessons: [
          { id: 'l1-2-1', title: 'Photoelectric Effect', learningObjectives: ['Describe the effect'], materials: [], isCompleted: false },
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Grade 12 Mathematics',
    teacher: 'Prof. Almaz Ayana',
    thumbnail: 'https://picsum.photos/seed/math/400/250',
    progress: 40,
    subject: 'Mathematics',
    grade: 'Grade 12',
    stream: 'Natural Science',
    isFavorite: false,
    description: 'Comprehensive mathematics covering calculus, vectors, and statistics for national exams.',
    units: []
  },
  {
    id: 'c3',
    title: 'Grade 12 English',
    teacher: 'Ms. Tigist Assefa',
    thumbnail: 'https://picsum.photos/seed/english/400/250',
    progress: 85,
    subject: 'English',
    grade: 'Grade 12',
    isFavorite: true,
    description: 'English language proficiency and literature analysis for Grade 12.',
    units: []
  },
  {
    id: 'c4',
    title: 'Grade 12 Civics & Ethics',
    teacher: 'Mr. Haile Gebrselassie',
    thumbnail: 'https://picsum.photos/seed/civics/400/250',
    progress: 20,
    subject: 'Civics',
    grade: 'Grade 12',
    isFavorite: false,
    description: 'Understanding the Ethiopian constitution, rights, and responsibilities.',
    units: []
  },
  {
    id: 'c5',
    title: 'Amharic Language',
    teacher: 'Ato Belayneh Abate',
    thumbnail: 'https://picsum.photos/seed/amharic/400/250',
    progress: 50,
    subject: 'Amharic',
    grade: 'Grade 12',
    isFavorite: true,
    description: 'Advanced Amharic grammar and literature.',
    units: []
  },
  {
    id: 'c6',
    title: 'Grade 8 General Science',
    teacher: 'W/ro Mulu Solomon',
    thumbnail: 'https://picsum.photos/seed/science8/400/250',
    progress: 0,
    subject: 'Science',
    grade: 'Grade 8',
    isFavorite: false,
    description: 'Foundational science concepts for middle school students preparing for regional exams.',
    units: []
  },
  {
    id: 'c7',
    title: 'Grade 5 Environmental Science',
    teacher: 'Ato Kebede Michael',
    thumbnail: 'https://picsum.photos/seed/env5/400/250',
    progress: 0,
    subject: 'Environmental Science',
    grade: 'Grade 5',
    isFavorite: false,
    description: 'Learning about the local environment and ecosystems in Ethiopia.',
    units: []
  },
];

export const MOCK_MATERIALS: Material[] = [
  { id: 'm1', title: 'Grade 12 Physics Textbook (MoE)', type: 'pdf', subject: 'Physics', chapter: 'Chapter 1: Electromagnetism', date: '2024-03-15', isBookmarked: true, language: 'English' },
  { id: 'm2', title: 'Grade 12 Math National Exam 2015', type: 'pdf', subject: 'Mathematics', chapter: 'Past Exams', date: '2024-03-10', isBookmarked: false, language: 'English' },
  { id: 'm3', title: 'Civics & Ethics Summary Notes', type: 'note', subject: 'Civics', chapter: 'Constitution', date: '2024-03-18', isBookmarked: true, language: 'Amharic' },
  { id: 'm4', title: 'English Grammar Video Lesson', type: 'video', subject: 'English', chapter: 'Tenses', date: '2024-03-12', isBookmarked: false, language: 'English' },
];

export const MOCK_QUIZZES: Quiz[] = [
  { id: 'q1', title: 'Grade 12 Physics: Unit 1 Test', subject: 'Physics', questionsCount: 15, durationMinutes: 20, difficulty: 'Easy', completed: true, score: 90, type: 'Chapter' },
  { id: 'q2', title: 'Grade 12 Math: Calculus Quiz', subject: 'Mathematics', questionsCount: 20, durationMinutes: 30, difficulty: 'Medium', completed: false, type: 'Weekly' },
  { id: 'q3', title: 'Grade 12 Civics: National Exam Prep', subject: 'Civics', questionsCount: 50, durationMinutes: 60, difficulty: 'Hard', completed: false, type: 'National Exam Simulation' },
];
