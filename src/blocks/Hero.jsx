import {motion} from '../utils/motion';
import ContainerWrapper from "../components/ContainerWrapper";
import Typography from "../components/Typography";
import Button from "../components/Button";
import {withAlpha} from "../utils/colorUtils";
import {palette} from "../theme/palette";
import Wave from "../assets/icons/Wave";
import ButtonAnimationWrapper from "../components/ButtonAnimationWrapper";
import styles from './Hero.module.css';

export default function Hero({avatar, chip, headLine, captionLine, primaryBtn, subtitle, email, spam}) {
  return (
    <ContainerWrapper paddingY>
      <div>
        <div className={styles.top}>
          <div className={styles.stack}>
            <motion.div
              initial={{opacity: 0, scale: 0.92}}
              whileInView={{opacity: 1, scale: [0.92, 1.03, 1]}}
              animate={{
                boxShadow: [
                  `0 0 0px ${withAlpha(palette.primary.dark, 0)}`,
                  `0 0 10px ${withAlpha(palette.primary.main, 0.35)}`,
                  `0 0 0px ${withAlpha(palette.primary.dark, 0)}`,
                ],
                borderRadius: "74px",
              }}
              viewport={{once: true}}
              transition={{duration: 0.4, delay: 0.1, ease: "linear"}}
            >
              <Typography component="span" variant="body2" className={styles.chip}>
                {chip.label}
              </Typography>
            </motion.div>

            <motion.div
              initial={{opacity: 0, scale: 0.92}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.4, delay: 0.2, ease: "linear"}}
            >
              <Typography variant="h1" component="h2" className={styles.headline}>
                {headLine}
              </Typography>
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <div className={styles.wave}>
                <Wave/>
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{
                duration: 0.5,
                delay: 0.4,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <Typography variant="h3" component="h1" className={styles.caption}>
                {captionLine}
              </Typography>
            </motion.div>
          </div>
          <div className={styles.actions}>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.25, ease: "linear", delay: 0.5,}}
            >
              <ButtonAnimationWrapper>
                <Button color="primary" variant="contained" {...primaryBtn} />
              </ButtonAnimationWrapper>
            </motion.div>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.25, ease: "linear", delay: 0.5}}
            >
              <div className={styles.subtitleBlock}>
                <Typography variant="body1" className={styles.subtitle}>
                  {subtitle}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {email}
                </Typography>
                <Typography variant="body1" align="center">
                  {spam}
                </Typography>
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.25, ease: "linear", delay: 0.6}}
            >
              <img
                className={styles.avatar}
                src={avatar}
                alt="Alice Ciani, dietista nutrizionista specializzata in mindful eating"
                fetchPriority="high"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
}
