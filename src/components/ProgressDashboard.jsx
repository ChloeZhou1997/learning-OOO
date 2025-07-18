import React, { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { Trophy, Target, Clock, TrendingUp, Book, Brain, RotateCcw, Activity } from 'lucide-react';
import AnalyticsDashboard from './AnalyticsDashboard';
import './ProgressDashboard.css';

/**
 * Progress Dashboard Component
 * Displays user's learning progress, achievements, and statistics
 */
const ProgressDashboard = ({ chapters }) => {
  const { progress, getOverallProgress, getChapterProgress, resetProgress } = useProgress();
  const [activeTab, setActiveTab] = useState('progress');
  const overallProgress = getOverallProgress();

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 50) return '#f59e0b';
    return '#6b7280';
  };

  const ChapterProgressItem = ({ chapter }) => {
    const chapterProgress = getChapterProgress(chapter.id);
    const percentage = chapterProgress.percentageRead || 0;
    
    return (
      <div className="chapter-progress-item">
        <div className="chapter-info">
          <span className="chapter-name">{chapter.navTitle}</span>
          <span className="chapter-time">{formatTime(chapterProgress.timeSpent || 0)}</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: getProgressColor(percentage)
            }}
          />
        </div>
        <span className="progress-percentage">{Math.round(percentage)}%</span>
      </div>
    );
  };

  return (
    <div className="progress-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">
          <Trophy size={24} />
          Your Learning Progress
        </h2>
        <div className="header-actions">
          <div className="tab-switcher">
            <button 
              className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              <Trophy size={16} />
              Progress
            </button>
            <button 
              className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <Activity size={16} />
              Analytics
            </button>
          </div>
          <button 
            className="reset-button"
            onClick={resetProgress}
            title="Reset all progress"
          >
            <RotateCcw size={16} />
            Reset Progress
          </button>
        </div>
      </div>

      {activeTab === 'progress' ? (
        <>
          <div className="progress-overview">
            <div className="stat-card">
              <div className="stat-icon">
                <Target size={20} />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{Math.round(overallProgress.percentageComplete)}%</h3>
                <p className="stat-label">Overall Progress</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Book size={20} />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{overallProgress.chaptersCompleted}/{overallProgress.totalChapters}</h3>
                <p className="stat-label">Chapters Completed</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Brain size={20} />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{Math.round(overallProgress.averageQuizScore)}%</h3>
                <p className="stat-label">Average Quiz Score</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Clock size={20} />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{formatTime(overallProgress.totalTimeSpent)}</h3>
                <p className="stat-label">Time Invested</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp size={20} />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{overallProgress.currentStreak}</h3>
                <p className="stat-label">Day Streak</p>
              </div>
            </div>
          </div>

          <div className="chapter-progress-section">
            <h3 className="section-title">Chapter Progress</h3>
            <div className="chapter-progress-list">
              {chapters.map(chapter => (
                <ChapterProgressItem key={chapter.id} chapter={chapter} />
              ))}
            </div>
          </div>

          <div className="progress-insights">
            <h3 className="section-title">Learning Insights</h3>
            <div className="insights-grid">
              {overallProgress.percentageComplete < 20 && (
                <div className="insight-card">
                  <p>🚀 <strong>Just getting started!</strong> Keep up the momentum and aim to complete at least one chapter per day.</p>
                </div>
              )}
              {overallProgress.averageQuizScore < 70 && overallProgress.quizzesTaken > 0 && (
                <div className="insight-card">
                  <p>📚 <strong>Room for improvement:</strong> Consider reviewing chapters before taking quizzes. Your average quiz score is {Math.round(overallProgress.averageQuizScore)}%.</p>
                </div>
              )}
              {overallProgress.currentStreak >= 3 && (
                <div className="insight-card success">
                  <p>🔥 <strong>{overallProgress.currentStreak} day streak!</strong> You're building a great learning habit. Keep it up!</p>
                </div>
              )}
              {overallProgress.chaptersCompleted >= 5 && (
                <div className="insight-card success">
                  <p>🎯 <strong>Making great progress!</strong> You've completed {overallProgress.chaptersCompleted} chapters. You're well on your way to mastering OOP!</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <AnalyticsDashboard />
      )}
    </div>
  );
};

export default ProgressDashboard;