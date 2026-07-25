import styles from './Typography.module.css';

const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  h7: 'span',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  caption1: 'span',
  caption2: 'span'
};

export default function Typography({
  variant = 'body1',
  component,
  align,
  color,
  className,
  style,
  children,
  ...rest
}) {
  const Component = component || variantMapping[variant] || 'span';

  const mergedStyle = {
    ...(color && { color }),
    ...style
  };

  const classNames = [styles.root, styles[variant]];
  if (align) classNames.push(styles[`align${align.charAt(0).toUpperCase()}${align.slice(1)}`]);
  if (className) classNames.push(className);

  return (
    <Component className={classNames.filter(Boolean).join(' ')} style={mergedStyle} {...rest}>
      {children}
    </Component>
  );
}
