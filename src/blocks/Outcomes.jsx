import {Box, Grid, Stack, Typography, useTheme, useMediaQuery, SvgIcon} from '@mui/material';
import {SECTION_COMMON_PY} from "../utils/constant";
import ContainerWrapper from "../components/ContainerWrapper";
import Typeset from "../components/Typeset";
import Cookie from "../assets/icons/Cookie";
import {motion} from 'motion/react';

export default function Outcomes({heading, outcomes}) {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const textAlign = downSM ? 'center' : 'left';
  const columns = downSM ? 1 : downMD ? 2 : 3;

  return (
    <ContainerWrapper sx={{py: SECTION_COMMON_PY}}>
      {/* Heading */}
      <Stack sx={{mb: {xs: 5, md: 8}, textAlign: 'center'}}>
        <Typeset {...{heading, stackProps: {sx: {textAlign: 'center'}}}} />
      </Stack>

      {/* Content */}
      <Grid container spacing={{xs: 4, md: 6}}>
        {outcomes.map((item, index) => (
          <Grid
            key={index}
            size={{xs: 12, sm: 12 / Math.min(columns, 2), md: 12 / columns}}
          >
            <motion.div
              key={index}
              initial={{y: 20, opacity: 0}}
              whileInView={{y: 0, opacity: 1}}
              viewport={{once: true}}
              transition={{duration: 0.2, delay: index * 0.2}}
            >
              <Stack sx={{gap: 1.5, textAlign}}>
                <Typography
                  variant="h7"
                  sx={{
                    color: theme.palette.primary.dark
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary
                  }}
                >
                  {item.content}
                </Typography>
              </Stack>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 0.25, delay: 0.5}}
      >
        <Stack sx={{alignItems: 'center', mt: 6}}>
          <SvgIcon
            component={Cookie}
            inheritViewBox
            sx={{
              fill: 'none',
              stroke: theme.palette.primary.main,
              strokeWidth: 1.2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              fontSize: 100,
            }}/>
        </Stack>
      </motion.div>
    </ContainerWrapper>
  );
}
