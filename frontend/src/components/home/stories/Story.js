import { Avatar } from '@mui/material';

export default function Story({ story }) {
  return (
    <div className='create_story_card'>
      <img src={story.story_img} alt='sdas' className='stories_image' />
      <div className='img_profile_story'>
        <Avatar className='img_profile_s' src={story.profile_img} />
      </div>
      <div className='stories_create_text'>{story.profile_name}</div>
    </div>
  );
}
