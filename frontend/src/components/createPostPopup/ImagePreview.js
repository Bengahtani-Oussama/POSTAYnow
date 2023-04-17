import { useRef } from 'react';
import Emojipicker from './Emojipicker';
import Photo from '../../svg/photo';

export default function ImagePreview({
  text,
  setText,
  user,
  images,
  setImages,
  setVisibleTextarea,
  setError,
}) {
  const imagePrevRef = useRef(null);

  const imgLength = images.length;

  const handleImageChange = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((img) => {
      if (img.size > 1024 * 1024 * 4) {
        setError(
          `${img.name} Size file too large, please chose file less then 4MB`
        );
        files = files.filter((item) => item.name !== img.name);

        return;
      } else if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/jpg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/gif' &&
        img.type !== 'image/webp'
      ) {
        setError(
          `${img.name} File not supported, please chose file like image`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      }

      const render = new FileReader();
      render.readAsDataURL(img);
      render.onload = (renderEvent) => {
        setImages((images) => [...images, renderEvent.target.result]);
      };
    });
  };

  return (
    <div className='overflow-a'>
      <Emojipicker text={text} setText={setText} user={user} type2 />
      <div className='add_pic_wrap'>
        <input
          type='file'
          accept='image/*'
          multiple
          hidden
          ref={imagePrevRef}
          onChange={handleImageChange}
        />
        {images && images.length ? (
          <div className='add_img_wrapper'>
            <div className='add_img_header_btn'>
              <div className='absolute_top'>
                <button className='add_img_btn'>
                  <i className='edit_icon'></i> Edit
                </button>
                <button
                  className='add_img_btn'
                  onClick={() => imagePrevRef.current.click()}
                >
                  <i className='addPhoto_icon'></i> Add Photo Or Media
                </button>
              </div>
              <div className='small_white_circle'>
                <i className='exit_icon ' onClick={() => setImages([])}></i>
              </div>
            </div>
            <div
              className={` ${
                imgLength === 1
                  ? 'images1'
                  : imgLength === 2
                  ? 'images2'
                  : imgLength === 3
                  ? 'images3'
                  : imgLength === 4
                  ? 'images4'
                  : imgLength === 5
                  ? 'images5'
                  : 'imgs1'
              }`}
            >
              {images.map((img, i) => (
                <img key={i} alt={img} src={img} />
              ))}
            </div>
          </div>
        ) : (
          <div className='add_pic_header'>
            <div className='small_circle_white'>
              <i
                className='exit_icon'
                onClick={() => setVisibleTextarea((prev) => !prev)}
              ></i>
            </div>
            <div
              className='add_pic'
              onClick={() => imagePrevRef.current.click()}
            >
              <Photo />
              <div className='text'>
                <p>Add Photo Or Media</p>
                <p>Or Drog And Down</p>
              </div>
            </div>
          </div>
        )}
        <div className='add_pic_Bottom_mobile'>
          <div>
            <i className='phone_icon'></i>
            <p>Add Photo from you mobile</p>
          </div>
          <b>Add</b>
        </div>
      </div>
    </div>
  );
}
