import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import { useRef, useState } from 'react';
import useOnclickOutSide from '../../helpers/onclickOutSide';

export default function PostMenu({ postId, setShowMenuPost, imagesLength }) {
  const { user } = useSelector((user) => ({ ...user }));

  const [myPost, setMyPost] = useState(postId === user.id ? true : false);

  const postRef = useRef(null);
  useOnclickOutSide(postRef, () => {
    setShowMenuPost(false);
  });

  return (
    <ul className='post_menu' ref={postRef}>
      {myPost && <MenuItem icon='pin_icon' title='Pin Post' />}

      <MenuItem
        icon='save_icon'
        title='Save Post'
        subTitle='Add this to your saved'
      />

      <MenuItem
        icon='turnOffNotifications_icon'
        title='Turn off notification for this Post'
      />

      {myPost && <MenuItem icon='m_post_icon' title='Edit Post' />}
      {imagesLength && <MenuItem icon='download_icon' title='Download' />}
      {imagesLength && <MenuItem icon='fullscreen_icon' title='Fullscreen' />}
      {myPost && (
        <MenuItem icon='privacy_shortcuts_icon' title='Edit audience' />
      )}
      {myPost && <MenuItem icon='delete_icon' title='Turn off transitions' />}
      {myPost && <MenuItem icon='date_icon' title='Edit date' />}
      {myPost && <MenuItem icon='archive_icon' title='Move to archive' />}
      {myPost && (
        <MenuItem
          icon='trash_icon'
          title='Delete Post'
          subTitle='This post deleted after 30 days'
        />
      )}

      {!myPost && (
        <MenuItem
          icon='report_filled_icon'
          title='Report Post'
          subTitle='Post your report for this post'
        />
      )}
    </ul>
  );
}
