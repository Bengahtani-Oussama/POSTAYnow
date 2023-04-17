import { Form, Formik } from 'formik';
import LoginInput from '../../components/inputs/loginInput';
import BeatLoader from 'react-spinners/BeatLoader';
import { getError } from '../../utils/error/error';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function CodeVerification({
  code,
  setCode,
  error,
  setError,
  loading,
  setLoading,
  setVisible,
  userInfos,
}) {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  /** ----------- Regular Validation UserName If Exist and Change It  ------------ */
  const resetValidation = Yup.object({
    code: Yup.string()
      .required('Please Fille Your Code')
      .max(100, 'Must be the Code less then 100 character'),
  });
  const { email } = userInfos;

  const resetSubmit = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        { email, code }
      );

      enqueueSnackbar('Validation Code is Correct', { variant: 'success' });

      setVisible(3);
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
            code,
          }}
          validationSchema={resetValidation}
          onSubmit={() => resetSubmit()}
        >
          {(formik) => (
            <Form>
              <LoginInput
                type='text'
                name='code'
                onChange={(e) => setCode(e.target.value)}
                placeholder='Enter your Code'
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
