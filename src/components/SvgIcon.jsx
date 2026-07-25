import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function SvgIcon({ name, size = 24, color }) {
  const theme = useTheme();

  const fillColor = theme.vars.palette.text.primary
  const strokeColor = theme.vars.palette.text.primary

  const strokeWidth = 1.5;

  return (
    <Box
      role="none"
      sx={{
        '& svg': {
          verticalAlign: 'middle',
          display: 'block',
          color: color || 'primary.main',
          '& [data-two-tone="true"]': { color: theme.vars.palette.primary.lighter }
        }
      }}
    >
      <svg
        className={name}
        width={size}
        height={size}
        {...(fillColor && { fill: fillColor })}
        {...(strokeColor && { stroke: strokeColor })}
        {...(strokeWidth && { strokeWidth })}
      />
    </Box>
  );
}
