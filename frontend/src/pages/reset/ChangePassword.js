import { Form, Formik } from 'formik';
import LoginInput from '../../components/inputs/loginInput';
import BeatLoader from 'react-spinners/BeatLoader';
import { getError } from '../../utils/error/error';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function ChangePassword({
  password,
  setPassword,
  conf_Password,
  setConf_Password,
  error,
  loading,
  setError,
  setLoading,
  userInfos,
}) {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { email } = userInfos;

  /** ----------- Regular Validation UserName If Exist and Change It  ------------ */
  const resetValidation = Yup.object({
    password: Yup.string()
      .required('Password Is Required')
      .min(6, 'Must be Password Great then 5 character')
      .max(40, 'Must be Password less then 40 character'),
    conf_Password: Yup.string()
      .required('Confirm Password Is Required')
      .oneOf([Yup.ref('password')], 'Password must match!')
      .min(6, 'Must be Confirm Password Great then 5 character')
      .max(40, 'Must be Confirm Password less then 40 character'),
  });

  const changePasswordSubmit = async () => {
    closeSnackbar();
    try {
      setLoading(true);

      // changePassword
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email,
        password,
      });

      enqueueSnackbar('Password has been changed successfully!', {
        variant: 'success',
      });
      setLoading(false);
      setError('');
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(getError(err));
    }
  };
  return (
    <div className='reset_card card'>
      <div className='reset_card_header'>Change Password</div>
      <div className='reset_card_text'>Enter Your New Password</div>
      <div className='reset_card_form'>
        <Formik
          enableReinitialize
          initialValues={{
            password,
            conf_Password,
          }}
          validationSchema={resetValidation}
          onSubmit={() => changePasswordSubmit()}
        >
          {(formik) => (
            <Form>
              <LoginInput
                type='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter Your New Password'
              />
              <LoginInput
                type='password'
                name='conf_Password'
                onChange={(e) => setConf_Password(e.target.value)}
                placeholder='Enter Your Confirm New Password'
              />

              <div className='reset-fr-btn'>
                <button className='orangBtn formLoginUser' type='submit'>
                  <BeatLoader size={8} loading={loading} color='#0d0944' />{' '}
                  <span> Continue</span>
                </button>
                <button
                  className='orangBtn formLoginUser'
                  onClick={() => navigate('/login')}
                >
                  <span> Cancel</span>
                </button>
              </div>
              {error && <div className='reset_card_text error'>{error}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
