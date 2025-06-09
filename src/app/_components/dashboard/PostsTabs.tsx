import { useEffect, useState } from 'react';
import { postsHelpers, Post as FirebasePost } from '@/app/database/models';
import Tabs from './Tabs';
import PostsTable from './PostsTable';
import TableSkeleton from './TableSkeleton';

interface Post {
  id: string;
  title: string;
  author: string;
  status: string;
  date: string;
  content?: string;
}

const adaptPosts = (posts: FirebasePost[]): Post[] =>
  posts.map((post) => ({
    id: post.slug || (post as any).id,
    title: post.title,
    author: post.authors && post.authors.length > 0 ? post.authors[0].name : 'Unknown',
    status: post.status,
    date:
      post.date && typeof (post.date as any).toDate === 'function'
        ? (post.date as any).toDate().toISOString().slice(0, 10)
        : '',
    content: typeof post.content === 'string' ? post.content : '',
  }));

const PostsTabs = () => {
  const [posts, setPosts] = useState<FirebasePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const allPosts = await postsHelpers.getAll();
        setPosts(allPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <TableSkeleton />;

  const allPosts = adaptPosts(posts);
  const drafts = adaptPosts(posts.filter((p) => p.status === 'draft'));
  const published = adaptPosts(posts.filter((p) => p.status === 'published'));

  return (
    <Tabs
      tabs={[
        {
          label: 'All Posts',
          content: <PostsTable posts={allPosts} />,
        },
        {
          label: 'Drafts',
          content: <PostsTable posts={drafts} />,
        },
        {
          label: 'Published',
          content: <PostsTable posts={published} />,
        },
      ]}
    />
  );
};

export default PostsTabs; 