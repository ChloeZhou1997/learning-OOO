import { useState, useEffect, useCallback } from 'react';

const NOTES_KEY = 'oo-textbook-notes';

/**
 * Custom hook for managing notes
 * @returns {Object} Note-taking utilities
 */
export const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(NOTES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  });

  // Save notes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  }, [notes]);

  /**
   * Add a new note
   * @param {Object} note - Note object
   * @param {string} note.chapterId - Chapter ID
   * @param {string} note.sectionId - Section ID (optional)
   * @param {string} note.content - Note content
   * @param {string} note.category - Category (question, important, review, etc.)
   * @param {Object} note.position - Position in content (optional)
   */
  const addNote = useCallback((note) => {
    const newNote = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      ...note
    };

    setNotes(prev => [...prev, newNote]);
    return newNote.id;
  }, []);

  /**
   * Update a note
   * @param {string} noteId - Note ID
   * @param {Object} updates - Updates to apply
   */
  const updateNote = useCallback((noteId, updates) => {
    setNotes(prev => prev.map(n => 
      n.id === noteId 
        ? { ...n, ...updates, updatedAt: new Date().toISOString() } 
        : n
    ));
  }, []);

  /**
   * Delete a note
   * @param {string} noteId - Note ID to delete
   */
  const deleteNote = useCallback((noteId) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  }, []);

  /**
   * Get notes for a specific chapter
   * @param {string} chapterId - Chapter ID
   */
  const getChapterNotes = useCallback((chapterId) => {
    return notes.filter(n => n.chapterId === chapterId);
  }, [notes]);

  /**
   * Get notes by category
   * @param {string} category - Category to filter by
   */
  const getNotesByCategory = useCallback((category) => {
    return notes.filter(n => n.category === category);
  }, [notes]);

  /**
   * Search notes
   * @param {string} query - Search query
   */
  const searchNotes = useCallback((query) => {
    const lowerQuery = query.toLowerCase();
    return notes.filter(n => 
      n.content.toLowerCase().includes(lowerQuery) ||
      n.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [notes]);

  /**
   * Add tags to a note
   * @param {string} noteId - Note ID
   * @param {string[]} tags - Tags to add
   */
  const addTags = useCallback((noteId, tags) => {
    setNotes(prev => prev.map(n => {
      if (n.id === noteId) {
        const uniqueTags = [...new Set([...n.tags, ...tags])];
        return { ...n, tags: uniqueTags, updatedAt: new Date().toISOString() };
      }
      return n;
    }));
  }, []);

  /**
   * Remove tag from a note
   * @param {string} noteId - Note ID
   * @param {string} tag - Tag to remove
   */
  const removeTag = useCallback((noteId, tag) => {
    setNotes(prev => prev.map(n => {
      if (n.id === noteId) {
        return { 
          ...n, 
          tags: n.tags.filter(t => t !== tag),
          updatedAt: new Date().toISOString() 
        };
      }
      return n;
    }));
  }, []);

  /**
   * Export notes as markdown
   * @param {string} chapterId - Optional chapter ID to export only chapter notes
   */
  const exportNotesAsMarkdown = useCallback((chapterId = null) => {
    const notesToExport = chapterId 
      ? notes.filter(n => n.chapterId === chapterId)
      : notes;

    const grouped = notesToExport.reduce((acc, note) => {
      if (!acc[note.chapterId]) {
        acc[note.chapterId] = [];
      }
      acc[note.chapterId].push(note);
      return acc;
    }, {});

    let markdown = '# OO Textbook Notes\n\n';
    markdown += `_Exported on ${new Date().toLocaleString()}_\n\n`;

    Object.entries(grouped).forEach(([chapterId, chapterNotes]) => {
      markdown += `## ${chapterId}\n\n`;
      
      chapterNotes.forEach(note => {
        markdown += `### ${note.category.toUpperCase()}\n`;
        if (note.tags.length > 0) {
          markdown += `**Tags:** ${note.tags.join(', ')}\n`;
        }
        markdown += `**Created:** ${new Date(note.createdAt).toLocaleString()}\n\n`;
        markdown += `${note.content}\n\n`;
        markdown += '---\n\n';
      });
    });

    return markdown;
  }, [notes]);

  /**
   * Export notes as JSON
   */
  const exportNotesAsJSON = useCallback(() => {
    return JSON.stringify(notes, null, 2);
  }, [notes]);

  /**
   * Import notes from JSON
   * @param {string} jsonData - JSON string of notes
   */
  const importNotesFromJSON = useCallback((jsonData) => {
    try {
      const importedNotes = JSON.parse(jsonData);
      if (Array.isArray(importedNotes)) {
        setNotes(prev => [...prev, ...importedNotes]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing notes:', error);
      return false;
    }
  }, []);

  /**
   * Clear all notes
   */
  const clearAllNotes = useCallback(() => {
    if (window.confirm('Are you sure you want to delete all notes? This cannot be undone.')) {
      setNotes([]);
    }
  }, []);

  /**
   * Get all unique categories
   */
  const getCategories = useCallback(() => {
    const categories = new Set(notes.map(n => n.category || 'general'));
    return Array.from(categories);
  }, [notes]);

  /**
   * Get all unique tags
   */
  const getAllTags = useCallback(() => {
    const tags = new Set();
    notes.forEach(n => {
      if (n.tags && Array.isArray(n.tags)) {
        n.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [notes]);

  /**
   * Get note statistics
   */
  const getNoteStatistics = useCallback(() => {
    const stats = {
      total: notes.length,
      byCategory: {},
      byChapter: {},
      recentNotes: notes
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5)
    };

    notes.forEach(note => {
      // Count by category
      const category = note.category || 'general';
      stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

      // Count by chapter
      stats.byChapter[note.chapterId] = (stats.byChapter[note.chapterId] || 0) + 1;
    });

    return stats;
  }, [notes]);

  /**
   * Get sorted notes
   */
  const getSortedNotes = useCallback((sortBy = 'updatedAt') => {
    const sorted = [...notes];
    switch (sortBy) {
      case 'updatedAt':
        return sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      case 'createdAt':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'chapter':
        return sorted.sort((a, b) => a.chapterId.localeCompare(b.chapterId));
      default:
        return sorted;
    }
  }, [notes]);

  /**
   * Import notes (wrapper for importNotesFromJSON)
   */
  const importNotes = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      importNotesFromJSON(e.target.result);
    };
    reader.readAsText(file);
  }, [importNotesFromJSON]);

  /**
   * Remove note (alias for deleteNote)
   */
  const removeNote = deleteNote;

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    removeNote,
    getChapterNotes,
    getNotesByCategory,
    searchNotes,
    addTags,
    removeTag,
    exportNotesAsMarkdown,
    exportNotesAsJSON,
    importNotesFromJSON,
    importNotes,
    clearAllNotes,
    getCategories,
    getAllTags,
    getNoteStatistics,
    getSortedNotes
  };
};