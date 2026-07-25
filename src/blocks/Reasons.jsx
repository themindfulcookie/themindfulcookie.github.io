import { motion } from '../utils/motion';
import useMediaQuery from "../hooks/useMediaQuery";
import { mqDown } from "../theme/breakpoints";
import Typeset from "../components/Typeset";
import GraphicsCard from "../components/GraphicsCard";
import StrokeIcon from "../components/StrokeIcon";
import Typography from "../components/Typography";
import Button from "../components/Button";
import ButtonAnimationWrapper from "../components/ButtonAnimationWrapper";
import ContainerWrapper from "../components/ContainerWrapper";
import styles from './Reasons.module.css';

export default function Reasons({ heading, caption, features, actionBtn, secondaryBtn }) {
  const downSM = useMediaQuery(mqDown(768));
  const downMD = useMediaQuery(mqDown(1024));

  const partitionInExtraSmall = 1;
  const partitionInSmall = 2;
  const partitionInLarge = 3;

  const columns = downSM ? partitionInExtraSmall : downMD ? partitionInSmall : partitionInLarge;

  const calculateElementsInLastRow = (dataArray, columns) => {
    const totalItems = dataArray.length;
    const elementsInLastRow = totalItems % columns || columns;
    return elementsInLastRow;
  };

  const calculateIndexOfFirstElementInLastRow = (dataArray, elementsInLastRow) => {
    const totalItems = dataArray.length;
    const indexOfFirstElementInLastRow = totalItems - elementsInLastRow;
    return indexOfFirstElementInLastRow;
  };

  const elementsInLastRow = calculateElementsInLastRow(features, columns);
  const indexOfFirstElementInLastRow = calculateIndexOfFirstElementInLastRow(features, elementsInLastRow);

  const calculateIndexOfLastElementOfEachRow = (dataArray, columns) => {
    const indices = [];
    const totalItems = dataArray.length;
    const rows = Math.ceil(totalItems / columns);

    for (let i = 1; i <= rows; i++) {
      const lastIndexInRow = i * columns - 1;
      indices.push(lastIndexInRow < totalItems ? lastIndexInRow : totalItems - 1);
    }

    return indices;
  };

  const indicesOfLastElements = calculateIndexOfLastElementOfEachRow(features, columns);

  return (
    <ContainerWrapper paddingY className={styles.wrapper}>
      <div className={styles.stack}>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <Typeset heading={heading} className={styles.headingWrap} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          <GraphicsCard style={{ position: 'relative', overflow: 'visible' }}>
            <div className={styles.cardInner}>
              <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {features.map((item, index) => (
                  <div
                    key={index}
                    className={styles.cell}
                    style={{
                      borderBottom: index < indexOfFirstElementInLastRow ? '1px solid var(--color-grey-300)' : undefined,
                      borderRight: !indicesOfLastElements.includes(index) ? '1px solid var(--color-grey-300)' : undefined
                    }}
                  >
                    <div className={styles.cellInner}>
                      <div className={styles.avatar}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          <StrokeIcon icon={item.icon} size={32} color="var(--color-secondary-dark)" strokeWidth={2} />
                        </motion.div>
                      </div>
                      <div className={styles.textStack}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: index * 0.06 }}
                        >
                          {item.title && <Typography variant="h4">{item.title}</Typography>}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: index * 0.08 }}
                        >
                          {item.content && <Typography style={{ color: 'var(--color-text-secondary)' }}>{item.content}</Typography>}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GraphicsCard>
        </motion.div>
        <div className={styles.ctaStack}>
          <Typography variant="h6" className={styles.ctaCaption} style={{ color: 'var(--color-text-secondary)' }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 }}
            >
              {caption}
            </motion.div>
          </Typography>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.25 }}
          >
            <div className={styles.ctaButtons}>
              {secondaryBtn && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.03 }}
                >
                  <ButtonAnimationWrapper>
                    <Button variant="outlined" {...secondaryBtn} />
                  </ButtonAnimationWrapper>
                </motion.div>
              )}
              {actionBtn && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.03 }}
                >
                  <ButtonAnimationWrapper>
                    <Button variant="contained" color="primary" {...actionBtn} />
                  </ButtonAnimationWrapper>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </ContainerWrapper>
  );
}
