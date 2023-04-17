import { Link } from 'react-router-dom';
export default function AllMenuItem({ src, name, desc, to }) {
  return (
    <div>
      <Link to={to} className='left_menu_body_content'>
        <div className='left_icon'>
          <img src={src} alt={desc} />
        </div>
        <div className='content'>
          <p>{name}</p>
          <span>{desc}</span>
        </div>
      </Link>
    </div>
  );
}
