import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ElevationScroll from './ElevationScroll';
import ContainerWrapper from "../../components/ContainerWrapper";

export const navbarHeight = { xs: 64, sm: 72, md: 84 };

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '@media all': {
    minHeight: navbarHeight.md,
    paddingLeft: 0,
    paddingRight: 0
  },
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    '@media all': { minHeight: navbarHeight.sm }
  },
  [theme.breakpoints.down('sm')]: {
    '@media all': { minHeight: navbarHeight.xs },
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5)
  }
}));

export default function Navbar({ children, ...props }) {
  return (
    <>
      <ElevationScroll isFixed={true} {...props}>
        <AppBar component="nav" color="inherit" sx={{ background: 'transparent' }}>
          <StyledToolbar>
            <ContainerWrapper>{children}</ContainerWrapper>
          </StyledToolbar>
        </AppBar>
      </ElevationScroll>
      <StyledToolbar />
    </>
  );
}