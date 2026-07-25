import SvgIcon from "../SvgIcon";
import styles from './NavItems.module.css';

function ExpandedList({ item, menuTextColor }) {
  return (
    <li>
      <a className={styles.expandedItem} href={item.link} style={{ color: menuTextColor }}>
        {item.title}
      </a>
    </li>
  );
}

function NavList({ item, menuTextColor }) {
  const isExternal = Boolean(item?.icon);

  return (
    <a
      className={styles.navPill}
      href={item.link}
      target={isExternal ? '_blank' : item?.target}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{ color: menuTextColor, ...(isExternal && { justifyContent: 'center', gap: 6 }) }}
    >
      {item.title}
      {item?.icon && (
        <SvgIcon color="inherit" size={16} {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />
      )}
    </a>
  );
}

export function NavMenu({ navItems, menuTextColor }) {
  return navItems.map((item, index) => <NavList key={index} {...{ item, menuTextColor }} />);
}

export function NavMenuDrawer({ navItems, menuTextColor }) {
  return (
    <ul className={styles.list}>
      {navItems.map((item, index) => (
        <ExpandedList key={index} item={item} menuTextColor={menuTextColor} />
      ))}
    </ul>
  );
}
