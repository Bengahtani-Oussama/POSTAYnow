import './style.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowDown1 } from '../../../svg';
import { useState } from 'react';
import { leftSideData, socialMediaData } from '../../../data/honeData/homeData';

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  console.log('user : ', user);
  return (
    <div className='left_Side_Wrapper'>
      <div className='left_Side_top'>
        <Link to={`/profile/${user.username}`} className='left_Side_Item'>
          <Avatar src={user?.picture} />

          <div className='p visible_heden_tabler'>{user?.username}</div>
        </Link>
        {leftSideData.slice(0, 2).map((item) => (
          <Link key={item.src} to='/' className='left_Side_Item'>
            <img src={item.src} alt={item.name} />
            <div className='p visible_heden_tabler'>{item.name}</div>
          </Link>
        ))}
        <Link to='/' className='left_Side_Item left_Side_Item-1'>
          <img src='/left/groups.png' alt='Groups' />
          <div className='p visible_heden_tabler'>
            <div className=''>Groups</div>
            <span>5 new</span>
          </div>
        </Link>
        <Link to='/' className='left_Side_Item left_Side_Item-1'>
          <img src='/left/watch.png' alt='Groups' />
          <div className=' visible_heden_tabler'>
            <div className=''>Watch</div>
            <span>14 video</span>
          </div>
        </Link>
        {leftSideData.slice(2, 6).map((item) => (
          <Link key={item.src} to='/' className='left_Side_Item'>
            <img src={item.src} alt={item.name} />
            <div className='p visible_heden_tabler'>{item.name}</div>
          </Link>
        ))}

        <div className='asd'>
          {visible &&
            leftSideData.slice(6).map((item) => (
              <Link key={item.src} to='/' className='left_Side_Item'>
                <img src={item.src} alt={item.name} />
                <div className='p visible_heden_tabler'>{item.name}</div>
              </Link>
            ))}
        </div>
        <div
          className='left_Side_Item '
          onClick={() => setVisible((prev) => !prev)}
        >
          <div
            className='arrow'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowDown1 />
            <span className='p visible_heden_tabler'>See more</span>
          </div>
        </div>
      </div>

      <div className='left_Side_bottom'>
        <span>your shortcut</span>
        <div className='left_Side_bottom_items'>
          {socialMediaData.map((item) => (
            <Link key={item.src} to='/' className='left_Side_Item'>
              <img src={item.src} alt={item.name} />
              <div className='p visible_heden_tabler'>{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
