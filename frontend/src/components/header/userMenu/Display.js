import { Return } from '../../../svg';

export default function Display({ setVisible }) {
  return (
    <div>
      <div className='user_menu'>
        <div className='user_menu_header'>
          <div className='arrow_sett' onClick={() => setVisible(0)}>
            <Return />
          </div>
          <div className='info_user'>
            <b>Display</b>
          </div>
        </div>
        <div className='user_body_menuItem'>
          <div className='user_menuItem'>
            <div className=''>
              <i className='dark_filled_icon'></i>
            </div>
            <div className='info_user'>
              <p>Dark Mode</p>
              <span>Help us improve more</span>
            </div>
          </div>
          <div className='chose_darkMode'>
            <label htmlFor='off'>
              Light
              <input type='radio' name='darkMode' value='off' id='off' />
            </label>
            <label htmlFor='on'>
              Dark
              <input type='radio' name='darkMode' value='on' id='on' />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
