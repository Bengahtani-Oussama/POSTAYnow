import { Avatar, AvatarGroup } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProfileInfos({
  profile,
  setShowFriendSuggestion,
  loading,
  visitor,
  setShowUpdatePic,
  otherName,
}) {
  return (
    <div className='profileInfos'>
      <div className='profileInfo_header'>
        <div className='profileImg'>
          <img src={profile?.picture} alt={profile?.username} />
          {!visitor && (
            <div className='profileImg_wrap'>
              <i
                className='camera_filled_icon'
                onClick={() => setShowUpdatePic(true)}
              ></i>
            </div>
          )}
        </div>
        <div className='profileFullInfo'>
          <div className='profileFullInfo_top'>
            <div className='profileUserName'>{profile?.username}</div>
            {otherName && (
              <div className='profileUser_desc'>( {otherName} )</div>
            )}
          </div>
          <div className='profileFullInfo_btm'>
            <div className='profileFullInfo_btm_left'>
              <div className='friendsCount'>7 Friends</div>
              <div className='friends_imgs'>
                <AvatarGroup max={5}>
                  <Avatar src='/stories/p3.png' />
                  <Avatar src='/stories/p4.png' />
                  <Avatar src='/stories/p5.png' />
                  <Avatar src='/stories/p6.png' />
                  <Avatar src='' />
                  <Avatar src='' />
                  <Avatar src='' />
                </AvatarGroup>
              </div>
            </div>
            {!visitor && (
              <div className='profileFullInfo_btm_right'>
                <button>
                  <div className='iconsBg'>
                    <i className='plus_icon'></i>
                  </div>
                  Add To Story
                </button>
                <button>
                  <div className='iconsBg'>
                    <i className='edit_icon'></i>
                  </div>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='profileInfo_nav'>
        <div className='nav_links'>
          <Link to='/' className='active'>
            Posts
          </Link>
          <Link to='/'>About</Link>
          <Link to='/'>Friends</Link>
          <div
            className='link'
            onClick={() => setShowFriendSuggestion((prev) => !prev)}
          >
            Suggestions
          </div>
          <Link to='/'>Photos</Link>
          <Link to='/'>Videos</Link>
          <Link to='/'>Pages</Link>
          <Link to='/' className='more_icon'>
            More
            <i className='arrowDown_icon'></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
