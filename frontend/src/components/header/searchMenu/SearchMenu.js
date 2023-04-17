import { useRef, useState } from 'react';
import useOnclickOutSide from '../../../helpers/onclickOutSide';
import { Return, Search } from '../../../svg';

export default function SearchMenu({ setShowSearchMenu }) {
  const [visibleIcon, setVisibleIcon] = useState(true);

  const menu = useRef(null);
  const input = useRef(null);

  useOnclickOutSide(menu, () => {
    setShowSearchMenu(false);
  });
  return (
    <div ref={menu} className='header_left search_area scrollBar'>
      <div className='search_wrap'>
        <div className='header_logo'>
          <div
            className='circle hover1'
            onClick={() => setShowSearchMenu(false)}
          >
            <Return />
          </div>
        </div>
        <div
          className='search'
          onClick={() => {
            input.current.focus();
          }}
        >
          {visibleIcon && <Search color={'orange'} />}

          <input
            ref={input}
            className='search_input'
            placeholder='Search ...'
            type='text'
            autoFocus
            onFocus={() => setVisibleIcon(false)}
            onBlur={() => setVisibleIcon(true)}
          />
        </div>
      </div>
      <div className='search_history_header'>
        <span>recent Search</span>
        <a>Edit</a>
      </div>
      <div className='search_history'></div>
      <div className='search_Result scrollBar'></div>
    </div>
  );
}
