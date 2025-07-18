import React, { useState } from 'react';
import { Plus, Bookmark, StickyNote, X } from 'lucide-react';
import './FloatingActionButton.css';

/**
 * Floating Action Button Component
 * Provides quick access to bookmarks and notes
 */
const FloatingActionButton = ({ onBookmarkClick, onNoteClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleBookmarkClick = () => {
    onBookmarkClick();
    setIsOpen(false);
  };

  const handleNoteClick = () => {
    onNoteClick();
    setIsOpen(false);
  };

  return (
    <div className="fab-container">
      {isOpen && (
        <div className="fab-menu">
          <button
            className="fab-option"
            onClick={handleBookmarkClick}
            title="View Bookmarks"
          >
            <Bookmark size={20} />
            <span>Bookmarks</span>
          </button>
          <button
            className="fab-option"
            onClick={handleNoteClick}
            title="View Notes"
          >
            <StickyNote size={20} />
            <span>Notes</span>
          </button>
        </div>
      )}
      
      <button
        className={`fab-main ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        title={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </button>
    </div>
  );
};

export default FloatingActionButton;