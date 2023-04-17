import './style.css';
import { Link } from 'react-router-dom';
import { Dots, LiveVideo, Search } from '../../../svg';
import { Avatar, Badge } from '@mui/material';
import { contactData } from '../../../data/honeData/homeData';

export default function RightSide() {
  const color = '#d37800';

  return (
    <div className='Right_Side_Wrapper'>
      <div className='header_right_side'>
        <div className='Sponsored'>
          <span className='visible_heden_text'>Sponsored</span>
        </div>
        <div className='right_side_contact'>
          <div>
            <span className='visible_heden_text'>Contacts</span>
            <div className='visible_heden_text'>
              <LiveVideo color={color} />
              <Search color={color} />
              <Dots color={color} />
            </div>
          </div>
          {contactData.map((item, i) => (
            <Link key={i} to='/' className='left_right_contact_Item'>
              <Badge
                color='success'
                variant='dot'
                overlap='circular'
                badgeContent=''
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Avatar src={item.img} alt='contact' />
              </Badge>
              <p className='p'>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
