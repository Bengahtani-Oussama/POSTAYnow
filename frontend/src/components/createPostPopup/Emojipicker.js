import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import { useMediaQuery } from 'react-responsive';
import useOnclickOutSide from '../../helpers/onclickOutSide';

export default function Emojipicker({
  text,
  user,
  setText,
  type2,
  postBackground,
  setPostBackground,
}) {
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
  const [postHistoryImg, setPostHistoryImg] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  const textRef = useRef(null);
  const bgtRef = useRef(null);
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
    setVisiblePicker((prev) => !prev);
  });
  const postBackgrounds = [
    '/images/postBackgrounds/1.jpg',
    '/images/postBackgrounds/2.jpg',
    '/images/postBackgrounds/3.jpg',
    '/images/postBackgrounds/4.jpg',
    '/images/postBackgrounds/5.jpg',
    '/images/postBackgrounds/6.jpg',
    '/images/postBackgrounds/7.jpg',
    '/images/postBackgrounds/8.jpg',
    '/images/postBackgrounds/9.jpg',
    '/images/postBackgrounds/10.jpg',
  ];

  const bgHandler = (i) => {
    bgtRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setPostBackground(postBackgrounds[i]);
    bgtRef.current.classList.add('gbHandler');
  };
  const noBgHandler = () => {
    bgtRef.current.style.backgroundImage = ``;
    setPostBackground('');
    bgtRef.current.classList.remove('gbHandler');
  };

 
  return (
    <>
      <div
        className={`${
          !type2 ? 'create_postTextPost' : 'create_postTextPostT2'
        }`}
        ref={bgtRef}
      >
        <textarea
          ref={textRef}
          maxLength='450'
          value={text}
          className={`${!type2 ? 'post_text_area' : 'post_text_areaT2'}`}
          style={{
            paddingTop: `${
              postBackground && postHistoryImg
                ? Math.abs(textRef.current.length * 0.1 - 30)
                : ''
            }%`,
          }}
          placeholder={`You can create your post ${user?.firstName}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {type2 && (
          <i
            className='emoji_icon_large'
            onClick={() => setVisiblePicker((prev) => !prev)}
          ></i>
        )}
      </div>
      <div className='create_postEmojis'>
        <div className='pic_story'>
          {/* if open Image Preview Component not show this Img */}
          {!type2 && (
            <>
              <img
                className='post_history_img1'
                src='/icons/colorful.png'
                alt=''
                onClick={() => setPostHistoryImg((prev) => !prev)}
              />
              {postHistoryImg && (
                <div className='overflow-x-1'>
                  <div
                    className='post_history_img no_bg'
                    onClick={() => noBgHandler()}
                  ></div>
                  {postBackgrounds.map((img, i) => (
                    <img
                      key={i}
                      className='post_history_img'
                      src={img}
                      alt=''
                      onClick={() => bgHandler(i)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {!type2 && (
          <i
            className='emoji_icon_large'
            onClick={() => setVisiblePicker((prev) => !prev)}
          ></i>
        )}

        {visiblePicker && (
          <div
            ref={pictRef}
            className={`${
              !type2 ? 'comment_emoji_picker' : 'comment_emoji_pickerT2'
            } remove`}
          >
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
    </>
  );
}
