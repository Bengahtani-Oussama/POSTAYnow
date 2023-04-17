import { Avatar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { getError } from '../../utils/error/error';
import { useSnackbar } from 'notistack';
import BeatLoader from 'react-spinners/BeatLoader';
import axios from 'axios';

export default function SendEmail({
  userInfos,
  email,
  error,
  setError,
  loading,
  setLoading,
  setVisible,
}) {
  // const cashEmail = userInfos?.email;
  const lengthemail = userInfos?.email.split('@')[0].length - 4;
  const lessemail = userInfos?.email.split('@')[0].slice(lengthemail);
  const cashEmail = '******' + lessemail + '@' + userInfos?.email.split('@')[1];
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const sendEmailCode = async () => {
    closeSnackbar();
    try {
      setLoading(true);

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );
      enqueueSnackbar('Email Sended Successfully', { variant: 'success' });

      setVisible(2);
      setError('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(getError(err));
    }
  };
  return (
    <div className='reset_card card'>
      <div className='send_mailTop'>
        <div className='send_mailLeft'>
          <div className='reset_card_header'>Reset Your Password</div>
          <div className='reset_card_text'>
            Check how you received the code to be able to enter your new
            password
          </div>
          <label htmlFor='email'>
            <input checked readOnly type='radio' name='email' id='email' />
            <div>
              <p> Send Code as email</p>
              <span>{cashEmail}</span>
            </div>
          </label>
        </div>
        <div className='send_mailRight'>
          <Avatar alt={userInfos?.picture} src={userInfos?.picture} />
          <div>
            <p>{userInfos?.username}</p>
            <p>{cashEmail}</p>
          </div>
        </div>
      </div>
      <div className='send_mailBottom '>
        <Link to='/login'>not you?</Link>
        <button className='orangBtn headerBtn' onClick={() => sendEmailCode()}>
          <BeatLoader size={10} loading={loading} color='#0d0944' />
          Send
        </button>
      </div>
      {error && <div className='error'>{error}</div>}
    </div>
  );
}
