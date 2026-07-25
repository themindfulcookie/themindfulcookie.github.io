import Button from '../Button';

export default function NavSecondaryButton({ style, children, ...rest }) {
  return (
    <Button
      variant="outlined"
      size="small"
      style={style}
      {...rest}
      rel="noopener noreferrer"
      aria-label="nav-secondary-btn"
    >
      {children}
    </Button>
  );
}