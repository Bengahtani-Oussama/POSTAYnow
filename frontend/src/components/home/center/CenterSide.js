import './style.css';
import CreatePost from '../createPost';
import Stories from '../stories';
import { useSelector } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Sending from '../../../svg/sending';
import { getError } from '../../../utils/error/error';
import axios from 'axios';
import Post from '../../post';
import { postsReducer } from '../../../reducers/reducers';

export default function CenterSide() {
  const { user } = useSelector((user) => ({ ...user }));
  const { post } = useSelector((post) => ({ ...post }));

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [success, setSuccess] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const sendVerificationEmail = async () => {
    try {
      setLoadingEmail(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/resendverification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      setLoadingEmail(false);
    } catch (err) {
      setLoadingEmail(false);
      setErrorEmail(getError(err));
    }
  };

  const [{ loading, posts, error }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: false,
  });

  useEffect(() => {
    getAllPosts();
  }, [posts.length, post]);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: 'POST_REQUEST',
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: 'POST_SUCCESS',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'POST_FAILED',
        payload: getError(err),
      });
    }
  };

  return (
    <div className='Center_Side_Wrapper'>
      <div className='card create_Stories'>
        <Stories />
      </div>
      {!user?.verified && (
        <div className='card verification_profile'>
          <div>
            To protect your account, please<b> check your email</b> to activate
            it
          </div>
          <div className='verification_btn'>
            <p>Resend verification email</p>
            <LoadingButton
              size='small'
              color='warning'
              startIcon={<Sending color={'#fff'} />}
              loading={loadingEmail}
              loadingPosition='start'
              variant='contained'
              onClick={() => sendVerificationEmail()}
            >
              <span>Send</span>
            </LoadingButton>
          </div>
          {success && <div className='success'>{success}</div>}
          {errorEmail && <div className='error'>{errorEmail}</div>}
        </div>
      )}
      <div className='card create_post'>
        <CreatePost />
      </div>
      {posts.map((postCard) => (
        <div className='posts' key={postCard._id}>
          <Post loading={loading} post={postCard} />
        </div>
      ))}
    </div>
  );
}
