import Typography from './Typography';
import styles from './Typeset.module.css';

export default function Typeset({ heading, caption, style, className, headingStyle, captionStyle, captionClassName }) {
  return (
    <div className={[styles.stack, className].filter(Boolean).join(' ')} style={style}>
      <Typography variant="h2" style={headingStyle}>
        {heading}
      </Typography>
      {caption && (
        <Typography
          component="p"
          variant="h6"
          color="var(--color-text-secondary)"
          className={captionClassName}
          style={{ whiteSpace: 'pre-line', ...captionStyle }}
        >
          {caption}
        </Typography>
      )}
    </div>
  );
}
