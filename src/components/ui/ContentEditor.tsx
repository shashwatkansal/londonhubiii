import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit3, FiSave, FiX } from "react-icons/fi";

interface ContentEditorProps {
  content: string;
  onSave: (newContent: string) => void;
  multiline?: boolean;
  className?: string;
  editClassName?: string;
  displayClassName?: string;
  enabled?: boolean;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  onSave,
  multiline = false,
  className = "",
  editClassName = "",
  displayClassName = "",
  enabled = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    } else if (e.key === "Enter" && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  if (!enabled) {
    return <div className={displayClassName}>{content}</div>;
  }

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div className={displayClassName}>{content}</div>
            
            {isHovered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setIsEditing(true)}
                className="absolute -top-2 -right-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                aria-label="Edit content"
              >
                <FiEdit3 className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {multiline ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`w-full p-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${editClassName}`}
                autoFocus
                rows={4}
              />
            ) : (
              <input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`w-full p-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${editClassName}`}
                autoFocus
              />
            )}
            
            <div className="absolute -top-2 -right-2 flex gap-1">
              <button
                onClick={handleSave}
                className="p-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
                aria-label="Save"
              >
                <FiSave className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
                aria-label="Cancel"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentEditor;