import styles from './ContainerWrapper.module.css';

export default function ContainerWrapper({ children, style, className, id, paddingY = false }) {
  return (
    <>
      <span
        id={id}
        style={{
          display: 'block',
          height: '100px',
          marginTop: '-100px',
        }}
      />
      <div className={[styles.container, paddingY && styles.paddingY, className].filter(Boolean).join(' ')} style={style}>
        {children}
      </div>
    </>
  );
}
