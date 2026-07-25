import { useState } from 'react';
import { motion } from '../utils/motion';
import useFocusWithin from "../utils/useFocusWithin";
import ContainerWrapper from "../components/ContainerWrapper";
import Typeset from "../components/Typeset";
import Typography from "../components/Typography";
import styles from './Faq.module.css';

export default function Faq({ heading, faqList }) {
  const isFocusWithin = useFocusWithin();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => () => setExpanded((current) => (current === panel ? false : panel));

  return (
    <ContainerWrapper id="faq" paddingY>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {heading && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <div className={styles.header}>
              <Typeset heading={heading} />
            </div>
          </motion.div>
        )}
        <div className={styles.list}>
          <div className={styles.items}>
            {faqList.map((item, index) => {
              const isOpen = expanded === `panel${index}`;

              return (
                <motion.div
                  key={index}
                  initial={{ y: 8, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.06 }}
                >
                  <div className={[styles.panel, isFocusWithin && styles.focusWithin].filter(Boolean).join(' ')}>
                    <button
                      type="button"
                      className={styles.summary}
                      aria-expanded={isOpen}
                      onClick={handleChange(`panel${index}`)}
                    >
                      <Typography variant="h6">{item.question}</Typography>
                    </button>
                    <div className={[styles.collapseWrapper, isOpen && styles.open].filter(Boolean).join(' ')}>
                      <div className={styles.collapseInner}>
                        <div className={styles.details}>
                          <Typography color="var(--color-text-secondary)">{item.answer}</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
}
