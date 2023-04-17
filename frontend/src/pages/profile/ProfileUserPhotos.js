import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { photoReducer } from '../../reducers/reducers';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getError } from '../../utils/error/error';

export default function ProfileUserPhotos({ loading, photos }) {
  // const { user } = useSelector((state) => ({ ...state }));
  // const navigate = useNavigate();

  // const [{ loading, photos, error }, dispatch] = useReducer(photoReducer, {
  //   loading: false,
  //   photos: [],
  //   error: false,
  // });

  // useEffect(() => {
  //   getPhotos();
  // }, [UserName]);

  // const path = `${UserName}/*`;
  // const max = 30;
  // const sort = 'desc';

  // const getPhotos = async () => {
  //   try {
  //     dispatch({
  //       type: 'PHOTOS_REQUEST',
  //     });

  // const { data } = await axios.post(
  //   `${process.env.REACT_APP_BACKEND_URL}/listImages`,
  //   { path, sort, max },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   }
  // );

  //     dispatch({
  //       type: 'PHOTOS_SUCCESS',
  //       payload: data,
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: 'PHOTOS_FAILED',
  //       payload: getError(err),
  //     });
  //   }
  // };

  // console.log('resources ...', resources);
  // console.log('All Photos ...', photos);
  return (
    <>
      {loading ? (
        'Loading ....'
      ) : (
        <>
          {photos.total_count !== 0 && (
            <div className='profile_post_left_userImg  card'>
              <div className='userImgs_header'>
                <div className='userImgs_header_left'>
                  <p className='photos_text'>Photos</p>
                  <p className='photos_count'>
                    {photos.total_count === 0
                      ? ''
                      : photos.total_count === 1
                      ? '1 Photo'
                      : `${photos.total_count} Photos`}
                  </p>
                </div>
                <div className='userImgs_header_right'>
                  <p className='photos_seeMore'>See All Photos</p>
                </div>
              </div>
              <div className='all_user_photos'>
                {photos.resources && photos.resources.length
                  ? photos.resources
                      .slice(0, 9)
                      .map((img) => (
                        <img src={img.url} alt='asd' key={img.asset_id} />
                      ))
                  : ''}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
