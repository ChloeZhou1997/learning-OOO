import React, { useState } from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { Bookmark, Tag, Search, Download, Upload, X, Filter, ChevronRight } from 'lucide-react';
import './BookmarksPanel.css';

/**
 * Bookmarks Panel Component
 * Displays and manages user bookmarks
 */
const BookmarksPanel = ({ isOpen, onClose, onNavigate }) => {
  const {
    bookmarks,
    removeBookmark,
    updateBookmark,
    searchBookmarks,
    getCategories,
    getAllTags,
    exportBookmarks,
    importBookmarks,
    getSortedBookmarks,
    getBookmarksByCategory
  } = useBookmarks();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [editNote, setEditNote] = useState('');

  const categories = getCategories();
  const allTags = getAllTags();

  // Get filtered bookmarks
  const getFilteredBookmarks = () => {
    let filtered = bookmarks;

    // Apply search filter
    if (searchQuery) {
      filtered = searchBookmarks(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(bookmark => bookmark.category === selectedCategory);
    }

    // Sort bookmarks
    return getSortedBookmarks(sortBy, 'desc').filter(bookmark =>
      filtered.some(f => f.id === bookmark.id)
    );
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const success = importBookmarks(e.target.result);
        if (success) {
          alert('Bookmarks imported successfully!');
        } else {
          alert('Failed to import bookmarks. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleBookmarkClick = (bookmark) => {
    if (onNavigate) {
      onNavigate(bookmark.sectionId);
      onClose();
    }
  };

  const startEditingNote = (bookmark) => {
    setEditingBookmark(bookmark.id);
    setEditNote(bookmark.note || '');
  };

  const saveNote = () => {
    if (editingBookmark) {
      updateBookmark(editingBookmark, { note: editNote });
      setEditingBookmark(null);
      setEditNote('');
    }
  };

  const categoryIcons = {
    important: '⭐',
    reviewLater: '📌',
    difficult: '🔥',
    interesting: '💡',
    general: '📖'
  };

  const categoryLabels = {
    important: 'Important',
    reviewLater: 'Review Later',
    difficult: 'Difficult',
    interesting: 'Interesting',
    general: 'General'
  };

  const filteredBookmarks = getFilteredBookmarks();

  if (!isOpen) return null;

  return (
    <div className="bookmarks-panel-overlay" onClick={onClose}>
      <div className="bookmarks-panel" onClick={(e) => e.stopPropagation()}>
        <div className="bookmarks-header">
          <h2>
            <Bookmark size={20} />
            My Bookmarks
          </h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="bookmarks-controls">
          <div className="search-bar">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <div className="category-filter">
              <Filter size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {categoryIcons[key]} {label} ({categories[key] || 0})
                  </option>
                ))}
              </select>
            </div>

            <div className="sort-control">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Newest First</option>
                <option value="title">By Title</option>
                <option value="updatedAt">Recently Updated</option>
              </select>
            </div>
          </div>

          <div className="import-export">
            <button className="action-button" onClick={exportBookmarks}>
              <Download size={16} />
              Export
            </button>
            <label className="action-button">
              <Upload size={16} />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        <div className="bookmarks-stats">
          <div className="stat">
            <strong>{bookmarks.length}</strong> Total Bookmarks
          </div>
          <div className="stat">
            <strong>{allTags.length}</strong> Tags
          </div>
        </div>

        <div className="bookmarks-list">
          {filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((bookmark) => (
              <div key={bookmark.id} className="bookmark-item">
                <div className="bookmark-header">
                  <div 
                    className="bookmark-title"
                    onClick={() => handleBookmarkClick(bookmark)}
                  >
                    <span className="bookmark-icon">
                      {categoryIcons[bookmark.category || 'general']}
                    </span>
                    <span className="bookmark-text">{bookmark.sectionTitle}</span>
                    <ChevronRight size={16} />
                  </div>
                  <button
                    className="remove-bookmark"
                    onClick={() => removeBookmark(bookmark.id)}
                    title="Remove bookmark"
                  >
                    <X size={16} />
                  </button>
                </div>

                {bookmark.chapterId && (
                  <div className="bookmark-chapter">
                    Chapter: {bookmark.chapterId}
                  </div>
                )}

                <div className="bookmark-meta">
                  <span className="bookmark-date">
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </span>
                  {bookmark.tags && bookmark.tags.length > 0 && (
                    <div className="bookmark-tags">
                      {bookmark.tags.map((tag, index) => (
                        <span key={index} className="bookmark-tag">
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {editingBookmark === bookmark.id ? (
                  <div className="bookmark-note-editor">
                    <textarea
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      placeholder="Add a note..."
                      rows="3"
                    />
                    <div className="note-actions">
                      <button onClick={saveNote}>Save</button>
                      <button onClick={() => setEditingBookmark(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {bookmark.note && (
                      <div className="bookmark-note">{bookmark.note}</div>
                    )}
                    <button
                      className="add-note-button"
                      onClick={() => startEditingNote(bookmark)}
                    >
                      {bookmark.note ? 'Edit Note' : 'Add Note'}
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="empty-bookmarks">
              <Bookmark size={48} />
              <p>No bookmarks found</p>
              <span>Start bookmarking sections to see them here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPanel;