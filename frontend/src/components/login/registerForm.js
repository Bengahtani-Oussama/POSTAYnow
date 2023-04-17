import { Formik, Form } from 'formik';

import {  useState } from 'react';
import * as Yup from 'yup';
import RegisterInput from '../inputs/registerInput';
import { useSnackbar } from 'notistack';
import BeatLoader from 'react-spinners/BeatLoader';
import { getError } from '../../utils/error/error';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm({ setVisible }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const userInfos = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  };

  const yearTmp = new Date().getFullYear();

  const [user, setUser] = useState(userInfos);
  const { email, password, firstName, lastName, bYear, bMonth, bDay, gender } =
    user;

  /** ----------- Regular Validation UserName If Exist and Change It  ------------ */
  const singInChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  /** ----------- Field Date Of Berth Day options  ------------ */
  const years = Array.from(new Array(100), (val, index) => yearTmp - index);
  const months = Array.from(new Array(12), (val, index) => index + 1);
  /** ----------- How to get how many days in this month  ------------ */
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  /** ----------- Regular Validation UserName If Exist and Change It  ------------ */
  const singInValidation = Yup.object({
    firstName: Yup.string()
      .required('What is your First Name')
      .max(20, 'Must be first name less then 20 character')
      .min(2, 'Must be first name Great then 2 character'),
    lastName: Yup.string()
      .required('hat is your last Name')
      .max(20, 'Must be first name less then 20 character')
      .min(2, 'Must be last name Great then 2 character'),
    email: Yup.string()
      .required('Please Fille Your Email Or phone')
      .email('Must be a valid email'),
    password: Yup.string()
      .required('Password Is Required')
      .min(6, 'Must be Password Great then 5 character')
      .max(40, 'Must be Password less then 40 character'),
  });

  // console.log(user);

  const [genderError, setGenderError] = useState(false);

  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  /** ----------- Register Form Submit Handler  ------------ */
  const registerSubmit = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        { email, password, firstName, lastName, bYear, bMonth, bDay, gender }
      );

      enqueueSnackbar(data.message, { variant: 'success' });
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('userInfo', JSON.stringify(rest));
        navigate('/');
      }, 2000);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <div className='blur'>
      <div className='register'>
        <div className='registerHeader'>
          <i className='exit_icon' onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>Create your account easily</span>
        </div>
        <div className='registerFormWrap'>
          <Formik
            enableReinitialize
            initialValues={{
              firstName,
              lastName,
              email,
              password,
              bYear,
              bMonth,
              bDay,
              gender,
            }}
            validationSchema={singInValidation}
            onSubmit={() => {
              setGenderError(false);
              closeSnackbar();
              let currentDate = new Date();
              let pickedDate = new Date(bYear, bMonth - 1, bDay);
              let less_14 = new Date(1970 + 14, 0, 1);
              let more_70 = new Date(1970 + 70, 0, 1);
              if (currentDate - pickedDate < less_14) {
                enqueueSnackbar(
                  'You are not allowed to create an account currently, under the legal age of 14 years!',
                  { variant: 'error' }
                );
              } else if (currentDate - pickedDate > more_70) {
                enqueueSnackbar(
                  'You are not allowed to create an account currently, over the legal age of 70 years',
                  { variant: 'error' }
                );
              } else if (gender === '') {
                setGenderError(true);
                enqueueSnackbar(
                  'Chose your gender, You can change it after register',
                  {
                    variant: 'error',
                  }
                );
              } else {
                registerSubmit();
              }
            }}
          >
            {(formik) => (
              <Form className='registerForm'>
                <div className='inlineFirstInput'>
                  <RegisterInput
                    className='inpRegComb'
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    onChange={singInChangeHandler}
                  />
                  <RegisterInput
                    className='inpRegComb'
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    onChange={singInChangeHandler}
                  />
                </div>
                <div className=''>
                  <RegisterInput
                    type='text'
                    name='email'
                    placeholder='Email address or Mobile phone'
                    onChange={singInChangeHandler}
                  />
                </div>
                <div className=''>
                  <RegisterInput
                    type='password'
                    name='password'
                    placeholder='New Password'
                    onChange={singInChangeHandler}
                    bottom
                  />
                </div>
                <div className='columnFirstInput'>
                  <div className='HC_BerthDay'>
                    Date Of Berth Day <i className='info_icon'></i>
                  </div>
                  <div className='Grid_Regst'>
                    <select
                      name='bDay'
                      value={bDay}
                      onChange={singInChangeHandler}
                    >
                      {days.map((day, i) => (
                        <option value={day} key={i}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      name='bMonth'
                      value={bMonth}
                      onChange={singInChangeHandler}
                    >
                      {months.map((month, i) => (
                        <option value={month} key={i}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name='bYear'
                      value={bYear}
                      onChange={singInChangeHandler}
                    >
                      {years.map((year, i) => (
                        <option value={year} key={i}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='columnFirstInput'>
                  <div className='HC_BerthDay'>
                    gender <i className='info_icon'></i>
                  </div>
                  <div className='Grid_RegstGender'>
                    <label
                      htmlFor='male'
                      style={{ borderColor: genderError && 'red' }}
                    >
                      Male
                      <input
                        type='radio'
                        name='gender'
                        value='male'
                        id='male'
                        onChange={singInChangeHandler}
                      />
                    </label>
                    <label
                      htmlFor='female'
                      style={{ borderColor: genderError && 'red' }}
                    >
                      Female
                      <input
                        type='radio'
                        name='gender'
                        value='female'
                        id='female'
                        onChange={singInChangeHandler}
                      />
                    </label>
                  </div>
                </div>
                <div className='btnRegister'>
                  <button className='orangBtn' type='submit'>
                    <BeatLoader loading={loading} color='#0d0944' />{' '}
                    <span> Sing In</span>
                  </button>
                  <button
                    className='orangBtn OpenSingUp'
                    onClick={() => setVisible(false)}
                  >
                    Log In
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
