import React from 'react';

export default function ReactsPopup({ showReacts, setShowReacts }) {
  const reactArray = [
    {
      name: 'like',
      src: '/reacts/like.gif',
    },
    {
      name: 'love',
      src: '/reacts/love.gif',
    },
    {
      name: 'funny',
      src: '/reacts/haha.gif',
    },
    {
      name: 'wow',
      src: '/reacts/wow.gif',
    },
    {
      name: 'sad',
      src: '/reacts/sad.gif',
    },
    {
      name: 'angry',
      src: '/reacts/angry.gif',
    },
  ];

  return (
    <>
      {showReacts && (
        <div
          className='reacts_popup'
          onMouseOver={() => {
            setTimeout(() => {
              setShowReacts(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setShowReacts(false);
            }, 500);
          }}
        >
          {reactArray.map((img, i) => (
            <img
              className='reacts_popup_img'
              key={i}
              src={img.src}
              alt={img.name}
            />
          ))}
        </div>
      )}
    </>
  );
}
