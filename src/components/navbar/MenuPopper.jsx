import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import styles from './MenuPopper.module.css';

export default function MenuPopper({ drawerToggleProps, homeProps, children }) {
  const anchorRef = useRef(null);
  const panelRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (anchorRef.current?.contains(event.target)) return;
      if (panelRef.current?.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  return (
    <div className={styles.wrapper}>
      <Button
        ref={anchorRef}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        size="small"
        {...drawerToggleProps}
        style={{
          ...drawerToggleProps?.style,
          ...(open && { color: 'var(--color-primary-main)', fontWeight: 600 })
        }}
      />
      <Button
        href="#"
        size="small"
        {...homeProps}
        style={{ position: 'fixed', right: 12, ...homeProps?.style }}
      />
      <div
        ref={panelRef}
        className={[styles.panel, open && styles.open].filter(Boolean).join(' ')}
        onClick={() => setOpen(false)}
      >
        {children}
      </div>
    </div>
  );
}
