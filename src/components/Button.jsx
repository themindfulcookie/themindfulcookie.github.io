import { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = forwardRef(function Button(
  { variant = 'text', size = 'medium', fullWidth, startIcon, disabled, href, component, className, style, children, ...rest },
  ref
) {
  const Component = component || (href ? 'a' : 'button');

  const sizeClass = { small: styles.sizeSmall, medium: styles.sizeMedium, large: styles.sizeLarge }[size];
  const variantClass = { contained: styles.contained, outlined: styles.outlined, text: styles.text }[variant];

  const classNames = [styles.button, variantClass, sizeClass, disabled && styles.disabled, className]
    .filter(Boolean)
    .join(' ');

  const mergedStyle = { ...(fullWidth && { width: '100%' }), ...style };

  return (
    <Component
      ref={ref}
      href={href}
      className={classNames}
      style={mergedStyle}
      disabled={Component === 'button' ? disabled : undefined}
      aria-disabled={Component !== 'button' && disabled ? true : undefined}
      {...rest}
    >
      {startIcon}
      {children}
    </Component>
  );
});

export default Button;
