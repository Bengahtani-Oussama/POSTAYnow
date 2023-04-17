import React, { useCallback, useEffect, useRef, useState } from 'react';
import useOnclickOutSide from '../../helpers/onclickOutSide';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { getError } from '../../utils/error/error';
import ErrorPost from '../../components/createPostPopup/errorPost';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../helpers/getCroppedImg';
import BeatLoader from 'react-spinners/BeatLoader';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages } from '../../utils/post/uploadImages';
import { updateCoverPictureFunc } from '../../utils/post/user';
import { createPost } from '../../utils/post/post';
import Cookies from 'js-cookie';
import ProfilePicture from '../../components/profilePicture';

export default function ProfileCover({ profile, visitor, photos }) {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [updateCoverBtn, setUpdateCoverBtn] = useState(false);
  const [showUpdateCover, setShowUpdateCover] = useState(false);

  const coverRef = useRef(null);
  const coverPicRef = useRef(null);

  //   Update Profile Picture State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageCover, setImageCover] = useState('');
  const imagePrevRef = useRef(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (cropimg) => {
      try {
        setLoading(true);
        const img = await getCroppedImg(imageCover, croppedAreaPixels);
        if (cropimg) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          console.log(img);
          setImageCover(img);

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

  useOnclickOutSide(coverRef, () => {
    setShowUploadMenu(false);
  });

  const handleImageChange = (e) => {
    let file = e.target.files[0];

    if (file.size > 1024 * 1024 * 4) {
      setError(
        `${file.name} Size file too large, please chose file less then 4MB`
      );
      return;
    } else if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif' &&
      file.type !== 'image/webp'
    ) {
      setError(`${file.name} File not supported, please chose file like image`);
      return;
    }

    const render = new FileReader();
    render.readAsDataURL(file);
    render.onload = (event) => {
      setImageCover(event.target.result);
    };
    setShowUploadMenu(false);
  };

  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((imgUrl) => imgUrl.blob());
      const path = `${user.username}/cover_pictures`;

      let formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);

      const res = await uploadImages(formData, path, user.token);

      const upload_Picture = await updateCoverPictureFunc(
        res[0].url,
        user.token
      );

      if (upload_Picture === 'ok') {
        const new_post = await createPost(
          'coverPicture',
          null,
          null,
          res,
          user.id,
          user.token
        );

        if (new_post === 'ok') {
          setLoading(false);
          setImageCover('');
          // coverPicRef.current.src = res[0].url;
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

  const choseCoverHandler = () => {
    setImageCover('');
    setShowUpdateCover(true);
  };

  // trick to use width of window in Crop
  const coverCropRef = useRef(null);
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(coverCropRef.current.clientWidth);
  }, [window.innerWidth]);

  return (
    <div
      className='profile_cover'
      ref={coverCropRef}
      onMouseOver={() => setUpdateCoverBtn(true)}
      onMouseLeave={() => setUpdateCoverBtn(false)}
    >
      {showUpdateCover && (
        <div className='UploadPicProfile'>
          <ProfilePicture
            cover
            photos={photos}
            loading={loading}
            setShowUpdateCover={setShowUpdateCover}
            setImageCover={setImageCover}
          />
        </div>
      )}
      {error && <ErrorPost error={error} setError={setError} />}

      {imageCover && (
        <div className='crop-container'>
          <div className='subBtn'>
            <button className='whiteBtn' onClick={() => setImageCover('')}>
              <i className='exit_icon'></i>
              Cancel
            </button>
            <button
              className='orangBtn'
              disabled={loading}
              onClick={() => updateCoverPicture()}
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
          <Cropper
            image={imageCover}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            cropShape='rect'
            objectFit='horizontal-cover'
          />
        </div>
      )}

      {!imageCover && profile?.cover && (
        <img
          ref={coverPicRef}
          src={profile?.cover}
          alt={profile.username}
          className='cover_img'
        />
      )}
      <div className='update_cover_wrapper' ref={coverRef}>
        {!visitor && updateCoverBtn && (
          <div
            className='update_cover_btn'
            onClick={() => setShowUploadMenu((prev) => !prev)}
          >
            <i className='camera_filled_icon'></i>
            Add Cover Picture
          </div>
        )}
        {showUploadMenu && (
          <div className='update_cover_menu'>
            <input
              type='file'
              accept='image/*'
              hidden
              ref={imagePrevRef}
              onChange={handleImageChange}
            />
            <div
              className='update_cover_item'
              onClick={() => choseCoverHandler()}
            >
              <i className='photo_icon'></i>
              Chose Picture
            </div>
            <div
              className='update_cover_item'
              onClick={() => imagePrevRef.current.click()}
            >
              <i className='upload_icon'></i>
              Upload Picture
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
