import React from 'react';
import { Dots } from '../../svg';
import PeopleCard from '../../components/profile';
import { storyData } from '../../data/honeData/homeData';

export default function PeopleKnow({ setShowFriendSuggestion }) {
  return (
    <div className='people_know'>
      <div className='people_know_header'>
        <div className='people_know_header_left'>People You May Know</div>
        <div className='people_know_header_right'>
          <Dots />

          <i
            style={{ marginInline: '5px' }}
            className='exit_icon'
            onClick={() => setShowFriendSuggestion((prev) => !prev)}
          ></i>
        </div>
      </div>
      <div className='people_know_items'>
        {storyData.map((userItem, i) => (
          <PeopleCard key={i} userItem={userItem} />
        ))}
      </div>
    </div>
  );
}
