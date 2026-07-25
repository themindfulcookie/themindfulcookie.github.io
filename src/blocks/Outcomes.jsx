import ContainerWrapper from "../components/ContainerWrapper";
import Typeset from "../components/Typeset";
import Typography from "../components/Typography";
import StrokeIcon from "../components/StrokeIcon";
import Cookie from "../assets/icons/Cookie";
import {motion} from '../utils/motion';
import styles from './Outcomes.module.css';

export default function Outcomes({heading, outcomes}) {
  return (
    <ContainerWrapper paddingY>
      <div className={styles.header}>
        <Typeset heading={heading} style={{textAlign: 'center'}} />
      </div>

      <div className={styles.grid}>
        {outcomes.map((item, index) => (
          <motion.div
            key={index}
            initial={{y: 8, opacity: 0}}
            whileInView={{y: 0, opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.2, delay: index * 0.1}}
          >
            <div className={styles.item}>
              <Typography variant="h7" color="var(--color-primary-dark)">
                {item.title}
              </Typography>

              <Typography variant="body1" color="var(--color-text-primary)">
                {item.content}
              </Typography>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 0.2, delay: 0.3}}
      >
        <div className={styles.footer}>
          <StrokeIcon icon={Cookie} size={100} color="var(--color-primary-main)" strokeWidth={1.2} />
        </div>
      </motion.div>
    </ContainerWrapper>
  );
}
