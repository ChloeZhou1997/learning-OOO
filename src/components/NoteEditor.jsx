import React, { useState, useRef, useEffect } from 'react';
import { X, Bold, Italic, Code, List, Hash, Save } from 'lucide-react';
import './NoteEditor.css';

/**
 * Note Editor Component
 * Rich text editor for creating and editing notes
 */
const NoteEditor = ({ note, onSave, onClose, allTags }) => {
  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content || '');
  const [tags, setTags] = useState(note.tags || []);
  const [category, setCategory] = useState(note.category || 'general');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [tagInput, setTagInput] = useState('');
  
  const contentRef = useRef(null);
  const tagInputRef = useRef(null);

  useEffect(() => {
    // Focus on title or content when editor opens
    if (!note.title && contentRef.current) {
      contentRef.current.focus();
    }
  }, [note.title]);

  const handleSave = () => {
    onSave(note.id, content, title, tags, category);
  };

  const handleKeyDown = (e) => {
    // Save on Ctrl/Cmd + S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
    // Close on Escape
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const applyFormatting = (format) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = '';
    let cursorOffset = 0;

    switch (format) {
      case 'bold':
        newText = `**${selectedText}**`;
        cursorOffset = selectedText ? newText.length : 2;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        cursorOffset = selectedText ? newText.length : 1;
        break;
      case 'code':
        if (selectedText.includes('\n')) {
          newText = `\`\`\`\n${selectedText}\n\`\`\``;
          cursorOffset = 4;
        } else {
          newText = `\`${selectedText}\``;
          cursorOffset = selectedText ? newText.length : 1;
        }
        break;
      case 'list':
        const lines = selectedText.split('\n');
        newText = lines.map(line => `- ${line}`).join('\n');
        cursorOffset = 2;
        break;
      case 'heading':
        newText = `## ${selectedText}`;
        cursorOffset = 3;
        break;
      default:
        return;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);

    // Restore focus and set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
    }, 0);
  };

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput('');
    setShowTagSuggestions(false);
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag(tagInput.trim());
    }
  };

  const filteredTagSuggestions = tagInput
    ? allTags.filter(tag => 
        tag.toLowerCase().includes(tagInput.toLowerCase()) && 
        !tags.includes(tag)
      )
    : [];

  const categoryOptions = [
    { value: 'general', label: '📝 General' },
    { value: 'summary', label: '📋 Summary' },
    { value: 'question', label: '❓ Question' },
    { value: 'idea', label: '💡 Idea' },
    { value: 'important', label: '⭐ Important' },
    { value: 'review', label: '🔄 Review' }
  ];

  return (
    <div className="note-editor-overlay" onKeyDown={handleKeyDown}>
      <div className="note-editor">
        <div className="editor-header">
          <input
            type="text"
            className="note-title-input"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="close-editor" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="editor-toolbar">
          <button
            className="toolbar-button"
            onClick={() => applyFormatting('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </button>
          <button
            className="toolbar-button"
            onClick={() => applyFormatting('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </button>
          <button
            className="toolbar-button"
            onClick={() => applyFormatting('code')}
            title="Code"
          >
            <Code size={16} />
          </button>
          <button
            className="toolbar-button"
            onClick={() => applyFormatting('list')}
            title="List"
          >
            <List size={16} />
          </button>
          <button
            className="toolbar-button"
            onClick={() => applyFormatting('heading')}
            title="Heading"
          >
            <Hash size={16} />
          </button>
          
          <div className="toolbar-separator" />
          
          <select
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <textarea
          ref={contentRef}
          className="note-content-editor"
          placeholder="Start writing your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="editor-footer">
          <div className="tags-section">
            <div className="tags-list">
              {tags.map((tag, index) => (
                <span key={index} className="tag-chip">
                  {tag}
                  <button
                    className="remove-tag"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
              <div className="tag-input-wrapper">
                <input
                  ref={tagInputRef}
                  type="text"
                  className="tag-input"
                  placeholder="Add tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  onFocus={() => setShowTagSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
                />
                {showTagSuggestions && filteredTagSuggestions.length > 0 && (
                  <div className="tag-suggestions">
                    {filteredTagSuggestions.slice(0, 5).map((tag, index) => (
                      <button
                        key={index}
                        className="tag-suggestion"
                        onClick={() => handleAddTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="editor-actions">
            <div className="note-info">
              {note.chapterTitle && (
                <span className="note-location">{note.chapterTitle}</span>
              )}
              <span className="word-count">
                {content.split(/\s+/).filter(word => word.length > 0).length} words
              </span>
            </div>
            <button className="save-button" onClick={handleSave}>
              <Save size={16} />
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;