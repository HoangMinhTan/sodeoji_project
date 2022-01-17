import { useState, useEffect } from 'react';
import { getPosts } from '../services/firebase';

export default function usePosts(type, param2, search, user) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getTimelinePosts() {
      const PostList = await getPosts(type, param2, search, user);
      PostList.sort((a, b) => {
        if (b.vote_numbers !== a.vote_numbers) return b.vote_numbers - a.vote_numbers;
        return b.create_date - a.create_date;
      });
      setPosts(PostList);
    }

    getTimelinePosts();
  }, [user, search, posts?.length]);

  return { posts };
}
