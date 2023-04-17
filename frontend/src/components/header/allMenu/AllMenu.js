import { useRef, useState } from 'react';
import { allMenuCreate } from '../../../data/allMenuCreate';
import { allMenuData } from '../../../data/allMenuData';
import { Search } from '../../../svg';
import AllMenuCreate from './AllMenuCreate';
import AllMenuItem from './AllMenuItem';

export default function AllMenu() {
  const [visibleIcon, setVisibleIcon] = useState(true);
  const input = useRef(null);

  return (
    <div className='menu'>
      <div className='menu_header'>
        <h2>Menu</h2>
      </div>
      <div className='menu_content'>
        <div className='left_menu_content'>
          <div className='left_menu_search'>
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
          <div className='left_menu_body_sec'>
            <div className='left_menu_body'>
              <div className='body_header'>
                <b>Social</b>
              </div>
              <div className='body_content'>
                {allMenuData.slice(0, 5).map((item, i) => (
                  <AllMenuItem
                    key={i}
                    src={item.src}
                    name={item.name}
                    desc={item.desc}
                    to={item.to}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='left_menu_body_sec'>
            <div className='left_menu_body'>
              <div className='body_header'>
                <b>Entertainment</b>
              </div>
              <div className='body_content'>
                {allMenuData.slice(5, 8).map((item, i) => (
                  <AllMenuItem
                    key={i}
                    src={item.src}
                    name={item.name}
                    desc={item.desc}
                    to={item.to}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='left_menu_body_sec'>
            <div className='left_menu_body'>
              <div className='body_header'>
                <b>Shopping</b>
              </div>
              <div className='body_content'>
                {allMenuData.slice(8, 10).map((item, i) => (
                  <AllMenuItem
                    key={i}
                    src={item.src}
                    name={item.name}
                    desc={item.desc}
                    to={item.to}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='left_menu_body_sec'>
            <div className='left_menu_body'>
              <div className='body_header'>
                <b>Personnel</b>
              </div>
              <div className='body_content'>
                {allMenuData.slice(10, 14).map((item, i) => (
                  <AllMenuItem
                    key={i}
                    src={item.src}
                    name={item.name}
                    desc={item.desc}
                    to={item.to}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='right_menu_content'>
          <div className='right_header'>
            <b>Create</b>
          </div>
          <div className='right_content'>
            {allMenuCreate.map((item, i) => (
              <AllMenuCreate
                key={i}
                src={item.src}
                name={item.name}
                to={item.to}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
