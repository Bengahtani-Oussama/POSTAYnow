import './style.css';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Public from '../../svg/public';
import Dots from '../../svg/dots';
import { Avatar } from '@mui/material';
import ReactsPopup from './ReactsPopup';
import CreateComment from './CreateComment';
import PostMenu from './PostMenu';

export default function Post({ loading, post }) {
  // const { user } = useSelector((user) => ({ ...user }));

  const [showReacts, setShowReacts] = useState(false);
  const [showMenuPost, setShowMenuPost] = useState(false);

  // console.log(post);

  return (
    <div className='post card' key={post._id}>
      <div className='post_header'>
        <Link
          to={`/profile/${post.user.username}`}
          className='profile_header_link'
        >
          <div className='profile_header_left'>
            <Avatar src={post?.user.picture} alt={post?.user.username} />
            <div className='post_header_col'>
              <div className='post_profile_name'>
                <p>
                  {post.user.firstName} {post.user.lastName}
                </p>
                <div className='post_updated'>
                  {post.type === 'profilePicture' &&
                    `Updated ${
                      post.user.gender === 'male' ? 'his' : 'her'
                    } profile picture`}
                  {post.type === 'coverPicture' &&
                    `Updated ${
                      post.user.gender === 'male' ? 'his' : 'her'
                    } cover picture`}
                </div>
              </div>
              <div className='post_profile_privacy_date'>
                <Moment fromNow interval={30}>
                  {post.createdAt}
                </Moment>
                <Public />
              </div>
            </div>
          </div>
        </Link>
        <div
          className='post_menu_btn'
          onClick={() => setShowMenuPost((prev) => !prev)}
        >
          <Dots />
        </div>
      </div>
      {loading ? (
        'loading'
      ) : (
        <>
          {post.postBackground && (
            <div className='postBackGround'>
              <img
                className='img_backGround'
                src={post.postBackground}
                alt={`post ${post.text}`}
              />
              <p className='postBackGround_text'>{post.text}</p>
            </div>
          )}
          {post.images &&
            post.images.length &&
            post.type !== 'profilePicture' &&
            post.type !== 'coverPicture' && (
              <div className='post_images_wrap'>
                {post.text && post.text !== '' && (
                  <div className='post_images_text'>{post.text}</div>
                )}
                <div
                  className={`${
                    post.images.length === 1
                      ? 'images1'
                      : post.images.length === 2
                      ? 'images2'
                      : post.images.length === 3
                      ? 'images3'
                      : post.images.length === 4
                      ? 'images4'
                      : post.images.length >= 5 && 'images5'
                  }`}
                >
                  {post.images.slice(0, 5).map((img, i) => (
                    <img key={i} alt={`post ${post.text}`} src={img.url} />
                  ))}
                  {post.images.length > 5 && (
                    <div className='more_then_5Pic'>
                      +{post.images.length - 5}
                    </div>
                  )}
                </div>
              </div>
            )}
          {post.type === 'profilePicture' && (
            <div className='post_images_wrap'>
              {post.text && post.text !== '' && (
                <div className='post_images_text'>{post.text}</div>
              )}
              <div className='images1 UpdateProfilePic'>
                <div className='post_CoverPic'>
                  <div className='coverpicColor'>
                    {post.user.cover ? (
                      <img alt={`post ${post.text}`} src={post.user.cover} />
                    ) : (
                      <img alt={`post ${post.text}`} src='/icons/4-logoB.png' />
                    )}

                    {/* <img alt={`post ${post.text}`} src={post.user.cover} /> */}
                    {/* <img alt={`post ${post.text}`} src={post.images[0].url} /> */}
                  </div>
                </div>
                <div className='post_ProfilePic'>
                  <img alt={`post ${post.text}`} src={post.user.picture} />
                </div>
              </div>
            </div>
          )}
          {post.type === 'coverPicture' && (
            <div className='post_images_wrap'>
              {post.text && post.text !== '' && (
                <div className='post_images_text'>{post.text}</div>
              )}
              <div className='images1 UpdateProfilePic'>
                <div className='post_CoverPic'>
                  <div className='coverpicColor'>
                    <img alt={`post ${post.text}`} src={post.images[0].url} />
                  </div>
                </div>
                <div className='post_ProfilePic'>
                  <img alt={`post ${post.text}`} src={post.user.picture} />
                </div>
              </div>
            </div>
          )}

          {post.images === null && post.postBackground === null && (
            <div className='post_text'>{post.text}</div>
          )}
        </>
      )}
      <div className='post_infos'>
        <div className='post_info'>
          <div className='post_count_img'></div>
          <div className='post_count_num'></div>
        </div>
        <div className='to_right'>
          <div className='comment_count'>9 Comments</div>
          <div className='share_count'>3 Share</div>
        </div>
      </div>
      <div className='post_actions'>
        <div className='Like_post_action'>
          <div
            className='post_action'
            onMouseOver={() => {
              setTimeout(() => {
                setShowReacts(true);
              }, 500);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setShowReacts(false);
              }, 500);
            }}
          >
            <i className='like_icon'></i>
            <span>Like</span>
          </div>
          {
            <ReactsPopup
              showReacts={showReacts}
              setShowReacts={setShowReacts}
            />
          }
        </div>
        <div className='post_action'>
          <i className='comment_icon'></i>
          <span>Comment</span>
        </div>
        <div className='post_action'>
          <i className='share_icon'></i>
          <span>Share</span>
        </div>
      </div>
      <div className='post_comments_wrapper'>
        <CreateComment />
      </div>
      {showMenuPost && (
        <div>
          <PostMenu
            imagesLength={post?.images?.length}
            setShowMenuPost={setShowMenuPost}
            postId={post.user._id}
          />
        </div>
      )}
    </div>
  );
}
