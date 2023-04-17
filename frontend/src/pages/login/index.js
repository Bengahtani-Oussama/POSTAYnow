import './style.css';

import LoginForm from '../../components/login/loginForm';
import LoginFooter from '../../components/login/loginFooter';
import RegisterForm from '../../components/login/registerForm';
import { useState } from 'react';

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className='login'>
      <div className='loginWrapper'>
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <LoginFooter />
      </div>
    </div>
  );
}
