import Button from '@mui/material/Button';

export default function NavSecondaryButton({ sx, children, ...rest }) {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={sx}
      {...rest}
      rel="noopener noreferrer"
      aria-label="nav-secondary-btn"
    >
      {children}
    </Button>
  );
}