import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { FileText, Tag, Search, Download, Plus, X, Filter, Calendar, Hash } from 'lucide-react';
import NoteEditor from './NoteEditor';
import './NotesPanel.css';

/**
 * Notes Panel Component
 * Displays and manages user notes
 */
const NotesPanel = ({ isOpen, onClose, currentChapter, currentSection }) => {
  const {
    notes,
    addNote,
    removeNote,
    updateNote,
    searchNotes,
    getCategories,
    getAllTags,
    getNoteStatistics,
    exportNotesAsMarkdown,
    exportNotesAsJSON,
    importNotes,
    getSortedNotes
  } = useNotes();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const categories = getCategories();
  const allTags = getAllTags();
  const statistics = getNoteStatistics();

  // Get filtered notes
  const getFilteredNotes = () => {
    let filtered = notes;

    // Apply tab filter
    if (activeTab === 'chapter' && currentChapter) {
      filtered = filtered.filter(note => note.chapterId === currentChapter);
    } else if (activeTab === 'section' && currentSection) {
      filtered = filtered.filter(note => note.sectionId === currentSection);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = searchNotes(searchQuery).filter(note =>
        filtered.some(f => f.id === note.id)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }

    // Sort notes
    return getSortedNotes(sortBy).filter(note =>
      filtered.some(f => f.id === note.id)
    );
  };

  const handleCreateNote = () => {
    const newNoteId = addNote({
      chapterId: currentChapter || 'general',
      sectionId: currentSection,
      chapterTitle: currentChapter,
      sectionTitle: currentSection,
      content: '',
      category: 'general'
    });
    const newNote = notes.find(n => n.id === newNoteId) || {
      id: newNoteId,
      chapterId: currentChapter || 'general',
      sectionId: currentSection,
      chapterTitle: currentChapter,
      sectionTitle: currentSection,
      content: '',
      category: 'general'
    };
    setEditingNote(newNote);
    setShowEditor(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = (noteId, content, title, tags, category) => {
    updateNote(noteId, { content, title, tags, category });
    setShowEditor(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      removeNote(noteId);
      if (editingNote?.id === noteId) {
        setShowEditor(false);
        setEditingNote(null);
      }
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      importNotes(file);
    }
  };

  const categoryIcons = {
    general: '📝',
    summary: '📋',
    question: '❓',
    idea: '💡',
    important: '⭐',
    review: '🔄'
  };

  const categoryLabels = {
    general: 'General',
    summary: 'Summary',
    question: 'Question',
    idea: 'Idea',
    important: 'Important',
    review: 'Review'
  };

  const filteredNotes = getFilteredNotes();

  if (!isOpen) return null;

  return (
    <div className="notes-panel-overlay" onClick={onClose}>
      <div className="notes-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notes-header">
          <h2>
            <FileText size={20} />
            My Notes
          </h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="notes-tabs">
          <button
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Notes ({notes.length})
          </button>
          {currentChapter && (
            <button
              className={`tab ${activeTab === 'chapter' ? 'active' : ''}`}
              onClick={() => setActiveTab('chapter')}
            >
              This Chapter ({notes.filter(n => n.chapterId === currentChapter).length})
            </button>
          )}
          {currentSection && (
            <button
              className={`tab ${activeTab === 'section' ? 'active' : ''}`}
              onClick={() => setActiveTab('section')}
            >
              This Section ({notes.filter(n => n.sectionId === currentSection).length})
            </button>
          )}
        </div>

        <div className="notes-controls">
          <div className="search-bar">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-row">
            <div className="category-filter">
              <Filter size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {categoryIcons[key]} {label} ({notes.filter(n => n.category === key).length})
                  </option>
                ))}
              </select>
            </div>

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="updatedAt">Recently Updated</option>
              <option value="createdAt">Newest First</option>
              <option value="title">By Title</option>
              <option value="content">By Length</option>
            </select>
          </div>

          <div className="action-buttons">
            <button className="primary-button" onClick={handleCreateNote}>
              <Plus size={16} />
              New Note
            </button>
            <button className="secondary-button" onClick={() => exportNotesAsMarkdown()}>
              <Download size={16} />
              Export MD
            </button>
            <button className="secondary-button" onClick={() => exportNotesAsJSON()}>
              <Download size={16} />
              Export JSON
            </button>
          </div>
        </div>

        <div className="notes-stats">
          <div className="stat">
            <Hash size={16} />
            <strong>{statistics.total || 0}</strong> notes
          </div>
          <div className="stat">
            <FileText size={16} />
            <strong>{notes.reduce((total, note) => total + (note.content?.split(' ').length || 0), 0)}</strong> words
          </div>
          <div className="stat">
            <Tag size={16} />
            <strong>{allTags.length}</strong> tags
          </div>
        </div>

        <div className="notes-list">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note.id} className="note-item" onClick={() => handleEditNote(note)}>
                <div className="note-header">
                  <div className="note-title-row">
                    <span className="note-icon">
                      {categoryIcons[note.category || 'general']}
                    </span>
                    {note.title ? (
                      <h4 className="note-title">{note.title}</h4>
                    ) : (
                      <h4 className="note-title untitled">Untitled Note</h4>
                    )}
                  </div>
                  <button
                    className="delete-note"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                    title="Delete note"
                  >
                    <X size={16} />
                  </button>
                </div>

                {note.content && (
                  <div className="note-preview">
                    {note.content.substring(0, 150)}
                    {note.content.length > 150 && '...'}
                  </div>
                )}

                <div className="note-meta">
                  <span className="note-date">
                    <Calendar size={12} />
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                  {note.chapterTitle && (
                    <span className="note-location">{note.chapterTitle}</span>
                  )}
                  {note.tags && note.tags.length > 0 && (
                    <div className="note-tags">
                      {note.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="note-tag">
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 3 && (
                        <span className="note-tag">+{note.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-notes">
              <FileText size={48} />
              <p>No notes found</p>
              <span>Create your first note to get started</span>
            </div>
          )}
        </div>

        {showEditor && editingNote && (
          <NoteEditor
            note={editingNote}
            onSave={handleSaveNote}
            onClose={() => {
              setShowEditor(false);
              setEditingNote(null);
            }}
            allTags={allTags}
          />
        )}
      </div>
    </div>
  );
};

export default NotesPanel;