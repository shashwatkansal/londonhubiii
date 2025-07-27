import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiImage,
  FiFile,
  FiCalendar,
  FiUser,
  FiEye,
  FiClock,
} from 'react-icons/fi';
import { DataTable } from './DataTable';
import { useAuth } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';
import toast from 'react-hot-toast';

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  type: 'page' | 'post' | 'event' | 'announcement';
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  tags?: string[];
}

interface ContentManagerProps {
  onContentChange?: () => void;
}

export const ContentManager: React.FC<ContentManagerProps> = ({ onContentChange }) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [filter, setFilter] = useState<'all' | ContentItem['type']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ContentItem['status']>('all');
  const { user } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'post' as ContentItem['type'],
    content: '',
    excerpt: '',
    featuredImage: '',
    tags: [] as string[],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      // Fetch content from your API/Firebase
      // This is a placeholder - implement actual data fetching
      setContent([]);
    } catch (error) {
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    if (!hasPermission(user?.role || 'member', 'content', 'create')) {
      toast.error('You do not have permission to create content');
      return;
    }
    
    setEditingContent(null);
    setFormData({
      title: '',
      slug: '',
      type: 'post',
      content: '',
      excerpt: '',
      featuredImage: '',
      tags: [],
    });
    setShowEditor(true);
  };

  const handleEdit = (item: ContentItem) => {
    if (!hasPermission(user?.role || 'member', 'content', 'update')) {
      toast.error('You do not have permission to edit content');
      return;
    }
    
    setEditingContent(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      type: item.type,
      content: item.content,
      excerpt: item.excerpt || '',
      featuredImage: item.featuredImage || '',
      tags: item.tags || [],
    });
    setShowEditor(true);
  };

  const handleDelete = async (item: ContentItem) => {
    if (!hasPermission(user?.role || 'member', 'content', 'delete')) {
      toast.error('You do not have permission to delete content');
      return;
    }
    
    if (confirm('Are you sure you want to delete this content?')) {
      try {
        // Implement delete logic
        toast.success('Content deleted successfully');
        fetchContent();
      } catch (error) {
        toast.error('Failed to delete content');
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingContent) {
        // Update existing content
        toast.success('Content updated successfully');
      } else {
        // Create new content
        toast.success('Content created successfully');
      }
      setShowEditor(false);
      fetchContent();
      onContentChange?.();
    } catch (error) {
      toast.error('Failed to save content');
    }
  };

  const handlePublish = async (item: ContentItem) => {
    if (!hasPermission(user?.role || 'member', 'content', 'publish')) {
      toast.error('You do not have permission to publish content');
      return;
    }
    
    try {
      // Implement publish logic
      toast.success('Content published successfully');
      fetchContent();
    } catch (error) {
      toast.error('Failed to publish content');
    }
  };

  const filteredContent = content.filter((item) => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    return true;
  });

  const columns = [
    {
      key: 'title' as keyof ContentItem,
      label: 'Title',
      sortable: true,
      render: (value: string, row: ContentItem) => (
        <div className="flex items-center space-x-2">
          {row.type === 'page' && <FiFile className="text-blue-500" />}
          {row.type === 'post' && <FiEdit2 className="text-green-500" />}
          {row.type === 'event' && <FiCalendar className="text-purple-500" />}
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'status' as keyof ContentItem,
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === 'published'
              ? 'bg-green-100 text-green-800'
              : value === 'draft'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'author' as keyof ContentItem,
      label: 'Author',
      sortable: true,
    },
    {
      key: 'updatedAt' as keyof ContentItem,
      label: 'Last Updated',
      sortable: true,
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
  ];

  const actions = [
    {
      label: 'View',
      icon: <FiEye />,
      onClick: (row: ContentItem) => window.open(`/posts/${row.slug}`, '_blank'),
    },
    {
      label: 'Publish',
      icon: <FiClock />,
      onClick: handlePublish,
      show: (row: ContentItem) => row.status === 'draft' && hasPermission(user?.role || 'member', 'content', 'publish'),
      color: 'success' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Content Management
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your website content, blog posts, and pages
          </p>
        </div>
        
        {hasPermission(user?.role || 'member', 'content', 'create') && (
          <button
            onClick={handleCreate}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 
              text-white rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <FiPlus />
            <span>New Content</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
            bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="page">Pages</option>
          <option value="post">Posts</option>
          <option value="event">Events</option>
          <option value="announcement">Announcements</option>
        </select>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
            bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Content Table */}
      <DataTable
        data={filteredContent}
        columns={columns}
        actions={actions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        searchable
        searchKeys={['title', 'author']}
        selectable
        exportable
      />

      {/* Content Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditor(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              {/* Editor Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingContent ? 'Edit Content' : 'Create New Content'}
                </h3>
                <button
                  onClick={() => setShowEditor(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiX />
                </button>
              </div>

              {/* Editor Form */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="enter-slug"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as ContentItem['type'] })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="post">Post</option>
                      <option value="page">Page</option>
                      <option value="event">Event</option>
                      <option value="announcement">Announcement</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Featured Image
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={formData.featuredImage}
                        onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                          bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Image URL"
                      />
                      <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <FiImage />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                      bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                      bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your content..."
                  />
                </div>
              </div>

              {/* Editor Footer */}
              <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-6 flex items-center justify-end space-x-4">
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 
                    text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  <FiSave />
                  <span>Save</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};