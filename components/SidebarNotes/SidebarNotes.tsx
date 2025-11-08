import Link from "next/link";
import css from './SidebarNotes.module.css'

const SidebarNotes = () => {
  const TAGS_API = ["Work", "Personal", "Todo"];

  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {TAGS_API.map(item => (
         <li key={item}className={css.menuItem}>
        <Link
          href={`/notes/filter/${item}`}
          className={css.menuLink}
        >
          {item}
        </Link>
      </li>
      ))}
     
    </ul>
  );
};

export default SidebarNotes;
