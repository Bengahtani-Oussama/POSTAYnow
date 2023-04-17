export default function ProfileUserFriend({ friends }) {
  return (
    <>
      {friends && friends.length > 0 && (
        <div className='profile_post_left_friends  card'>
          <div className='userImgs_header'>
            <div className='userImgs_header_left'>
              <p className='friends_text'>Friends</p>
              <p className='friends_count'>
                {friends.length === 0
                  ? ''
                  : friends.length === 1
                  ? '1 Friend'
                  : `${friends.length} Friends`}
              </p>
            </div>
            <div className='userImgs_header_right'>
              <p className='friends_seeMore'>See All Friends</p>
            </div>
          </div>
          <div className='all_user_photos'>
            {friends
              ? friends
                  .slice(0, 9)
                  .map((friend) => (
                    <img src={friend.url} alt='asd' key={friend.asset_id} />
                  ))
              : ''}
          </div>
        </div>
      )}
    </>
  );
}
