import { useEffect, useState } from 'react';
import DashboardLayout from '../../_components/dashboard/DashboardLayout';
import PostsTable from '../../_components/dashboard/PostsTable';
import { postsHelpers, Post } from '@/app/database/models';

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const allPosts = await postsHelpers.getAll();
        setPosts(allPosts);
      } catch (error) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Adapt posts for PostsTable (flatten authors, status, date)
  const tablePosts = posts.map((post) => ({
    id: post.slug || (post as any).id,
    title: post.title,
    author: post.authors && post.authors.length > 0 ? post.authors[0].name : 'Unknown',
    status: post.status,
    date: post.date && typeof post.date.toDate === 'function' ? post.date.toDate().toISOString().slice(0, 10) : '',
    content: typeof post.content === 'string' ? post.content : '',
  }));

  return (
    <DashboardLayout>
      <PostsTable posts={tablePosts} loading={loading} />
    </DashboardLayout>
  );
};

export default PostsPage; 