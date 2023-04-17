import PropagateLoader from 'react-spinners/PropagateLoader';
export default function ActivateForm({ type, header, text, loading }) {
  return (
    <div className='blur'>
      <div className='popup'>
        <div>
          <div
            className={`popup_header ${
              type === 'success' ? 'success' : 'error'
            }`}
          >
            {header}
          </div>
          <div className='popup_message'>{text}</div>
        </div>
        <div className='PropagateLoader'>
          <PropagateLoader size={30} color='#d38300' loading={loading} />
        </div>
      </div>
    </div>
  );
}
