import { Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useMediaQuery } from 'react-responsive';

export default function PeopleCard({ userItem }) {
  const view1 = useMediaQuery({
    query: '(min-width: 320px)',
  });
  const view2 = useMediaQuery({
    query: '(min-width: 480px)',
  });
  const view3 = useMediaQuery({
    query: '(min-width: 768px) and (max-width : 1400px)',
  });

  return (
    <div className='people_card'>
      <div className='people_img'>
        <img src={userItem.profile_img} alt='' />
      </div>
      <div className='people_name'>
        {userItem.profile_name.length > 30
          ? userItem.profile_name.subString(0, 30)
          : userItem.profile_name}
      </div>
      <div className='people_add_btn'>
        <Button size='small' startIcon={<PersonAddAlt1Icon />} color='warning'>
          {view3 ? 'Add Friend' : view2 ? 'Add' : view1 && ''}
        </Button>
      </div>
    </div>
  );
}
