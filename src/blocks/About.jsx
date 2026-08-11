import Typeset from "../components/Typeset";
import ContainerWrapper from "../components/ContainerWrapper";
import Typography from "../components/Typography";
import StrokeIcon from "../components/StrokeIcon";
import {motion} from '../utils/motion';
import Cookie from "../assets/icons/Cookie";
import styles from './About.module.css';

export default function About({avatar, title, about, resume}) {
  return (
    <ContainerWrapper id="about" paddingY className={styles.wrapper}>
      <div className={styles.outerStack}>
        <div className={styles.headerStack}>
          <motion.div
            initial={{opacity: 0, y: 6}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.35, delay: 0.05}}
          >
            <img className={styles.avatar} src={avatar} alt="Alice Ciani, dietista nutrizionista" loading="lazy" />
          </motion.div>

          <div className={styles.textBlock}>
            <motion.div
              initial={{opacity: 0, y: 6}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.35, delay: 0.1}}
            >
              <Typeset heading={title}/>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 6}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.35, delay: 0.2}}
            >
              <Typeset
                className={styles.captionTypeset}
                caption={about}
                captionClassName={styles.aboutCaption}
              />
            </motion.div>
          </div>
        </div>
        <motion.div
          className={styles.resumeWrap}
          initial={{opacity: 0, y: 6}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.35, delay: 0.3}}
        >
          <Resume items={resume}/>
        </motion.div>
      </div>
    </ContainerWrapper>
  );
}

function Resume({items}) {
  return (
    <div className={styles.timeline}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const [text, year] = item.split('\n');

        return (
          <div className={styles.item} key={index}>
            <div className={styles.spacer}/>
            <div className={styles.separator}>
              <div className={styles.dot}>
                <StrokeIcon icon={Cookie} size={16} color="var(--color-primary-dark)" strokeWidth={2}/>
              </div>
              {!isLast && <div className={styles.connector}/>}
            </div>
            <div className={styles.content}>
              <div className={styles.contentInner}>
                <Typography variant="body2" color="var(--color-grey-700)">{year}</Typography>
                <Typography>{text}</Typography>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
