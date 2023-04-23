import './style.css';
import { useEffect, useReducer, useRef, useState } from 'react';
import { profileReducer } from '../../reducers/reducers';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getError } from '../../utils/error/error';
import Header from '../../components/header';
import ProfileCover from './ProfileCover';

import ProfileInfos from './ProfileInfos';
import PeopleKnow from './PeopleKnow';
import CreatePost from '../../components/home/createPost';
import ProfilePosts from './ProfilePosts';
import ProfileBio from './ProfileBio';
import ProfileUserPhotos from './ProfileUserPhotos';
import ProfileUserFriend from './ProfileUserFriend';
import ProfilePicture from '../../components/profilePicture';

export default function Profile() {
  const { user } = useSelector((state) => ({ ...state }));
  const { username } = useParams();
  const UserName = username === undefined ? user.username : username;
  // console.log(UserName);
  const [otherName, setOtherName] = useState('');

  const navigate = useNavigate();
  const [showFriendSuggestion, setShowFriendSuggestion] = useState(true);
  const [showUpdatePic, setShowUpdatePic] = useState(false);

  const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: [],
    error: false,
  });
  console.log('profile',profile);

  // Get list Images States
  const [photos, setPhotos] = useState({});
  const path = `${UserName}/*`;
  const max = 30;
  const sort = 'desc';

  const getProfile = async () => {
    try {
      dispatch({
        type: 'PROFILE_REQUEST',
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${UserName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (data.ok === false) {
        navigate('/profile');
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          setPhotos(images.data);
        } catch (err) {
          console.log(getError(err));
        }
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: data,
        });
      }
    } catch (err) {
      dispatch({
        type: 'PROFILE_FAILED',
        payload: getError(err),
      });
    }
  };

  var visitor = UserName === user.username ? false : true;

  useEffect(() => {
    getProfile();
    if (username === user.username) {
      navigate('/profile');
    }
  }, [UserName, showUpdatePic]);
  useEffect(() => {
    setOtherName(profile?.details?.otherName);
  }, [profile]);

  // console.log(profile);
  // console.log(photos);
  return (
    <div className='profileWrapper'>
      <Header />
      {showUpdatePic && (
        <div className='UploadPicProfile'>
          <ProfilePicture
            photos={photos.resources}
            loading={loading}
            setShowUpdatePic={setShowUpdatePic}
          />
        </div>
      )}
      <div className='profile_top'>
        <div className='profile_container'>
          <ProfileCover
            photos={photos.resources}
            visitor={visitor}
            profile={profile}
            loading={loading}
          />
          <ProfileInfos
            otherName={otherName}
            setShowUpdatePic={setShowUpdatePic}
            visitor={visitor}
            profile={profile}
            setShowFriendSuggestion={setShowFriendSuggestion}
            loading={loading}
          />
        </div>
      </div>

      <div className='profile_bottom'>
        <div className='profile_container profile_Btm_info'>
          {showFriendSuggestion && (
            <PeopleKnow setShowFriendSuggestion={setShowFriendSuggestion} />
          )}
          <div className='profile_post_wrapper'>
            <div className='profile_post_left'>
              <ProfileBio
                setOtherName={setOtherName}
                visitor={visitor}
                detail={profile.details}
                username={profile.username}
                loading={loading}
              />
              <ProfileUserPhotos loading={loading} photos={photos} />
              <ProfileUserFriend friends={profile.friends} />
            </div>
            <div className='profile_post_right'>
              {!visitor && (
                <div className='card create_post'>
                  <CreatePost profileEvent='profile' />
                </div>
              )}
              <ProfilePosts
                visitor={visitor}
                loading={loading}
                posts={profile.posts}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
