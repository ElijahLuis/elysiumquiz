export type RealmKey =
  | 'abyss' | 'cavern' | 'dross' | 'ember' | 'glare'
  | 'languish' | 'mist' | 'oasis' | 'trace' | 'zenith';

export interface RealmInfo {
  id: RealmKey;
  name: string;
  color: string;
  quote: string;
  coreEmotions: string[];
  tone: string;
  lore: string;
}

export type QuestionType = 'scenario' | 'slider' | 'word_cloud' | 'reflection';

export interface ChoiceOption {
  id: string;
  text: string;
  realms: Partial<Record<RealmKey, number>>;
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'scenario' | 'reflection' | 'word_cloud';
  options: ChoiceOption[];
}

export interface SliderRange {
  min: number;
  max: number;
  realms: Partial<Record<RealmKey, number>>;
}

export interface SliderQuestion extends BaseQuestion {
  type: 'slider';
  leftLabel: string;
  rightLabel: string;
  ranges: SliderRange[];
}

export type Question = ChoiceQuestion | SliderQuestion;

export interface Answer {
  questionId: string;
  value: string | number;
  realmWeights: Partial<Record<RealmKey, number>>;
}

export type RealmScores = Record<RealmKey, number>;

export type Confidence = 'strong' | 'moderate' | 'mixed';

export interface TrioInfo {
  key: string;
  title: string;
  insight: string;
}

export interface QuizResult {
  primaryRealm: RealmKey;
  primaryScore: number;
  secondaryRealm: RealmKey;
  secondaryScore: number;
  tertiaryRealm: RealmKey;
  tertiaryScore: number;
  fullScores: RealmScores;
  confidence: Confidence;
  trio: TrioInfo;
  timestamp: Date;
}

export interface UserRegistration {
  displayName: string;
  email?: string;
  quizResult: QuizResult;
  timestamp: Date;
}

export type QuizStage = 'welcome' | 'quiz' | 'teaser' | 'registration' | 'results';
