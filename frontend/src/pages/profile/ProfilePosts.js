import { useEffect, useReducer } from 'react';
import { postsReducer } from '../../reducers/reducers';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getError } from '../../utils/error/error';
import Post from '../../components/post';
import { useParams } from 'react-router-dom';

export default function ProfilePosts({ posts, loading, visitor }) {
  const { user } = useSelector((state) => ({ ...state }));
  const visitName = useParams();

  return (
    <>
      {loading ? (
        'Loading ...'
      ) : (
        <div className='profile_post'>
          {posts && posts.length ? (
            posts?.map((post) => (
              <div className='posts' key={post._id}>
                <Post post={post} />
              </div>
            ))
          ) : (
            <div>
              {!visitor ? (
                <div className='no_post card'>
                  <p>HI {user.username}, CREATE YOUR FIRST POST</p>
                </div>
              ) : (
                <div className='no_post card'>
                  <p>
                    HI {user.username}, {visitName.username} hasn't posted any
                    posts yet
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
