import {useEffect, useRef, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import {withAlpha} from "../../utils/colorUtils";
import {Menu} from "@mui/material";

export default function MenuPopper({
                                     drawerToggleProps,
                                     homeProps,
                                     defaultOpen = false,
                                     children,
                                     border = true,
                                     popperWidth = 368,
                                     offset = 0,
                                     offsetX = 0,
                                   }) {
  const theme = useTheme();

  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    if (defaultOpen) {
      setAnchorEl(anchorRef.current);
    }
  }, [defaultOpen]);

  const open = Boolean(anchorEl);
  const id = open ? 'menu-popper' : undefined;

  return (
    <>
      <Button
        ref={anchorRef}
        aria-describedby={id}
        onClick={handleClick}
        size="small"
        {...drawerToggleProps}
        sx={{...drawerToggleProps.sx, ...(open && {color: 'primary.main', fontWeight: 600})}}
      />
      <Button
        href="#"
        size="small"
        {...homeProps}
        sx={{
          position: 'fixed',
          right: 12,
        }}
      />
      <Button

      >
        <Menu/>
      </Button>
      <Popper
        placement="bottom"
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{width: {xs: 1, md: 'auto'}, zIndex: 1201}}
        popperOptions={{modifiers: [{name: 'offset', options: {offset: [offsetX, offset]}}]}}
      >
        {({TransitionProps}) => (
          <Fade in={open} {...TransitionProps}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: `0px 16px 10px 0px ${withAlpha(theme.vars.palette.grey[900], 0.06)}`,
                width: {xs: 1, md: popperWidth},
                ...(border && {
                  border: '1px solid',
                  borderColor: theme.vars.palette.grey[200]
                }),
                [theme.breakpoints.down('md')]: {
                  borderTop: 'none',
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0
                }
              }}
            >
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <Box onClick={() => setAnchorEl(null)}>{children}</Box>
              </ClickAwayListener>
            </Card>
          </Fade>
        )}
      </Popper>
    </>
  );
}