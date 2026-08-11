import Button from '../Button';

export default function NavSecondaryButton({ style, children, ...rest }) {
  return (
    <Button
      variant="outlined"
      size="small"
      style={style}
      aria-label="nav-secondary-btn"
      {...rest}
      rel="noopener noreferrer"
    >
      {children}
    </Button>
  );
}