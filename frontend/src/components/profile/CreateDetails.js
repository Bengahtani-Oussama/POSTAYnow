import { Button } from '@mui/material';
import React, { useState } from 'react';
import Close from '../../svg/close';
import Sending from '../../svg/sending';

import PersonIcon from '@mui/icons-material/AccountCircleTwoTone';
import WorkIcon from '@mui/icons-material/WorkTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import CurrentCityIcon from '@mui/icons-material/HomeWorkTwoTone';
import RelationshipIcon from '@mui/icons-material/Diversity1TwoTone';
import ADD from '../../svg/add';

export default function CreateDetails({
  header,
  icon,
  placeholder,
  value,
  setShowDetails,
  bioHandleChange,
  UpdateDetailsInfo,
  relation,
}) {
  const [showAddInfo, setShowAddInfo] = useState(false);

  const iconsObj = {
    otherName: <PersonIcon color='warning' />,
    job: <WorkIcon color='warning' />,
    workplace: <WorkIcon color='warning' />,
    highSchool: <SchoolTwoToneIcon color='warning' />,
    college: <SchoolTwoToneIcon color='warning' />,
    currentCity: <CurrentCityIcon color='warning' />,
    hometown: <CurrentCityIcon color='warning' />,
    relationship: <RelationshipIcon color='warning' />,
    facebook: <img src='/left/facebook.png' alt='' />,
    instagram: <img src='/left/instagram.png' alt='' />,
    youtube: <img src='/left/youtube.png' alt='' />,
    tiktok: <img src='/left/tiktok.png' alt='' />,
    twitter: <img src='/left/twitter.png' alt='' />,
    github: <img src='/left/github.png' alt='' />,
  };

  const InfoIcon = (icon) => {
    return iconsObj[icon] ? iconsObj[icon] : '';
  };

  const OnSubmit = () => {
    UpdateDetailsInfo();
    setShowAddInfo(false);
  };

  return (
    <div className='add_info_wrap'>
      {!value && (
        <div
          className='add_info_btn'
          onClick={() => setShowAddInfo((prev) => !prev)}
        >
          <ADD />
          {header}
        </div>
      )}
      {value && (
        <div
          className='add_info_Data'
          onClick={() => setShowAddInfo((prev) => !prev)}
        >
          {InfoIcon(icon)}
          <div className='infoDATA_txt'>
            {header} : {value}
          </div>
          <i className='edit_icon' onClick={() => setShowAddInfo(true)}></i>
        </div>
      )}
      {showAddInfo && (
        <div className='add_info_NoData'>
          <div className='add_info_textArea'>
            <div className='input_text_edit_bio'>
              {relation ? (
                <select
                  name={icon}
                  value={value}
                  onChange={(e) => bioHandleChange(e)}
                >
                  <option value='Single'>Single</option>
                  <option value='In a relationship'>In a relationship</option>
                  <option value='Married'>Married</option>
                  <option value='Divorced'>Divorced</option>
                  <option value='Not interested'>Not interested</option>
                  <option value='Other'>Other</option>
                </select>
              ) : (
                <textarea
                  placeholder={placeholder}
                  name={icon}
                  value={value}
                  maxLength={100}
                  onChange={(e) => bioHandleChange(e)}
                />
              )}
              <div className='btn_edit_bio'>
                <Button
                  color='warning'
                  startIcon={<Sending color={'#ff5d00'} />}
                  onClick={() => OnSubmit()}
                >
                  Submit
                </Button>
                <Button
                  color='warning'
                  startIcon={<Close color={'#ff5d00'} />}
                  onClick={() => setShowAddInfo(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
