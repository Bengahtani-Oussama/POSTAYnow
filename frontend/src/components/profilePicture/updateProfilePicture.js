import React, { useCallback, useState } from 'react';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Cropper from 'react-easy-crop';
import { getError } from '../../utils/error/error';
import getCroppedImg from '../../helpers/getCroppedImg';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages } from '../../utils/post/uploadImages';
import { updateProfilePictureFunc } from '../../utils/post/user';
import { createPost } from '../../utils/post/post';
import BeatLoader from 'react-spinners/BeatLoader';
import Cookies from 'js-cookie';

export default function UpdateProfilePicture({
  setImageProfile,
  showUpdatePicRef,
  imageProfile,
  setShowUpdatePic,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [picDesc, setPicDesc] = useState('');

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  //   Update Profile Picture State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (cropimg) => {
      try {
        setLoading(true);
        const img = await getCroppedImg(imageProfile, croppedAreaPixels);
        if (cropimg) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          console.log(img);
          setImageProfile(img);

          // console.log('Show img');
          // console.log('url 1 :', img);

          setLoading(false);
        } else {
          // console.log('No Show img');
          // console.log('url 2 :', img);

          setLoading(false);
          return img;
        }
      } catch (err) {
        setLoading(false);
        console.log(getError(err));
      }
    },
    [croppedAreaPixels]
  );

  const updateProfilePicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((imgUrl) => imgUrl.blob());
      const path = `${user.username}/profile_pictures`;

      let formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);

      const res = await uploadImages(formData, path, user.token);
      const upload_Picture = await updateProfilePictureFunc(
        res[0].url,
        user.token
      );

      if (upload_Picture === 'ok') {
        const new_post = await createPost(
          'profilePicture',
          null,
          picDesc,
          res,
          user.id,
          user.token
        );

        if (new_post === 'ok') {
          setLoading(false);
          Cookies.set(
            'userInfo',
            JSON.stringify({ ...user, picture: res[0].url })
          );
          dispatch({
            type: 'UPLOADPROFILEPIC',
            payload: res[0].url,
          });
          setShowUpdatePic(false);
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(upload_Picture);
      }
    } catch (err) {
      setLoading(false);
      setError(getError(err));
    }
  };

  return (
    <div className='updateProfilePicture'>
      <div className='create_postWrapper ' ref={showUpdatePicRef}>
        <div className='create_postHeader'>
          <div className='create_postHeaderText'>Update Profile Picture</div>
          <div className='create_postHeaderIcon'>
            <i className='exit_icon' onClick={() => setImageProfile('')}></i>
          </div>
        </div>
        <div className='create_postBody'>
          <div className='updatePicProfileDesc'>
            <textarea
              placeholder='Create a description'
              onChange={(e) => setPicDesc(e.target.value)}
            ></textarea>
          </div>
          <div className='updatePicProfileImg'>
            <div className='crop-container'>
              <Cropper
                image={imageProfile}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                showGrid={true}
                cropShape='round'
              />
            </div>
          </div>
          <div className='updatePicProfileFooter'>
            <div className='controls'>
              Zoom Your Picture :
              <input
                type='range'
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className='zoom-range'
              />
            </div>
            <div className='updatePicProfileFooterTXT'>
              Your Profile Picture is Public
            </div>
          </div>
        </div>
        <div className='create_postFooter upload_imgPic'>
          <div className='cropBtn'>
            <button
              className='orangBtn'
              onClick={() => getCroppedImage('cropimg')}
            >
              <i className='crop_icon'></i>
              Crop
            </button>
          </div>
          <div className='subBtn'>
            <button className='whiteBtn' onClick={() => setImageProfile('')}>
              <i className='exit_icon'></i>
              Cancel
            </button>
            <button
              className='orangBtn'
              disabled={loading}
              onClick={() => updateProfilePicture()}
            >
              {loading ? (
                <BeatLoader size={10} loading={loading} color='#fff' />
              ) : (
                <>
                  <PermMediaIcon />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
