import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit3, FiX, FiSave } from "react-icons/fi";
import { Button } from "@/components/ui";

interface AdminPanelProps {
  isEditMode: boolean;
  toggleEditMode: () => void;
  hasUnsavedChanges?: boolean;
  onSaveAll?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  isEditMode,
  toggleEditMode,
  hasUnsavedChanges = false,
  onSaveAll,
}) => {
  // Only show in development or with admin flag
  const showAdminPanel = process.env.NODE_ENV === "development" || 
    (typeof window !== "undefined" && window.location.search.includes("admin=true"));

  if (!showAdminPanel) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-20 left-4 z-50"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <Button
              onClick={toggleEditMode}
              variant={isEditMode ? "error" : "primary"}
              size="sm"
              className="flex items-center gap-2"
            >
              {isEditMode ? (
                <>
                  <FiX className="w-4 h-4" />
                  Exit Edit Mode
                </>
              ) : (
                <>
                  <FiEdit3 className="w-4 h-4" />
                  Edit Mode
                </>
              )}
            </Button>

            {isEditMode && hasUnsavedChanges && onSaveAll && (
              <Button
                onClick={onSaveAll}
                variant="success"
                size="sm"
                className="flex items-center gap-2"
              >
                <FiSave className="w-4 h-4" />
                Save All
              </Button>
            )}
          </div>

          {isEditMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <p className="text-sm text-gray-600">
                Click on any editable content to modify it. Changes are saved automatically.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;