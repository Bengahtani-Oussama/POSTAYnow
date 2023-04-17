import './style.css';

import { Avatar } from '@mui/material';
import { useRef, useState } from 'react';
import AddToPost from './AddToPost';
import Emojipicker from './Emojipicker';
import ImagePreview from './ImagePreview';
import { useDispatch } from 'react-redux';
import useOnclickOutSide from '../../helpers/onclickOutSide';
import { createPost } from '../../utils/post/post';
import { useSnackbar } from 'notistack';
import BeatLoader from 'react-spinners/BeatLoader';
import ErrorPost from './errorPost';
import { uploadImages } from '../../utils/post/uploadImages';
import dataURItoBlob from '../../helpers/dataURItoBlob';

export default function CreatePostPopup({ user }) {
  const dispatch = useDispatch();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const [text, setText] = useState('');
  const [visibleTextarea, setVisibleTextarea] = useState(false);
  const [images, setImages] = useState([]);
  const [postBackground, setPostBackground] = useState('');

  // ----- Create Post States -------
  const create_postRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useOnclickOutSide(create_postRef, () => {
    visiblePost();
  });

  const visiblePost = () => {
    dispatch({
      type: 'HIDDEN',
    });
  };

  const postSubmit = async () => {
    closeSnackbar();
    if (postBackground) {
      setLoading(true);
      const responsePost = await createPost(
        null,
        postBackground,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (responsePost === 'ok') {
        enqueueSnackbar('Post Created Successfully', { variant: 'success' });
        setText('');
        setPostBackground('');
        visiblePost();
      } else {
        setError(responsePost);
      }
    } else if (images && images.length) {
      setLoading(true);

      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });

      const path = `${user.username}/post_images`;
      let formData = new FormData();
      formData.append('path', path);
      postImages.forEach((image) => {
        formData.append('file', image);
      });

      const responsePost = await uploadImages(formData, path, user.token);

      const res = await createPost(
        null,
        null,
        text,
        responsePost,
        user.id,
        user.token
      );
      setLoading(false);

      if (res === 'ok') {
        enqueueSnackbar('Post Created Successfully', { variant: 'success' });
        setText('');
        setPostBackground('');
        visiblePost();
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const responsePost = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (responsePost === 'ok') {
        enqueueSnackbar('Post Created Successfully', { variant: 'success' });
        setText('');
        setPostBackground('');
        visiblePost();
      } else {
        setError(responsePost);
      }
    } else {
      enqueueSnackbar('Please try agin! and write anything', {
        variant: 'warning',
      });
    }
  };

  return (
    <div className='blur'>
      <div className='create_postWrapper ' ref={create_postRef}>
        {error && <ErrorPost error={error} setError={setError} />}
        <div className='create_postHeader'>
          <div className='create_postHeaderText'>Crete New Post</div>
          <div className='create_postHeaderIcon'>
            <i className='exit_icon' onClick={() => visiblePost()}></i>
          </div>
        </div>
        <div className='create_postBody'>
          <div className='create_postUserinfo'>
            <div className='create_postUserimg'>
              <Avatar src={user?.picture} />
            </div>
            <div className='create_postUsername'>
              <b>{user?.username}</b>
              <div className='list'>
                <img src='/icons/public.png' alt='' />
                <span>Public</span>
                <i className='arrowDown_icon'></i>
              </div>
            </div>
          </div>

          {!visibleTextarea ? (
            <Emojipicker
              text={text}
              setText={setText}
              user={user}
              postBackground={postBackground}
              setPostBackground={setPostBackground}
            />
          ) : (
            <ImagePreview
              text={text}
              setText={setText}
              user={user}
              images={images}
              setImages={setImages}
              setVisibleTextarea={setVisibleTextarea}
              setError={setError}
            />
          )}
        </div>
        <div>
          <AddToPost setVisibleTextarea={setVisibleTextarea} />
        </div>
        <div className='create_postFooter'>
          <button
            className='orangBtn'
            disabled={loading}
            onClick={() => {
              postSubmit();
            }}
          >
            {loading ? (
              <BeatLoader size={10} loading={loading} color='#fff' />
            ) : (
              'post'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
