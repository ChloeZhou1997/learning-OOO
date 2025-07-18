import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_KEY = 'oo-textbook-bookmarks';

/**
 * Custom hook for managing bookmarks
 * @returns {Object} Bookmarking utilities
 */
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return [];
    }
  });

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }, [bookmarks]);

  /**
   * Add a new bookmark
   * @param {Object} bookmark - Bookmark object
   * @param {string} bookmark.chapterId - Chapter ID
   * @param {string} bookmark.sectionId - Section ID (optional)
   * @param {string} bookmark.title - Bookmark title
   * @param {string} bookmark.label - Custom label
   * @param {string} bookmark.category - Category (important, review, difficult, etc.)
   */
  const addBookmark = useCallback((bookmark) => {
    const newBookmark = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...bookmark
    };

    setBookmarks(prev => [...prev, newBookmark]);
    return newBookmark.id;
  }, []);

  /**
   * Remove a bookmark by ID
   * @param {string} bookmarkId - Bookmark ID to remove
   */
  const removeBookmark = useCallback((bookmarkId) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  }, []);

  /**
   * Toggle bookmark for a chapter/section
   * @param {string} chapterId - Chapter ID
   * @param {string} sectionId - Section ID (optional)
   * @param {string} title - Default title
   */
  const toggleBookmark = useCallback((chapterId, sectionId, title) => {
    const existing = bookmarks.find(b => 
      b.chapterId === chapterId && 
      ((!sectionId && !b.sectionId) || b.sectionId === sectionId)
    );

    if (existing) {
      removeBookmark(existing.id);
      return false;
    } else {
      addBookmark({
        chapterId,
        sectionId,
        title,
        label: '',
        category: 'general'
      });
      return true;
    }
  }, [bookmarks, addBookmark, removeBookmark]);

  /**
   * Check if a chapter/section is bookmarked
   * @param {string} chapterId - Chapter ID
   * @param {string} sectionId - Section ID (optional)
   */
  const isBookmarked = useCallback((chapterId, sectionId) => {
    return bookmarks.some(b => 
      b.chapterId === chapterId && 
      ((!sectionId && !b.sectionId) || b.sectionId === sectionId)
    );
  }, [bookmarks]);

  /**
   * Update a bookmark
   * @param {string} bookmarkId - Bookmark ID
   * @param {Object} updates - Updates to apply
   */
  const updateBookmark = useCallback((bookmarkId, updates) => {
    setBookmarks(prev => prev.map(b => 
      b.id === bookmarkId ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b
    ));
  }, []);

  /**
   * Get bookmarks for a specific chapter
   * @param {string} chapterId - Chapter ID
   */
  const getChapterBookmarks = useCallback((chapterId) => {
    return bookmarks.filter(b => b.chapterId === chapterId);
  }, [bookmarks]);

  /**
   * Get bookmarks by category
   * @param {string} category - Category to filter by
   */
  const getBookmarksByCategory = useCallback((category) => {
    return bookmarks.filter(b => b.category === category);
  }, [bookmarks]);

  /**
   * Search bookmarks
   * @param {string} query - Search query
   */
  const searchBookmarks = useCallback((query) => {
    const lowerQuery = query.toLowerCase();
    return bookmarks.filter(b => 
      b.title.toLowerCase().includes(lowerQuery) ||
      b.label.toLowerCase().includes(lowerQuery) ||
      b.category.toLowerCase().includes(lowerQuery)
    );
  }, [bookmarks]);

  /**
   * Clear all bookmarks
   */
  const clearAllBookmarks = useCallback(() => {
    if (window.confirm('Are you sure you want to remove all bookmarks?')) {
      setBookmarks([]);
    }
  }, []);

  /**
   * Get all unique categories
   */
  const getCategories = useCallback(() => {
    const categories = new Set(bookmarks.map(b => b.category || 'general'));
    return Array.from(categories);
  }, [bookmarks]);

  /**
   * Get all unique tags
   */
  const getAllTags = useCallback(() => {
    const tags = new Set();
    bookmarks.forEach(b => {
      if (b.tags && Array.isArray(b.tags)) {
        b.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [bookmarks]);

  /**
   * Export bookmarks
   */
  const exportBookmarks = useCallback(() => {
    const dataStr = JSON.stringify(bookmarks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `bookmarks_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [bookmarks]);

  /**
   * Import bookmarks
   */
  const importBookmarks = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          setBookmarks(prev => [...prev, ...imported]);
        }
      } catch (error) {
        console.error('Error importing bookmarks:', error);
      }
    };
    reader.readAsText(file);
  }, []);

  /**
   * Get sorted bookmarks
   */
  const getSortedBookmarks = useCallback((sortBy = 'createdAt') => {
    const sorted = [...bookmarks];
    switch (sortBy) {
      case 'createdAt':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'chapter':
        return sorted.sort((a, b) => a.chapterId.localeCompare(b.chapterId));
      default:
        return sorted;
    }
  }, [bookmarks]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    updateBookmark,
    getChapterBookmarks,
    getBookmarksByCategory,
    searchBookmarks,
    clearAllBookmarks,
    getCategories,
    getAllTags,
    exportBookmarks,
    importBookmarks,
    getSortedBookmarks
  };
};