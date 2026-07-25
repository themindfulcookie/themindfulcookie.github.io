import { motion } from '../utils/motion';

export default function ButtonAnimationWrapper({ children, style }) {
  return (
    <motion.div
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      tabIndex={-1}
      style={style}
    >
      {children}
    </motion.div>
  );
}
