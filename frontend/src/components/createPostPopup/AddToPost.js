import Photo from '../../svg/photo';
import Dots from '../../svg/dots';
import Feeling from '../../svg/feeling';

export default function AddToPost({ setVisibleTextarea }) {
  return (
    <div className='addToPost'>
      <div className='add_to_post_text'>Add To Your Post</div>
      <div className='add_to_post_right'>
        <div
          className='add_to_post_pic hover-1'
          onClick={() => setVisibleTextarea((prev) => !prev)}
        >
          <Photo color={'#4747f7'} />
        </div>
        <div className='add_to_post_pic hover-1'>
          <i className='tag_icon'></i>
        </div>
        <div className='add_to_post_pic hover-1'>
          <Feeling color={'#00ff59'} />
        </div>
        <div className='add_to_post_pic hover-1'>
          <i className='map_icon'></i>
        </div>
        <div className='add_to_post_pic hover-1'>
          <i className='microphone_icon'></i>
        </div>
        <div className='add_to_post_pic hover-1'>
          <Dots />
        </div>
      </div>
    </div>
  );
}
