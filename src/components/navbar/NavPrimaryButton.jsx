import Button from '../Button';

export default function NavPrimaryButton({ style, children, ...rest }) {
  return (
    <Button
      variant="contained"
      size="small"
      style={style}
      {...rest}
      rel="noopener noreferrer"
      aria-label="nav-primary-btn"
    >
      {children || 'Primary Button'}
    </Button>
  );
}
