import './style.css';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import LeftHome from '../../components/home/leftSide/LeftHome';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RightSide from '../../components/home/rightSide/RightSide';
import CenterSide from '../../components/home/center/CenterSide';
import ActivateForm from './ActivateForm';
import { getError } from '../../utils/error/error';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Activate() {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  //   activateAccount();
  // }, []);

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    activateAccount();
  }, []);

  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set('userInfo', JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: 'VERIFY',
        payload: true,
      });
      setTimeout(() => {
        navigate('/');
      }, 3500);
    } catch (err) {
      setError(getError(err));
      setTimeout(() => {
        navigate('/');
      }, 3500);
    }
  };
  return (
    <div>
      {success && (
        <ActivateForm
          type='success'
          header='Account verification Success'
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type='error'
          header='Account verification Failed'
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <div className='home_bodyWrapper'>
        <LeftHome user={user} />
        <div className='center_side'>
          <CenterSide />
        </div>
        <RightSide />
      </div>
    </div>
  );
}
