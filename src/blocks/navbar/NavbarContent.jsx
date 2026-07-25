import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {navbarHeight} from './Navbar';
import {NavMenu, NavMenuDrawer} from "../../components/navbar/NavItems";
import NavSecondaryButton from "../../components/navbar/NavSecondaryButton";
import ButtonAnimationWrapper from "../../components/ButtonAnimationWrapper";
import NavPrimaryButton from "../../components/navbar/NavPrimaryButton";
import MenuPopper from "../../components/navbar/MenuPopper";
import {SvgIcon} from "@mui/material";
import ContainerWrapper from "../../components/ContainerWrapper";
import Menu from "../../assets/icons/Menu";
import Cookie from "../../assets/icons/Cookie";

export default function NavbarContent({navItems, primaryBtn, secondaryBtn}) {
  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between', width: 1}}>
      {!downMD && navItems && (
        <Box sx={{bgcolor: 'grey.200', borderRadius: 10}}>
          <NavMenu {...{navItems}} />
        </Box>
      )}
      <Stack direction="row" sx={{gap: {xs: 1, md: 1.5}}}>
        {!downMD && (
          <>
            <NavSecondaryButton {...secondaryBtn} />
            <NavPrimaryButton {...primaryBtn} />
          </>
        )}
        {downMD && (
          <Box sx={{flexGrow: 1}}>
            <MenuPopper
              offset={downSM ? 12 : 16}
              drawerToggleProps={{
                children: <SvgIcon
                  component={Menu}
                  inheritViewBox
                  sx={{
                    fill: 'none',
                    stroke: theme.palette.primary.dark,
                    strokeWidth: 2.0,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    fontSize: 24,
                  }}/>,
                color: 'inherit',
                sx: {minWidth: 40, width: 40, height: 40, p: 0}
              }}
              homeProps={{
                children: <SvgIcon
                  component={Cookie}
                  inheritViewBox
                  sx={{
                    fill: 'none',
                    stroke: theme.palette.primary.dark,
                    strokeWidth: 2.0,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    fontSize: 24,
                  }}/>,
                color: 'inherit',
                sx: {minWidth: 40, width: 40, height: 40, p: 0}
              }}>
              <ContainerWrapper
                sx={{
                  height: 'auto',
                  maxHeight: {xs: `calc(100vh - ${navbarHeight.xs}px)`, sm: `calc(100vh - ${navbarHeight.sm}px)`},
                  overflowY: 'auto'
                }}
              >
                {navItems && (
                  <Box sx={{mx: -1}}>
                    <NavMenuDrawer {...{navItems}} />
                  </Box>
                )}
                {downMD && (
                  <Stack direction="row"
                         sx={{justifyContent: 'space-between', gap: 1, px: 2, py: 2.5, mx: -2, bgcolor: 'white'}}>
                    <NavSecondaryButton {...secondaryBtn} />
                    <ButtonAnimationWrapper>
                      <NavPrimaryButton {...primaryBtn} />
                    </ButtonAnimationWrapper>
                  </Stack>
                )}
              </ContainerWrapper>
            </MenuPopper>
          </Box>
        )
        }
      </Stack>
    </Stack>
  );
}