import React from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';
import './BookmarkButton.css';

/**
 * Bookmark Button Component
 * Allows users to bookmark chapters or sections
 */
const BookmarkButton = ({ chapterId, sectionId, title, className = '' }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(chapterId, sectionId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(chapterId, sectionId, title);
  };

  return (
    <button
      className={`bookmark-button ${bookmarked ? 'bookmarked' : ''} ${className}`}
      onClick={handleClick}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <Bookmark size={16} />
    </button>
  );
};

export default BookmarkButton;