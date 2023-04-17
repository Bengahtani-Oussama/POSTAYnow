export default function MenuItem({ icon, title, subTitle }) {
  return (
    <li className='hover1'>
      <i className={icon}></i>
      <div className='post_menu_text'>
        <span className='post_menu_title'>{title}</span>
        {subTitle && <span className='post_menu_subtitle'>{subTitle}</span>}
      </div>
    </li>
  );
}
