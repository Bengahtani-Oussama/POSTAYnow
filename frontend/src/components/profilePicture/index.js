import './style.css';
import { useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import useOnclickOutSide from '../../helpers/onclickOutSide';
import ErrorPost from '../createPostPopup/errorPost';
import UpdateProfilePicture from './updateProfilePicture';
import { useSelector } from 'react-redux';

export default function ProfilePicture({
  photos,
  setShowUpdatePic,
  setShowUpdateCover,
  loading,
  cover,
  setImageCover,
}) {
  const { user } = useSelector((state) => ({ ...state }));
  // ----- Create Post States -------
  const [imageProfile, setImageProfile] = useState('');
  const [error, setError] = useState('');

  const showUpdatePicRef = useRef(null);
  const imagePrevRef = useRef(null);

  useOnclickOutSide(showUpdatePicRef, () => {
    cover ? setShowUpdateCover(false) : setShowUpdatePic(false);
  });

  useEffect(() => {}, [imageProfile]);

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
      setImageProfile(event.target.result);
    };
  };

  const handleCoverImageChange = (img) => {
    setImageCover(img.secure_url);
    setShowUpdateCover(false);
  };

  return (
    <div className='blur'>
      <div className='create_postWrapper ' ref={showUpdatePicRef}>
        <div className='create_postHeader'>
          <div className='create_postHeaderText'>
            Update Profile {`${cover ? 'Cover' : ' Picture'}`}
          </div>
          <div className='create_postHeaderIcon'>
            <i
              className='exit_icon'
              onClick={() =>
                cover ? setShowUpdateCover(false) : setShowUpdatePic(false)
              }
            ></i>
          </div>
        </div>

        {!cover && (
          <div className='create_postFooter upload_imgPic'>
            <input
              type='file'
              accept='image/*'
              hidden
              ref={imagePrevRef}
              onChange={handleImageChange}
            />
            <button
              className='orangBtn'
              onClick={() => imagePrevRef.current.click()}
            >
              <i className='plus_icon'></i>
              Upload Photo
            </button>
            <button className='whiteBtn'>
              <i className='frame_icon'></i>
              Add Frame
            </button>
          </div>
        )}
        {cover && (
          <>
            <b>Cover Profile Pictures</b>
            <div className='create_postBody'>
              {error && <ErrorPost error={error} setError={setError} />}

              {loading ? (
                'Loading....'
              ) : (
                <>
                  {photos
                    .filter(
                      (pic) => pic.folder === `${user.username}/cover_pictures`
                    )
                    .map((img) => (
                      <img
                        key={img.public_id}
                        src={img.secure_url}
                        alt={user.username}
                        onClick={() =>
                          cover
                            ? handleCoverImageChange(img)
                            : setImageProfile(img.secure_url)
                        }
                      />
                    ))}
                </>
              )}
            </div>
          </>
        )}
        <b>Profile Pictures</b>
        <div className='create_postBody'>
          {error && <ErrorPost error={error} setError={setError} />}

          {loading ? (
            'Loading....'
          ) : (
            <>
              {photos
                .filter(
                  (pic) => pic.folder === `${user.username}/profile_pictures`
                )
                .map((img) => (
                  <img
                    key={img.public_id}
                    src={img.secure_url}
                    alt={user.username}
                    onClick={() =>
                      cover
                        ? handleCoverImageChange(img)
                        : setImageProfile(img.secure_url)
                    }
                  />
                ))}
            </>
          )}
        </div>

        <b>Other Pictures</b>
        <div className='create_postBody'>
          {error && <ErrorPost error={error} setError={setError} />}

          {loading ? (
            'Loading....'
          ) : (
            <>
              {photos
                .filter(
                  (pic) =>
                    pic.folder !== `${user.username}/profile_pictures` &&
                    pic.folder !== `${user.username}/cover_pictures`
                )
                .map((img) => (
                  <img
                    key={img.public_id}
                    src={img.secure_url}
                    alt={user.username}
                    onClick={() =>
                      cover
                        ? handleCoverImageChange(img)
                        : setImageProfile(img.secure_url)
                    }
                  />
                ))}
            </>
          )}
        </div>
      </div>
      {imageProfile && (
        <UpdateProfilePicture
          setShowUpdatePic={setShowUpdatePic}
          showUpdatePicRef={showUpdatePicRef}
          setImageProfile={setImageProfile}
          imageProfile={imageProfile}
        />
      )}
    </div>
  );
}
