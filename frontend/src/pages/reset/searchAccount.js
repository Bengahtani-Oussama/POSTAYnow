import { Form, Formik } from 'formik';
import LoginInput from '../../components/inputs/loginInput';
import BeatLoader from 'react-spinners/BeatLoader';
import { getError } from '../../utils/error/error';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function SearchAccount({
  email,
  setEmail,
  error,
  setError,
  loading,
  setLoading,
  setVisible,
  setUserInfos,
}) {
  const navigate = useNavigate();

  /** ----------- Regular Validation UserName If Exist and Change It  ------------ */
  const resetValidation = Yup.object({
    email: Yup.string()
      .required('Please Fille Your Email Or phone')
      .email('Must be a valid email')
      .max(100, 'Must be email less then 100 character'),
  });

  const resetSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/finduser`,
        {
          email,
        }
      );

      setUserInfos(data);
      setVisible(1);
      setLoading(false);
      setError('');
    } catch (err) {
      setLoading(false);
      setError(getError(err));
    }
  };
  return (
    <div className='reset_card card'>
      <div className='reset_card_header'>Find Your Account</div>
      <div className='reset_card_text'>
        To search for your account please enter your email address or your phone
        number.
      </div>
      <div className='reset_card_form'>
        <Formik
          enableReinitialize
          initialValues={{
            email,
          }}
          validationSchema={resetValidation}
          onSubmit={() => resetSubmit()}
        >
          {(formik) => (
            <Form>
              <LoginInput
                type='text'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email address or Phone number'
              />

              <div className='reset-fr-btn'>
                <button className='orangBtn formLoginUser' type='submit'>
                  <BeatLoader size={10} loading={loading} color='#0d0944' />{' '}
                  <span> Search</span>
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
