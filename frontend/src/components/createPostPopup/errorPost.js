import React from 'react';

export default function ErrorPost({ error, setError }) {
  return (
    <div className='create_postWrapperError blur'>
      <p className='errorPstText error'>{error}</p>
      <button className='orangBtn' onClick={() => setError('')}>
        Try Agin
      </button>
    </div>
  );
}
