import {motion} from '../utils/motion';
import ContainerWrapper from "../components/ContainerWrapper";
import Typeset from "../components/Typeset";
import GraphicsCard from "../components/GraphicsCard";
import Typography from "../components/Typography";
import styles from './Testimonial.module.css';

function StarRating() {
  return (
    <div className={styles.rating} aria-label="5 su 5 stelle">
      {Array.from({length: 5}).map((_, i) => (
        <svg key={i} width={20} height={20} viewBox="0 0 24 24" fill="var(--color-primary-main)">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonial({heading, testimonials}) {
  return (
    <ContainerWrapper id="recensioni" paddingY className={styles.wrapper}>
      <div className={styles.stack}>
        <Typeset heading={heading} className={styles.headingWrap}/>
        <div className={styles.masonry}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={styles.masonryItem}
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.3, ease: 'easeOut', delay: index * 0.06}}
            >
              <GraphicsCard radius={{xs: 16, md: 24}}>
                <div className={styles.cardBody}>
                  <StarRating/>
                  <div className={styles.text}>
                    <Typography color="var(--color-text-secondary)">{testimonial}</Typography>
                  </div>
                </div>
              </GraphicsCard>
            </motion.div>
          ))}
        </div>
      </div>
    </ContainerWrapper>
  );
}
