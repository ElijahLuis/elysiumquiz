import { useState, useCallback } from 'react';
import type { Answer, QuizResult, QuizStage, SliderQuestion, ChoiceQuestion, RealmKey, UserRegistration } from '../data/types';
import { questions } from '../data/questions';
import { determineResult } from '../utils/scoring';

interface QuizState {
  stage: QuizStage;
  currentQuestionIndex: number;
  answers: Answer[];
  result: QuizResult | null;
  user: UserRegistration | null;
}

export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    stage: 'welcome',
    currentQuestionIndex: 0,
    answers: [],
    result: null,
    user: null
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
          stage: 'teaser'
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

  const proceedToRegistration = useCallback(() => {
    setState(prev => ({
      ...prev,
      stage: 'registration'
    }));
  }, []);

  const register = useCallback((displayName: string, email?: string) => {
    if (!state.result) return;

    const user: UserRegistration = {
      displayName,
      email,
      quizResult: state.result,
      timestamp: new Date()
    };

    // Save to localStorage
    const existingUsers = JSON.parse(localStorage.getItem('elysiumUsers') || '[]');
    existingUsers.push(user);
    localStorage.setItem('elysiumUsers', JSON.stringify(existingUsers));
    localStorage.setItem('currentUser', JSON.stringify(user));

    setState(prev => ({
      ...prev,
      user,
      stage: 'results'
    }));
  }, [state.result]);

  const skipRegistration = useCallback(() => {
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
      result: null,
      user: null
    });
  }, []);

  return {
    stage: state.stage,
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    totalQuestions: questions.length,
    progress,
    canGoBack: state.currentQuestionIndex > 0,
    result: state.result,
    user: state.user,
    startQuiz,
    selectOption,
    selectSliderValue,
    goBack,
    proceedToRegistration,
    register,
    skipRegistration,
    restart
  };
}
