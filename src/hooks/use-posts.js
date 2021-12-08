import { useState, useEffect } from 'react';
import { getPosts } from '../services/firebase';

export default function usePosts(type, param2, user) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getTimelinePosts() {
      const PostList = await getPosts(type, param2, user);
      PostList.sort((a, b) => {
        if (b.vote_numbers !== a.vote_numbers) return b.vote_numbers - a.vote_numbers;
        return a.create_date - b.create_date;
      });
      setPosts(PostList);
    }

    getTimelinePosts();
  }, [posts?.length]);

  return { posts };
}
