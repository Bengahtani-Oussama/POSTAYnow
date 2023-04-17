import { Avatar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function MainUserMenu({ setVisible }) {
  const { user } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('userInfo');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className='user_menu'>
      <Link to={`/profile/${user.username}`} className='user_menu_header'>
        <div className='img_user'>
          <Avatar src={user?.picture} alt={user?.firstName} />
        </div>
        <div className='info_user'>
          <p>{user?.firstName}</p>
          <span>{user?.email}</span>
        </div>
      </Link>
      <div className='user_body_menuItem'>
        <Link to='/feedback' className='user_menuItem'>
          <div className=''>
            <i className='report_filled_icon'></i>
          </div>
          <div className='info_user'>
            <p>FeedBack</p>
            <span>Help us improve more</span>
          </div>
        </Link>
        <div className='user_menuItem' onClick={() => setVisible(1)}>
          <div className=''>
            <i className='settings_filled_icon'></i>
          </div>
          <div className='info_user arrow_right'>
            <p>Setting & Privacy</p>
            <i className='right_icon'></i>
          </div>
        </div>
        <div className='user_menuItem' onClick={() => setVisible(2)}>
          <div className=''>
            <i className='help_filled_icon'></i>
          </div>
          <div className='info_user arrow_right'>
            <p>Help & Support</p>
            <i className='right_icon'></i>
          </div>
        </div>
        <div className='user_menuItem' onClick={() => setVisible(3)}>
          <div className=''>
            <i className='dark_filled_icon'></i>
          </div>
          <div className='info_user arrow_right'>
            <p>Display</p>
            <i className='right_icon'></i>
          </div>
        </div>
        <div className='user_menuItem'>
          <div className='info_user'>
            <i className='logout_filled_icon'></i>
          </div>
          <div className='info_user' onClick={() => logout()}>
            <p className='logout'>logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
