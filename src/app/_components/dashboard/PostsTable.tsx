import { useState, useMemo } from 'react';
import PostPreviewModal from './PostPreviewModal';
import TableSkeleton from './TableSkeleton';
import EmptyState from './EmptyState';

interface Post {
  id: string;
  title: string;
  author: string;
  status: string;
  date: string;
  content?: string;
}

interface PostsTableProps {
  posts: Post[];
  loading?: boolean;
}

const PostsTable = ({ posts, loading }: PostsTableProps) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [previewPost, setPreviewPost] = useState<Post | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredPosts = useMemo(() =>
    posts.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.author.toLowerCase().includes(search.toLowerCase())
    ),
    [posts, search]
  );

  const allSelected =
    filteredPosts.length > 0 && filteredPosts.every((p) => selected.includes(p.id));
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(selected.filter((id) => !filteredPosts.map((p) => p.id).includes(id)));
    } else {
      setSelected([
        ...selected,
        ...filteredPosts.map((p) => p.id).filter((id) => !selected.includes(id)),
      ]);
    }
  };
  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handlePreview = (post: Post) => {
    setPreviewPost({ ...post, content: post.content || 'This is a mock post content for preview.' });
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-64 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {selected.length > 0 && (
        <div className="flex items-center gap-4 mb-4 bg-blue-50 border border-blue-200 rounded px-4 py-2">
          <span className="font-medium">{selected.length} selected</span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">Publish</button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">Unpublish</button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-700 border-b" style={{ minWidth: 40 }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="accent-blue-500"
                  aria-label="Select all posts"
                />
              </th>
              {['Title', 'Author', 'Status', 'Date', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-700 border-b"
                  style={{ minWidth: 100 }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton />
          ) : filteredPosts.length === 0 ? (
            <EmptyState message="No posts found." />
          ) : (
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="transition-colors hover:bg-blue-50">
                  <td className="px-4 py-2 align-middle border-b">
                    <input
                      type="checkbox"
                      checked={selected.includes(post.id)}
                      onChange={() => toggleSelect(post.id)}
                      className="accent-blue-500"
                      aria-label={`Select post ${post.title}`}
                    />
                  </td>
                  <td className="px-4 py-2 align-middle border-b">{post.title}</td>
                  <td className="px-4 py-2 align-middle border-b">{post.author}</td>
                  <td className="px-4 py-2 align-middle border-b capitalize">{post.status}</td>
                  <td className="px-4 py-2 align-middle border-b">{post.date}</td>
                  <td className="px-4 py-2 align-middle border-b">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded transition text-xs"
                      title="Preview"
                      onClick={() => handlePreview(post)}
                      aria-label={`Preview post ${post.title}`}
                    >
                      Preview
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition text-xs ml-2"
                      title="Edit"
                      aria-label={`Edit post ${post.title}`}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <PostPreviewModal post={previewPost} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PostsTable; 