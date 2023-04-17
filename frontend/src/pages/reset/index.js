import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import LoginFooter from '../../components/login/loginFooter';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useState } from 'react';
import SearchAccount from './searchAccount';
import SendEmail from './SendEmail';
import CodeVerification from './CodeVerification';
import ChangePassword from './ChangePassword';

export default function Reset() {
  const { user } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove('userInfo');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const [visible, setVisible] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [conf_Password, setConf_Password] = useState('');
  const [userInfos, setUserInfos] = useState('');

  return (
    <div className='reset'>
      <div className='reset_header'>
        <Link to={`${user ? '/' : '/login'} `}>
          <div className='circle'>
            <img src='/icons/logo-2.ico' alt='logo' />
          </div>
        </Link>
        <Link to={`${user ? '/' : '/login'} `}>
          <div className=' logo_text'>POSTAY</div>
        </Link>
        {user ? (
          <div className='headerLoginUser'>
            <Link to='/portfolio'>
              <Avatar src={user?.picture} />
            </Link>
            <button
              className='orangBtn headerBtn'
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className='orangBtn headerBtn'
            onClick={() => navigate('/login')}
          >
            login
          </button>
        )}
      </div>
      <div className='reset_content'>
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setVisible={setVisible}
            setUserInfos={setUserInfos}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            email={email}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setVisible={setVisible}
            setUserInfos={setUserInfos}
            userInfos={userInfos}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            code={code}
            setCode={setCode}
            error={error}
            loading={loading}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            error={error}
            loading={loading}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
            password={password}
            setPassword={setPassword}
            conf_Password={conf_Password}
            setConf_Password={setConf_Password}
          />
        )}
      </div>
      <div className='reset_footer'>
        <LoginFooter />
      </div>
    </div>
  );
}
