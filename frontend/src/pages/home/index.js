import './style.css';
import Header from '../../components/header';
import LeftHome from '../../components/home/leftSide/LeftHome';
import { useSelector } from 'react-redux';
import RightSide from '../../components/home/rightSide/RightSide';
import CenterSide from '../../components/home/center/CenterSide';

export default function Home({posts}) {
  const { user } = useSelector((user) => ({ ...user }));

  return (
    <div>
      <Header page='home' />
      <div className='home_bodyWrapper'>
        <LeftHome user={user} />
        <div className='center_side'>
          <CenterSide user={user}/>
        </div>
        <RightSide />
      </div>
    </div>
  );
}
