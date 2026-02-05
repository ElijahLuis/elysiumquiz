import { useState, useCallback } from 'react';
import type { Answer, QuizResult, QuizStage, SliderQuestion, ChoiceQuestion, RealmKey } from '../data/types';
import { questions } from '../data/questions';
import { determineResult } from '../utils/scoring';

interface QuizState {
  stage: QuizStage;
  currentQuestionIndex: number;
  answers: Answer[];
  result: QuizResult | null;
}

export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    stage: 'welcome',
    currentQuestionIndex: 0,
    answers: [],
    result: null
  });

  const currentQuestion = questions[state.currentQuestionIndex];
  const progress = ((state.currentQuestionIndex) / questions.length) * 100;
  const isLastQuestion = state.currentQuestionIndex === questions.length - 1;

  const startQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      stage: 'quiz',
      currentQuestionIndex: 0,
      answers: []
    }));
  }, []);

  const answerQuestion = useCallback((value: string | number, realmWeights: Partial<Record<RealmKey, number>>) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      value,
      realmWeights
    };

    setState(prev => {
      const newAnswers = [...prev.answers, answer];

      if (isLastQuestion) {
        const result = determineResult(newAnswers);
        return {
          ...prev,
          answers: newAnswers,
          result,
          stage: 'transitioning'
        };
      }

      return {
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  }, [currentQuestion, isLastQuestion]);

  const selectOption = useCallback((optionId: string) => {
    const question = currentQuestion as ChoiceQuestion;
    const option = question.options.find(o => o.id === optionId);
    if (option) {
      answerQuestion(optionId, option.realms);
    }
  }, [currentQuestion, answerQuestion]);

  const selectSliderValue = useCallback((value: number) => {
    const question = currentQuestion as SliderQuestion;
    const range = question.ranges.find(r => value >= r.min && value <= r.max);
    if (range) {
      answerQuestion(value, range.realms);
    }
  }, [currentQuestion, answerQuestion]);

  const goBack = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        answers: prev.answers.slice(0, -1)
      }));
    }
  }, [state.currentQuestionIndex]);

  const completeTransition = useCallback(() => {
    setState(prev => ({
      ...prev,
      stage: 'results'
    }));
  }, []);

  const restart = useCallback(() => {
    setState({
      stage: 'welcome',
      currentQuestionIndex: 0,
      answers: [],
      result: null
    });
  }, []);

  // DEBUG: Skip directly to results page with mock data
  const debugSkipToResults = useCallback((primaryRealm: RealmKey = 'ember') => {
    const mockScores: Record<RealmKey, number> = {
      abyss: 5, cavern: 8, dross: 3, ember: 25, glare: 12,
      languish: 6, mist: 15, oasis: 10, trace: 7, zenith: 9
    };
    mockScores[primaryRealm] = 30;

    const sortedRealms = Object.entries(mockScores)
      .sort(([, a], [, b]) => b - a)
      .map(([key]) => key as RealmKey);

    const mockResult: QuizResult = {
      primaryRealm: sortedRealms[0],
      primaryScore: mockScores[sortedRealms[0]],
      secondaryRealm: sortedRealms[1],
      secondaryScore: mockScores[sortedRealms[1]],
      tertiaryRealm: sortedRealms[2],
      tertiaryScore: mockScores[sortedRealms[2]],
      fullScores: mockScores,
      confidence: 'strong',
      trio: {
        key: `${sortedRealms[0]}-${sortedRealms[1]}-${sortedRealms[2]}`,
        title: 'Debug Trio',
        insight: 'This is mock data for debugging purposes.'
      },
      timestamp: new Date()
    };

    setState({
      stage: 'results',
      currentQuestionIndex: 0,
      answers: [],
      result: mockResult
    });
  }, []);

  return {
    stage: state.stage,
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    totalQuestions: questions.length,
    progress,
    answers: state.answers,
    canGoBack: state.currentQuestionIndex > 0,
    result: state.result,
    startQuiz,
    selectOption,
    selectSliderValue,
    goBack,
    completeTransition,
    restart,
    debugSkipToResults // DEBUG: Remove later
  };
}
