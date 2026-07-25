import {motion} from '../utils/motion';
import ContainerWrapper from "../components/ContainerWrapper";
import Typeset from "../components/Typeset";
import Typography from "../components/Typography";
import GraphicsCard from "../components/GraphicsCard";
import ButtonAnimationWrapper from "../components/ButtonAnimationWrapper";
import Button from "../components/Button";
import StrokeIcon from "../components/StrokeIcon";
import Cookie from "../assets/icons/Cookie";
import styles from './Pricing.module.css';

export default function Pricing({heading, firstVisit, caption, plans}) {
  return (
    <ContainerWrapper id="servizi" paddingY className={styles.wrapper}>
      <div className={styles.stack}>
        {heading && (
          <motion.div
            initial={{opacity: 0, y: 6}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.35, delay: 0.2}}
          >
            <Typeset heading={heading} caption={caption} className={styles.headingWrap}/>
          </motion.div>
        )}
        <div className={styles.plansRow}>
          {plans.map((plan, index) => (
            <div className={styles.planCol} key={index}>
              <motion.div
                className={styles.motionFill}
                initial={{opacity: 0, x: index === 0 ? -24 : index === 2 ? 24 : 0, y: 0, scale: index === 1 ? 0.96 : 1}}
                whileInView={{opacity: 1, x: 0, y: 0, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 0.3, ease: 'easeInOut', delay: plan.animationDelay}}
                style={{height: '100%'}}
              >
                <GraphicsCard
                  className={styles.card}
                  style={plan.active ? {border: '1px solid var(--color-primary-main)'} : undefined}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.innerStack}>
                      <div className={styles.headerBlock}>
                        <div className={styles.titleStack}>
                          <Typography variant="subtitle1" color="var(--color-text-secondary)">
                            {plan.title}
                          </Typography>
                          <Typography component="div" variant="h1">
                            {plan.price === 0 ? "Gratuita" : plan.price + "€"}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            className={[styles.subtitle, !plan.subtitle?.trim() && styles.subtitleHiddenMobile].filter(Boolean).join(' ')}
                          >
                            {plan.subtitle?.trim() || null}
                          </Typography>
                        </div>
                      </div>
                      <div className={styles.bodyStack}>
                        <div className={styles.featuresStack}>
                          <hr className={styles.divider}/>
                          <div className={styles.featureList}>
                            {plan.features.map((item, featureIndex) => (
                              <div key={featureIndex} className={styles.featureRow}>
                                <StrokeIcon icon={Cookie} size={16} color="var(--color-secondary-dark)" strokeWidth={2}/>
                                <Typography color="var(--color-secondary-dark)">
                                  {item}
                                </Typography>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className={styles.ctaStack}>
                          {plan.contentLink && (
                            <Typography variant="body2" color="var(--color-text-secondary)" align="center" style={{marginBottom: 10}}>
                              {plan.content}&nbsp;
                            </Typography>
                          )}

                          <motion.div
                            initial={{scale: 0.96}}
                            animate={{scale: plan.active ? [1, 1.015, 1] : 1}}
                            transition={{
                              duration: plan.active ? 1.6 : 0.6,
                              delay: 0.05,
                              ease: 'easeInOut',
                              ...(plan.active && {repeat: Infinity, repeatType: 'loop'})
                            }}
                            whileHover={{scale: 1.01, transition: {duration: 0.25}}}
                          >
                            <ButtonAnimationWrapper>
                              <Button
                                variant={plan.active ? 'contained' : 'outlined'}
                                className={!plan.link ? styles.ctaButtonNoLink : undefined}
                                style={{justifyContent: 'center', textAlign: 'center'}}
                                fullWidth
                                {...plan.exploreLink}
                              />
                            </ButtonAnimationWrapper>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GraphicsCard>
              </motion.div>
            </div>
          ))}
        </div>
        <Typography variant="body1">
          {firstVisit}
        </Typography>
      </div>
    </ContainerWrapper>
  );
}
