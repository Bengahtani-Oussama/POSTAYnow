import './style.css';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import {
  Search,
  HomeActive,
  Friends,
  LiveVideo,
  Market,
  Gaming,
  Menu,
  Messenger,
  Notifications,
  ArrowDown,
  Home,
} from '../../svg';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import SearchMenu from './searchMenu/SearchMenu';
import { useRef, useState } from 'react';
import useOnclickOutSide from '../../helpers/onclickOutSide';
import AllMenu from './allMenu/AllMenu';
import UserMenu from './userMenu/UserMenu';

export default function Header({ page }) {
  const { user } = useSelector((user) => ({ ...user }));

  const orang_secondary = '#ffb742';

  /**------- Init Function  OnclickOutSide to Close Any drop down Menu  -------- */
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const ele = useRef(null);
  const menu = useRef(null);
  const userMenu = useRef(null);

  useOnclickOutSide(ele, () => {
    setShowSearchMenu(false);
  });
  useOnclickOutSide(menu, () => {
    setShowAllMenu(false);
  });
  useOnclickOutSide(userMenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className='header_left'>
        <div className='header_left'>
          <Link to='/'>
            <div className='circle'>
              <img src='/icons/logo-2.ico' alt='logo' />
            </div>
          </Link>
          <div
            className='search searchi'
            onClick={() => {
              setShowSearchMenu(true);
            }}
          >
            <Search color={'orange'} />
            <input
              className='search_input'
              placeholder='Search ...'
              type='text'
            />
          </div>
        </div>
      </div>
      {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} />}

      <div className='header_center'>
        <Link
          to='/'
          className={`${
            page === 'home' ? 'meddle_icon active' : 'meddle_icon'
          }`}
        >
          {page === 'home' ? <HomeActive /> : <Home color={orang_secondary} />}
        </Link>
        <Link to='/' className='meddle_icon hover1'>
          <Badge badgeContent={1} variant='standard' color='error'>
            <Friends color={orang_secondary} />
          </Badge>
        </Link>
        <Link to='/' className='meddle_icon hover1'>
          <LiveVideo color={orang_secondary} />
        </Link>
        <Link to='/' className='meddle_icon hover1'>
          <Badge variant='standard' badgeContent={3} color='error'>
            <Market color={orang_secondary} />
          </Badge>
        </Link>
        <Link to='/' className='meddle_icon hover1'>
          <Gaming color={orang_secondary} />
        </Link>
      </div>
      <div className='header_right'>
        <Link
          to={`/profile/${user.username}`}
          className={
            page === 'home'
              ? 'portfolio_link hover1'
              : 'portfolio_link portfolio_link_profile hover1'
          }
        >
          <Avatar src={user.picture} alt={user.firstName} />
          {page === 'home' ? (
            <span>{user.firstName}</span>
          ) : (
            <span className='header_profile_user'>{user?.firstName}</span>
          )}
        </Link>
        <div className='circle_icon hover1' ref={menu}>
          <div onClick={() => setShowAllMenu((prev) => !prev)}>
            <Menu />
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className='circle_icon messenger hover1'>
          <div>
            <Badge badgeContent={6} variant='standard' color='error'>
              <Messenger />
            </Badge>
          </div>
        </div>
        <div className='circle_icon notification hover1'>
          <div>
            <Badge badgeContent={22} variant='standard' color='error'>
              <Notifications />
            </Badge>
          </div>
        </div>
        <div className='circle_icon hover1' ref={userMenu}>
          <div onClick={() => setShowUserMenu((prev) => !prev)}>
            <ArrowDown color={orang_secondary} />
          </div>
          {showUserMenu && <UserMenu />}
        </div>
      </div>
    </header>
  );
}
