import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import Picker from 'emoji-picker-react';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef, useState } from 'react';
import useOnclickOutSide from '../../helpers/onclickOutSide';
import ErrorPost from '../createPostPopup/errorPost';

export default function CreateComment() {
  const { user } = useSelector((user) => ({ ...user }));
  const view1 = useMediaQuery({
    query: '(min-width: 320px)',
  });
  const view2 = useMediaQuery({
    query: '(min-width: 481px)',
  });
  const view3 = useMediaQuery({
    query: '(min-width: 641px)',
  });

  const [visiblePicker, setVisiblePicker] = useState(false);
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState();

  const textRef = useRef(null);
  const pictRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  useOnclickOutSide(pictRef, () => {
    setVisiblePicker(false);
  });

  //   Add Image Handler
  const imagePrevRef = useRef(null);
  const [error, setError] = useState('');
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    let file = e.target.files[0];

    if (file.size > 1024 * 1024 * 4) {
      setError(
        `${file.name} Size file too large, please chose file less then 4MB`
      );
      return;
    } else if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif' &&
      file.type !== 'image/webp'
    ) {
      setError(`${file.name} File not supported, please chose file like image`);
      return;
    }

    const render = new FileReader();
    render.readAsDataURL(file);
    render.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <div>
      <div className='create_comment_wrapper'>
        <Avatar
          className='create_comment_avatar'
          src={user.picture}
          alt={user.username}
        ></Avatar>
        <div className='create_comment_inputs'>
          {error && <ErrorPost error={error} setError={setError} />}
          <div className='create_comment_inp'>
            <input
              type='text'
              className='create_commentInputText'
              ref={textRef}
              value={text}
              placeholder={`Create your comment ${user?.firstName}`}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className='create_comment_icons'>
            <div className='add_imoji'>
              <i
                className='emoji_icon'
                onClick={() => setVisiblePicker((prev) => !prev)}
              ></i>

              {visiblePicker && (
                <div ref={pictRef} className='commentEmoji_picker'>
                  <Picker
                    theme='dark'
                    height={view3 ? 500 : view2 ? 400 : view1 ? 400 : 500}
                    width={view3 ? 350 : view2 ? 250 : view1 ? 240 : 400}
                    emojiStyle='facebook'
                    onEmojiClick={handleEmoji}
                  />
                </div>
              )}
            </div>
            <div className='add_img'>
              <input
                type='file'
                accept='image/*'
                hidden
                ref={imagePrevRef}
                onChange={handleImageChange}
              />
              <i
                className='camera_icon'
                onClick={() => imagePrevRef.current.click()}
              ></i>
            </div>
            <div className='add_jif'>
              <i className='gif_icon'></i>
            </div>
            <div className='add_stick'>
              <i className='sticker_icon'></i>
            </div>
          </div>
        </div>
      </div>
      {image && (
        <div className='image_comment_wrap'>
          <div className='images_comment_rel'>
            <img className='images_comment' src={image} alt='' />
            <div className='exit_icon_comment'>
              <i className='exit_icon' onClick={() => setImage('')}></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
