import {useEffect, useRef, useState} from "react";
import {motion} from '../utils/motion';
import ContainerWrapper from "../components/ContainerWrapper";
import {INSTAGRAM, TIKTOK, LINKEDIN} from "../utils/constant";
import Typography from "../components/Typography";
import StrokeIcon from "../components/StrokeIcon";
import {privacyPolicy} from "../data/privacy";
import {cookiePolicy} from "../data/cookie";
import Instagram from "../assets/icons/Instagram";
import TikTok from "../assets/icons/TikTok";
import LinkedIn from "../assets/icons/LinkedIn";
import styles from './Footer.module.css';

export default function Footer({footer}) {
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const handleOpenPrivacy = (e) => {
    e.preventDefault();
    setOpenPrivacy(true);
  };
  const onClosePrivacy = () => setOpenPrivacy(false);

  const [openCookie, setOpenCookie] = useState(false);
  const handleOpenCookie = (e) => {
    e.preventDefault();
    setOpenCookie(true);
  };
  const onCloseCookie = () => setOpenCookie(false);

  return (
    <ContainerWrapper paddingY className={styles.wrapper}>
      <motion.div
        initial={{opacity: 0, y: 6}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.35, delay: 0.2}}
      >
        <div className={styles.stack}>
          <div className={styles.socialRow}>
            <a
              className={styles.iconButton}
              target="_blank"
              href={INSTAGRAM}
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <StrokeIcon icon={Instagram} size={36} color="var(--color-primary-dark)" strokeWidth={1}/>
            </a>
            <a
              className={styles.iconButton}
              target="_blank"
              href={TIKTOK}
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <StrokeIcon icon={TikTok} size={36} color="var(--color-primary-dark)" strokeWidth={1}/>
            </a>
            <a
              className={styles.iconButton}
              target="_blank"
              href={LINKEDIN}
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <StrokeIcon icon={LinkedIn} size={36} color="var(--color-primary-dark)" strokeWidth={1}/>
            </a>
          </div>
          {footer.map((item, i) => (
            <Typography key={i} variant="subtitle2" align="center">
              {item}
            </Typography>
          ))}
          <div className={styles.linksRow}>
            <button type="button" className={styles.link} onClick={handleOpenPrivacy}>
              <Typography variant="subtitle2" color="var(--color-primary-dark)">Privacy Policy</Typography>
            </button>
            <button type="button" className={styles.link} onClick={handleOpenCookie}>
              <Typography variant="subtitle2" color="var(--color-primary-dark)">Cookie Policy</Typography>
            </button>
          </div>
        </div>
      </motion.div>

      <LargeDialog
        title={privacyPolicy.title}
        content={privacyPolicy.content}
        open={openPrivacy}
        onClose={onClosePrivacy}/>
      <LargeDialog
        title={cookiePolicy.title}
        content={cookiePolicy.content}
        open={openCookie}
        onClose={onCloseCookie}/>
    </ContainerWrapper>
  );
}

function LargeDialog({title, content, open, onClose}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleBackdropClick = (event) => {
    const rect = dialogRef.current.getBoundingClientRect();
    const insideDialog =
      rect.top <= event.clientY && event.clientY <= rect.bottom &&
      rect.left <= event.clientX && event.clientX <= rect.right;
    if (!insideDialog) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.titleRow}>
        <Typography variant="h6">{title}</Typography>
        <button type="button" className={styles.closeButton} aria-label="close" onClick={onClose}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      <div className={styles.content}>
        <Typography style={{whiteSpace: 'pre-line'}}>{content}</Typography>
      </div>
    </dialog>
  );
}
