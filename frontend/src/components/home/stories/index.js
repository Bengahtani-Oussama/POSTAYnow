import './style.css';
import { ArrowRight, Plus } from '../../../svg';
import { storyData } from '../../../data/honeData/homeData';
import Story from './Story';
import { useMediaQuery } from '@mui/material';

export default function Stories() {
  const query1024 = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const query768 = useMediaQuery('(min-width: 641px) and (max-width: 767px) ');
  const query641 = useMediaQuery('(min-width: 425px) and (max-width: 640px)');
  const query425 = useMediaQuery('(min-width: 320px) and (max-width: 424px)');

  const max = query1024
    ? 4
    : query768 || query641 || query425
    ? 3
    : storyData.length;
  return (
    <div className='stories'>
      <div className='create_story_card'>
        <img src='/images/default_pic.png' alt='sdas' className='story_image' />
        <div className='plus_story'>
          <Plus color={'#0d0944'} />
        </div>
        <div className='story_create_text'>Create Story</div>
      </div>
      {storyData.slice(0, max).map((story, i) => (
        <Story key={i} story={story} />
      ))}
      <div className='arrow_more_story'>
        <ArrowRight color={'#0d0944'} />
      </div>
    </div>
  );
}
