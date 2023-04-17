import React from 'react';
import { Link } from 'react-router-dom';
import { helpUserMenuData } from '../../../data/userMenu/helpUserMenuData';
import { Return } from '../../../svg';

export default function HelpSupport({ setVisible }) {
  return (
    <div>
      <div className='user_menu'>
        <div className='user_menu_header'>
          <div className='arrow_sett' onClick={() => setVisible(0)}>
            <Return />
          </div>
          <div className='info_user'>
            <b>Setting & Privacy</b>
          </div>
        </div>
        <div className='user_body_menuItem'>
          {helpUserMenuData.map((item, i) => (
            <Link to={item.to} key={i} className='user_menuItem'>
              <div className='info_user'>
                <i className={item.src}></i>
              </div>
              <div className='info_user'>
                <p>{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
