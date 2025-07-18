import { useState, useEffect, useCallback } from 'react';

const ANALYTICS_KEY = 'oo-textbook-analytics';

/**
 * Custom hook for tracking detailed learning analytics
 * @returns {Object} Analytics tracking utilities
 */
export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(() => {
    try {
      const saved = localStorage.getItem(ANALYTICS_KEY);
      return saved ? JSON.parse(saved) : {
        interactions: {},
        studySessions: [],
        componentUsage: {},
        learningPatterns: {
          timeOfDay: {},
          dayOfWeek: {},
          sessionDurations: []
        },
        conceptDifficulty: {}
      };
    } catch (error) {
      console.error('Error loading analytics:', error);
      return {
        interactions: {},
        studySessions: [],
        componentUsage: {},
        learningPatterns: {
          timeOfDay: {},
          dayOfWeek: {},
          sessionDurations: []
        },
        conceptDifficulty: {}
      };
    }
  });

  // Save analytics to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
    } catch (error) {
      console.error('Error saving analytics:', error);
    }
  }, [analytics]);

  // Track component interaction
  const trackComponentInteraction = useCallback((componentName, chapterId, action = 'used', metadata = {}) => {
    const timestamp = new Date().toISOString();
    const hour = new Date().getHours();
    const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    setAnalytics(prev => {
      const componentKey = `${chapterId}_${componentName}`;
      const usage = prev.componentUsage[componentKey] || {
        name: componentName,
        chapter: chapterId,
        interactions: 0,
        timeSpent: 0,
        completions: 0,
        firstUsed: timestamp,
        lastUsed: timestamp
      };

      // Update learning patterns
      const patterns = { ...prev.learningPatterns };
      if (!patterns.timeOfDay) patterns.timeOfDay = {};
      if (!patterns.dayOfWeek) patterns.dayOfWeek = {};
      patterns.timeOfDay[hour] = (patterns.timeOfDay[hour] || 0) + 1;
      patterns.dayOfWeek[dayOfWeek] = (patterns.dayOfWeek[dayOfWeek] || 0) + 1;

      return {
        ...prev,
        componentUsage: {
          ...prev.componentUsage,
          [componentKey]: {
            ...usage,
            interactions: usage.interactions + 1,
            completions: action === 'completed' ? usage.completions + 1 : usage.completions,
            lastUsed: timestamp,
            ...metadata
          }
        },
        learningPatterns: patterns,
        interactions: {
          ...prev.interactions,
          [timestamp]: {
            component: componentName,
            chapter: chapterId,
            action,
            metadata
          }
        }
      };
    });
  }, []);

  // Track time spent on component
  const trackComponentTime = useCallback((componentName, chapterId, timeSpent) => {
    setAnalytics(prev => {
      const componentKey = `${chapterId}_${componentName}`;
      const usage = prev.componentUsage[componentKey] || {
        name: componentName,
        chapter: chapterId,
        timeSpent: 0
      };

      return {
        ...prev,
        componentUsage: {
          ...prev.componentUsage,
          [componentKey]: {
            ...usage,
            timeSpent: usage.timeSpent + timeSpent
          }
        }
      };
    });
  }, []);

  // Track concept difficulty based on time and quiz performance
  const trackConceptDifficulty = useCallback((chapterId, timeSpent, quizScore) => {
    setAnalytics(prev => {
      const existing = prev.conceptDifficulty[chapterId] || {
        totalTime: 0,
        attempts: 0,
        averageScore: 0
      };

      const newAttempts = existing.attempts + 1;
      const newAverageScore = ((existing.averageScore * existing.attempts) + quizScore) / newAttempts;
      const difficultyScore = calculateDifficultyScore(timeSpent, newAverageScore);

      return {
        ...prev,
        conceptDifficulty: {
          ...prev.conceptDifficulty,
          [chapterId]: {
            totalTime: existing.totalTime + timeSpent,
            attempts: newAttempts,
            averageScore: newAverageScore,
            difficultyScore,
            lastUpdated: new Date().toISOString()
          }
        }
      };
    });
  }, []);

  // Start a new study session
  const startStudySession = useCallback(() => {
    const sessionId = Date.now().toString();
    const session = {
      id: sessionId,
      startTime: new Date().toISOString(),
      endTime: null,
      duration: 0,
      chaptersVisited: [],
      componentsUsed: [],
      quizzesTaken: 0
    };

    setAnalytics(prev => ({
      ...prev,
      studySessions: [...prev.studySessions, session],
      currentSession: sessionId
    }));

    return sessionId;
  }, []);

  // End current study session
  const endStudySession = useCallback((sessionId) => {
    setAnalytics(prev => {
      const sessions = [...prev.studySessions];
      const sessionIndex = sessions.findIndex(s => s.id === sessionId);
      
      if (sessionIndex !== -1) {
        const session = sessions[sessionIndex];
        const endTime = new Date();
        const duration = Math.round((endTime - new Date(session.startTime)) / 1000 / 60); // minutes
        
        sessions[sessionIndex] = {
          ...session,
          endTime: endTime.toISOString(),
          duration
        };

        // Update session durations pattern
        const patterns = { ...prev.learningPatterns };
        if (!patterns.sessionDurations) patterns.sessionDurations = [];
        patterns.sessionDurations.push(duration);
      }

      return {
        ...prev,
        studySessions: sessions,
        currentSession: null
      };
    });
  }, []);

  // Get analytics summary
  const getAnalyticsSummary = useCallback(() => {
    const totalInteractions = Object.keys(analytics.interactions).length;
    const uniqueComponents = new Set(
      Object.values(analytics.componentUsage).map(u => u.name)
    ).size;
    
    const sessionDurations = analytics.learningPatterns?.sessionDurations || [];
    const averageSessionDuration = sessionDurations.length > 0
      ? sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length
      : 0;

    const timeOfDay = analytics.learningPatterns?.timeOfDay || {};
    const dayOfWeek = analytics.learningPatterns?.dayOfWeek || {};
    
    const mostActiveHour = Object.entries(timeOfDay).length > 0
      ? Object.entries(timeOfDay).sort(([, a], [, b]) => b - a)[0]
      : ['N/A', 0];

    const mostActiveDay = Object.entries(dayOfWeek).length > 0
      ? Object.entries(dayOfWeek).sort(([, a], [, b]) => b - a)[0]
      : ['N/A', 0];

    const componentStats = Object.values(analytics.componentUsage)
      .map(comp => ({
        name: comp.name,
        chapter: comp.chapter,
        interactions: comp.interactions,
        completionRate: comp.interactions > 0 ? (comp.completions / comp.interactions) * 100 : 0,
        avgTimeSpent: comp.timeSpent
      }))
      .sort((a, b) => b.interactions - a.interactions);

    return {
      totalInteractions,
      uniqueComponents,
      averageSessionDuration,
      mostActiveHour,
      mostActiveDay,
      componentStats,
      difficultyRankings: Object.entries(analytics.conceptDifficulty || {})
        .map(([chapter, data]) => ({
          chapter,
          ...data
        }))
        .sort((a, b) => (b.difficultyScore || 0) - (a.difficultyScore || 0))
    };
  }, [analytics]);

  return {
    trackComponentInteraction,
    trackComponentTime,
    trackConceptDifficulty,
    startStudySession,
    endStudySession,
    getAnalyticsSummary,
    analytics
  };
};

// Helper function to calculate difficulty score
function calculateDifficultyScore(timeSpent, averageScore) {
  // Higher time and lower score = higher difficulty
  const timeWeight = 0.4;
  const scoreWeight = 0.6;
  
  const normalizedTime = Math.min(timeSpent / 30, 1); // Normalize to 0-1 (30 min max)
  const normalizedScore = 1 - (averageScore / 100); // Invert score (lower score = higher difficulty)
  
  return (normalizedTime * timeWeight + normalizedScore * scoreWeight) * 100;
}