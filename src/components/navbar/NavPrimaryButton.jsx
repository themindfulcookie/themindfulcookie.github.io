import Button from '@mui/material/Button';

export default function NavPrimaryButton({ sx, children, ...rest }) {
  return (
    <Button
      variant="contained"
      size="small"
      sx={sx}
      {...rest}
      rel="noopener noreferrer"
      aria-label="nav-primary-btn"
    >
      {children || 'Primary Button'}
    </Button>
  );
}
