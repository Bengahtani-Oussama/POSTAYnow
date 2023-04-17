import { useState } from 'react';

import Display from './Display';
import HelpSupport from './HelpSupport';
import MainUserMenu from './MainUserMenu';
import SettingPrivacy from './SettingPrivacy';

export default function UserMenu() {
  const [visible, setVisible] = useState(0);

  return (
    <>
      {visible === 0 && <MainUserMenu setVisible={setVisible} />}
      {visible === 1 && <SettingPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <Display setVisible={setVisible} />}
    </>
  );
}
