import { Link } from 'react-router-dom';

export default function AllMenuCreate({ src, name, to }) {
  return (
    <Link to={to} className='block_item'>
      <i className={src}></i>
      <p>{name}</p>
    </Link>
  );
}
