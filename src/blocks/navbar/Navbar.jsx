import ContainerWrapper from "../../components/ContainerWrapper";
import useScrollTrigger from "../../hooks/useScrollTrigger";
import styles from './Navbar.module.css';

export const navbarHeight = { xs: 64, sm: 72, md: 84 };

export default function Navbar({ children }) {
  const scrolled = useScrollTrigger();

  return (
    <>
      <header className={[styles.appBar, scrolled && styles.scrolled].filter(Boolean).join(' ')}>
        <div className={styles.toolbar}>
          <ContainerWrapper>{children}</ContainerWrapper>
        </div>
      </header>
      <div className={styles.toolbar} />
    </>
  );
}
