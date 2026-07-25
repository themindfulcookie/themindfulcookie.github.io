import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from "../SvgIcon";

const navItemSX = {py: 1.5, borderRadius: {xs: 0, sm: 4}};

function ExpandedList({item, menuTextColor}) {
  return (
    <>
      <ListItemButton sx={navItemSX} href={item.link}>
        <ListItemText primary={item.title}
                      slotProps={{primary: {variant: 'caption2', color: menuTextColor || 'text.primary'}}}/>
      </ListItemButton>
    </>
  );
}

function NavList({item, menuTextColor}) {
  const toggleProps = {color: menuTextColor || 'text.primary', py: 1.5, typography: 'caption2', pl: {md: 2.25, lg: 3}};
  const buttonProps = {
    sx: {
      ...toggleProps,
      pr: {md: 2.25, lg: 3},
      ...(item.icon && {justifyContent: 'center', gap: 0.75}),
      ...(item.link)
    },
    ...(item.link && {href: item.link, ...(item?.target && {target: item.target})})
  };

  return (
    <>
      <Button
        size="small"
        {...(item?.icon ? {target: "_blank", rel: "noopener noreferrer"} : {})}
        {...buttonProps}
      >
        {item.title}
        {item?.icon && (
          <SvgIcon color="inherit"
                   size={16} {...(typeof item.icon === 'string' ? {name: item.icon} : {...item.icon})} />
        )}
      </Button>
    </>
  );
}

export function NavMenu({navItems, menuTextColor}) {
  return navItems.map((item, index) => <NavList key={index} {...{item, menuTextColor}} />);
}

export function NavMenuDrawer({navItems, menuTextColor}) {
  return (
    <List>
      {navItems.map((item, index) => (
        <ExpandedList key={index} item={item} menuTextColor={menuTextColor} />
      ))}
    </List>
  );
}