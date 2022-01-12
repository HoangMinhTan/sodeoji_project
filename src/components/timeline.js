/* eslint-disable no-nested-ternary */
import { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePosts from '../hooks/use-posts';
import Post from './post';
import Comments from './post/comments';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Timeline({ type, param2 }) {
  const { user } = useContext(LoggedInUserContext);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();
  var { posts } = usePosts(type, param2, search, user);

  const handleSearch = (e) => {
    console.log("set search: " +value);
    setSearch(value);
  }

  useEffect(() => {
    if (posts) setLoading(true);
  })
  return (
    <div className="container col-span-2">
      <div className='col-md-5 w-full pt-1 pb-1'>
        <input
          type="text"
          class="form-control"
          id="search_post"
          placeholder='検索'
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => { if (e.key == "Enter") { handleSearch(e) } }}
        ></input>

      </div>
      {!loading ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        posts.map((content) => {
          return (
            <>
              <Post content={content} />
              {type === 'post-details' ? (
                <Comments
                  postId={content.postId}
                  user={user}
                />
              ) : null}
            </>
          )
        })
      )}
    </div>
  );
}
