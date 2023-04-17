import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../../components/inputs/loginInput';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error/error';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import BeatLoader from 'react-spinners/BeatLoader';

export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const loginInfos = {
    email: '',
    password: '',
  };

  const [placeHolderEmail, setPlaceHolderEmail] = useState(
    'Enter your email or phone'
  );
  const [placeHolderPassword, setPlaceHolderPassword] = useState('Password');

  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  // console.log(login);

  /** ----------- Regular Validation UserName If Exist and Change It  ------------ */
  const loginChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  /** ----------- Regular Validation UserName If Exist and Change It  ------------ */
  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Please Fille Your Email Or phone')
      .email('Must be a valid email')
      .max(100, 'Must be email less then 100 character'),
    password: Yup.string()
      .required('Password Is Required')
      .min(6, 'Must be Password Great then 5 character'),
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );
      enqueueSnackbar(data.message, { variant: 'success' });
      const { message, ...rest } = data;

      dispatch({ type: 'LOGIN', payload: rest });
      Cookies.set('userInfo', JSON.stringify(rest));
      setLoading(false);

      navigate('/');
    } catch (err) {
      setError(true);
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  useEffect(() => {
    setPlaceHolderEmail('Enter your email or phone');
    setPlaceHolderPassword('Password');
  }, [error]);

  return (
    <div className='loginWrap'>
      <div className='loginHeader'>
        <img src='../../icons/4-logoB.png' alt='' className='logo' />
        <span>
          Fostay can help you to contact and share your ideas with anyone in the
          world
        </span>
      </div>
      <div className='loginForm'>
        <div className='loginFormWrap'>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => loginSubmit()}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type='text'
                  name='email'
                  placeholder={placeHolderEmail}
                  onChange={loginChangeHandler}
                />
                <LoginInput
                  type='password'
                  name='password'
                  placeholder={placeHolderPassword}
                  onChange={loginChangeHandler}
                  bottom
                />
                <div className='login-fr-btn'>
                  <button className='orangBtn' type='submit'>
                    <BeatLoader size={10} loading={loading} color='#0d0944' />{' '}
                    <span> LogIn</span>
                  </button>
                  <Link to='/reset' className='ForgetPassword'>
                    <span> Forget password?</span>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>

          <button
            className='orangBtn OpenSingUp'
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <div className='SingBusinessWrap'>
          <p>
            <Link to='/business-page' className='SingBusiness'>
              <b> Create a Page </b>
            </Link>
            <span>for a Business, Brand Or Celebrity Account.</span>
          </p>
        </div>
      </div>
      {/* <div className='register'></div> */}
    </div>
  );
}
