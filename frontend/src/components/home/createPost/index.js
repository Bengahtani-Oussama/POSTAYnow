import './style.css';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Feeling, LiveVideo, Photo } from '../../../svg';

export default function CreatePost({ profileEvent }) {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));

  const visiblePost = () => {
    dispatch({
      type: 'VISIBLE',
    });
  };
  return (
    <div className='createPost'>
      <div className='header_createPost'>
        <Avatar src={user?.picture} alt={user?.username} />
        <div className='createPost_txt' onClick={() => visiblePost()}>
          Share your thoughts with your friends
        </div>
        <div className='word'></div>
      </div>
      <div className='icon_createPost'>
        <div className='iconCreate'>
          <LiveVideo color={'#f74747'} />
          <p>Live</p>
        </div>
        <div className='iconCreate'>
          <Photo color={'#4747f7'} />
          <p>Photo / Video</p>
        </div>

        {profileEvent === 'profile' ? (
          <div className='iconCreate'>
            <i className='lifeEvent_icon'></i>
            <p>Life Event</p>
          </div>
        ) : (
          <div className='iconCreate'>
            <Feeling color={'#00ff59'} />
            <p>Activity</p>
          </div>
        )}
      </div>
    </div>
  );
}
