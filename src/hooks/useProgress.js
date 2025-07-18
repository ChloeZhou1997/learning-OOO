import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'oo-textbook-progress';

/**
 * Custom hook for tracking and persisting user progress
 * @returns {Object} Progress tracking utilities
 */
export const useProgress = () => {
  const [progress, setProgress] = useState(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      return savedProgress ? JSON.parse(savedProgress) : {
        chaptersRead: {},
        quizScores: {},
        lastVisited: null,
        startDate: new Date().toISOString(),
        totalTimeSpent: 0,
        currentSession: {
          startTime: Date.now(),
          chaptersVisited: []
        }
      };
    } catch (error) {
      console.error('Error loading progress:', error);
      return {
        chaptersRead: {},
        quizScores: {},
        lastVisited: null,
        startDate: new Date().toISOString(),
        totalTimeSpent: 0,
        currentSession: {
          startTime: Date.now(),
          chaptersVisited: []
        }
      };
    }
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [progress]);

  // Track session time
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => ({
        ...prev,
        totalTimeSpent: prev.totalTimeSpent + 1
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const markChapterAsRead = useCallback((chapterId, percentageRead = 100) => {
    setProgress(prev => ({
      ...prev,
      chaptersRead: {
        ...prev.chaptersRead,
        [chapterId]: {
          percentageRead,
          lastRead: new Date().toISOString(),
          timeSpent: (prev.chaptersRead[chapterId]?.timeSpent || 0) + 1
        }
      },
      lastVisited: chapterId,
      currentSession: {
        ...prev.currentSession,
        chaptersVisited: [...new Set([...prev.currentSession.chaptersVisited, chapterId])]
      }
    }));
  }, []);

  const updateQuizScore = useCallback((chapterId, quizId, score, totalQuestions) => {
    setProgress(prev => {
      const chapterQuizzes = prev.quizScores[chapterId] || {};
      const existingQuiz = chapterQuizzes[quizId] || { attempts: 0, bestScore: 0 };
      
      return {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [chapterId]: {
            ...chapterQuizzes,
            [quizId]: {
              attempts: existingQuiz.attempts + 1,
              bestScore: Math.max(existingQuiz.bestScore, score),
              lastScore: score,
              totalQuestions,
              lastAttempt: new Date().toISOString()
            }
          }
        }
      };
    });
  }, []);

  const getChapterProgress = useCallback((chapterId) => {
    return progress.chaptersRead[chapterId] || { percentageRead: 0, timeSpent: 0 };
  }, [progress.chaptersRead]);

  const getQuizProgress = useCallback((chapterId, quizId) => {
    return progress.quizScores[chapterId]?.[quizId] || null;
  }, [progress.quizScores]);

  const getOverallProgress = useCallback(() => {
    const totalChapters = 17; // Including intro and conclusion
    const chaptersCompleted = Object.values(progress.chaptersRead)
      .filter(chapter => chapter.percentageRead >= 80).length;
    
    const quizzesTaken = Object.values(progress.quizScores)
      .reduce((total, chapter) => total + Object.keys(chapter).length, 0);
    
    const averageQuizScore = Object.values(progress.quizScores)
      .flatMap(chapter => Object.values(chapter))
      .reduce((acc, quiz, _, arr) => {
        if (arr.length === 0) return 0;
        return acc + (quiz.bestScore / quiz.totalQuestions) / arr.length;
      }, 0) * 100;

    return {
      percentageComplete: (chaptersCompleted / totalChapters) * 100,
      chaptersCompleted,
      totalChapters,
      quizzesTaken,
      averageQuizScore: averageQuizScore || 0,
      totalTimeSpent: progress.totalTimeSpent,
      currentStreak: calculateStreak(progress.chaptersRead)
    };
  }, [progress]);

  const resetProgress = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setProgress({
        chaptersRead: {},
        quizScores: {},
        lastVisited: null,
        startDate: new Date().toISOString(),
        totalTimeSpent: 0,
        currentSession: {
          startTime: Date.now(),
          chaptersVisited: []
        }
      });
    }
  }, []);

  return {
    progress,
    markChapterAsRead,
    updateQuizScore,
    getChapterProgress,
    getQuizProgress,
    getOverallProgress,
    resetProgress
  };
};

// Helper function to calculate learning streak
function calculateStreak(chaptersRead) {
  const dates = Object.values(chaptersRead)
    .map(chapter => new Date(chapter.lastRead).toDateString())
    .sort((a, b) => new Date(b) - new Date(a));
  
  if (dates.length === 0) return 0;
  
  let streak = 1;
  const today = new Date().toDateString();
  
  if (dates[0] !== today && dates[0] !== new Date(Date.now() - 86400000).toDateString()) {
    return 0;
  }
  
  for (let i = 1; i < dates.length; i++) {
    const currentDate = new Date(dates[i - 1]);
    const previousDate = new Date(dates[i]);
    const diffDays = Math.floor((currentDate - previousDate) / 86400000);
    
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}