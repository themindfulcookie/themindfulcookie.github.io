import {generateFocusVisibleStyles} from "../../utils/CommonFocusStyle";

export default function Button(theme) {
  return {
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true
      },
      styleOverrides: {
        outlined: {
          color: theme.vars.palette.primary.dark,
          borderColor: theme.vars.palette.primary.dark,
          '&:hover': {
            backgroundColor: 'rgba(167,154,95,0.08)',
            borderColor: theme.vars.palette.primary.dark
          }
        },
        root: {
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 1.429,
          letterSpacing: 0.1,
          borderRadius: 100,
          boxShadow: 'none',
          '&:focus-visible': generateFocusVisibleStyles(theme.vars.palette.primary.main)
        },
        sizeSmall: {
          padding: '10px 24px',
          '&.MuiButton-outlined': { padding: '9px 24px' }
        },
        sizeMedium: {
          padding: '14px 24px',
          '&.MuiButton-outlined': { padding: '13px 24px' },
          [theme.breakpoints.down('sm')]: {
            padding: '10px 24px',
            '&.MuiButton-outlined': { padding: '9px 24px' }
          }
        },
        sizeLarge: {
          padding: '20px 24px',
          '&.MuiButton-outlined': { padding: '19px 24px' },
          [theme.breakpoints.down('md')]: {
            padding: '14px 24px',
            '&.MuiButton-outlined': { padding: '13px 24px' }
          },
          [theme.breakpoints.down('sm')]: {
            padding: '10px 24px',
            '&.MuiButton-outlined': { padding: '9px 24px' }
          }
        }
      }
    }
  };
}
