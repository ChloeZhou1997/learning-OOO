import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { BarChart, Clock, TrendingUp, Brain, Calendar, Activity } from 'lucide-react';
import './AnalyticsDashboard.css';

/**
 * Analytics Dashboard Component
 * Visualizes learning patterns, component usage, and study habits
 */
const AnalyticsDashboard = () => {
  const { getAnalyticsSummary } = useAnalytics();
  const summary = getAnalyticsSummary();

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${Math.round(minutes)}m`;
    return `${(minutes / 60).toFixed(1)}h`;
  };

  // Prepare data for time of day chart
  const timeOfDayData = Array.from({ length: 24 }, (_, hour) => ({
    hour: hour.toString().padStart(2, '0') + ':00',
    value: 0
  }));

  // Create a simple bar chart visualization
  const BarChartVisualization = ({ data, maxValue }) => {
    return (
      <div className="bar-chart">
        {data.map((item, index) => (
          <div key={index} className="bar-container">
            <div 
              className="bar" 
              style={{ 
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.value > 0 ? '#7c3aed' : '#e5e7eb'
              }}
            />
            <span className="bar-label">{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="analytics-dashboard">
      <h2 className="dashboard-title">
        <Activity size={24} style={{ color: '#7c3aed', stroke: '#7c3aed' }} />
        Learning Analytics
      </h2>

      <div className="analytics-grid">
        {/* Summary Stats */}
        <div className="analytics-card">
          <div className="card-header">
            <TrendingUp size={20} style={{ color: '#7c3aed', stroke: '#7c3aed' }} />
            <h3>Learning Summary</h3>
          </div>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-value">{summary.totalInteractions}</span>
              <span className="stat-label">Total Interactions</span>
            </div>
            <div className="stat">
              <span className="stat-value">{summary.uniqueComponents}</span>
              <span className="stat-label">Components Used</span>
            </div>
            <div className="stat">
              <span className="stat-value">{formatDuration(summary.averageSessionDuration)}</span>
              <span className="stat-label">Avg Session</span>
            </div>
          </div>
        </div>

        {/* Study Patterns */}
        <div className="analytics-card">
          <div className="card-header">
            <Clock size={20} style={{ color: '#7c3aed', stroke: '#7c3aed' }} />
            <h3>Study Patterns</h3>
          </div>
          <div className="pattern-info">
            <div className="pattern-item">
              <span className="pattern-label">Most Active Hour:</span>
              <span className="pattern-value">
                {summary.mostActiveHour[0]}:00 ({summary.mostActiveHour[1]} sessions)
              </span>
            </div>
            <div className="pattern-item">
              <span className="pattern-label">Preferred Day:</span>
              <span className="pattern-value">
                {summary.mostActiveDay[0]} ({summary.mostActiveDay[1]} sessions)
              </span>
            </div>
          </div>
        </div>

        {/* Component Usage */}
        <div className="analytics-card full-width">
          <div className="card-header">
            <BarChart size={20} style={{ color: '#7c3aed', stroke: '#7c3aed' }} />
            <h3>Interactive Component Usage</h3>
          </div>
          {summary.componentStats.length > 0 ? (
            <div className="component-usage-list">
              {summary.componentStats.slice(0, 5).map((comp, index) => (
                <div key={index} className="component-item">
                  <div className="component-info">
                    <span className="component-name">{comp.name}</span>
                    <span className="component-chapter">Chapter: {comp.chapter}</span>
                  </div>
                  <div className="component-stats">
                    <span className="interaction-count">{comp.interactions} interactions</span>
                    <span className="completion-rate">
                      {comp.completionRate.toFixed(0)}% completion
                    </span>
                  </div>
                  <div className="usage-bar">
                    <div 
                      className="usage-fill"
                      style={{ width: `${(comp.interactions / summary.componentStats[0].interactions) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No component usage data yet. Start interacting with the lessons!</p>
          )}
        </div>

        {/* Difficulty Rankings */}
        <div className="analytics-card">
          <div className="card-header">
            <Brain size={20} style={{ color: '#7c3aed', stroke: '#7c3aed' }} />
            <h3>Chapter Difficulty</h3>
          </div>
          {summary.difficultyRankings.length > 0 ? (
            <div className="difficulty-list">
              {summary.difficultyRankings.slice(0, 5).map((item, index) => (
                <div key={index} className="difficulty-item">
                  <span className="difficulty-rank">#{index + 1}</span>
                  <span className="difficulty-chapter">{item.chapter}</span>
                  <div className="difficulty-indicator">
                    <div 
                      className="difficulty-bar"
                      style={{ 
                        width: `${item.difficultyScore}%`,
                        backgroundColor: item.difficultyScore > 70 ? '#ef4444' : 
                                       item.difficultyScore > 40 ? '#f59e0b' : '#10b981'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">Complete quizzes to see difficulty rankings</p>
          )}
        </div>

        {/* Learning Velocity */}
        <div className="analytics-card">
          <div className="card-header">
            <Calendar size={20} style={{ color: '#7c3aed', stroke: '#7c3aed' }} />
            <h3>Learning Insights</h3>
          </div>
          <div className="insights-list">
            <div className="insight">
              <span className="insight-icon">📚</span>
              <span className="insight-text">
                You learn best during {summary.mostActiveHour[0]}:00
              </span>
            </div>
            <div className="insight">
              <span className="insight-icon">⏱️</span>
              <span className="insight-text">
                Your sessions average {formatDuration(summary.averageSessionDuration)}
              </span>
            </div>
            <div className="insight">
              <span className="insight-icon">🎯</span>
              <span className="insight-text">
                Focus on interactive exercises for better retention
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;