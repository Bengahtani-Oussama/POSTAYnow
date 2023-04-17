import { Link } from 'react-router-dom';
export default function LoginFooter() {
  return (
    <footer className='footer'>
      <div className='footerWrap'>
        <Link to='/'>Sign Up</Link>
        <Link to='/'>Log In</Link>
        <Link to='/'>Chatting</Link>
        <Link to='/'>Postay</Link>
        <Link to='/'>Lite Watch</Link>
        <Link to='/'>Shopping Marketplace</Link>
        <Link to='/'>Pay</Link>
        <Link to='/'>Bulletin</Link>
        <Link to='/'>Fundraisers</Link>
        <Link to='/'>Services</Link>
        <Link to='/'>Voting</Link>
        <Link to='/'>Center Privacy</Link>
        <Link to='/'>Policy Privacy</Link>
        <Link to='/'>About</Link>
        <Link to='/'>Create Ad</Link>
        <Link to='/'>Terms</Link>
        <Link to='/'>Help</Link>
        <Link to='/'>Settings</Link>
      </div>
      <div className='footerPOSATY'>
        <b>POSTAY © 2023</b>
      </div>
    </footer>
  );
}
