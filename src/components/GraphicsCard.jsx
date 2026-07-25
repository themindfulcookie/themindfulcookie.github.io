import styles from './GraphicsCard.module.css';

export default function GraphicsCard({ style, className, children, overLay = false, bgImage, radius, ...rest }) {
  // mobile-first fill: an unset tier inherits the nearest smaller defined tier,
  // matching how MUI's sx breakpoint objects cascade upward.
  const xs = radius?.xs;
  const sm = radius?.sm ?? xs;
  const md = radius?.md ?? sm;
  const cssVars = radius
    ? {
        ...(xs !== undefined && { '--card-radius-xs': `${xs}px` }),
        ...(sm !== undefined && { '--card-radius-sm': `${sm}px` }),
        ...(md !== undefined && { '--card-radius-md': `${md}px` })
      }
    : {};

  return (
    <div
      role="img"
      aria-label="graphics card"
      className={[styles.card, className].filter(Boolean).join(' ')}
      style={{
        ...cssVars,
        ...(bgImage && {
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }),
        ...style
      }}
      {...rest}
    >
      {overLay && <div className={styles.overlay} style={{ background: typeof overLay === 'string' ? overLay : undefined }} />}
      {overLay ? <div className={styles.contentAboveOverlay}>{children}</div> : children}
    </div>
  );
}
