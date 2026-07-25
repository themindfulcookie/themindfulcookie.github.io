import {useTheme} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {motion} from 'motion/react';
import ContainerWrapper from "../components/ContainerWrapper";
import {SECTION_COMMON_PY} from "../utils/constant";
import Typeset from "../components/Typeset";
import GraphicsCard from "../components/GraphicsCard";
import ButtonAnimationWrapper from "../components/ButtonAnimationWrapper";
import {SvgIcon} from "@mui/material";
import Cookie from "../assets/icons/Cookie";

export default function Pricing({heading, firstVisit, caption, plans}) {
  const theme = useTheme();

  return (
    <ContainerWrapper id="servizi" sx={{py: SECTION_COMMON_PY, mt: {xs: -2, md: -6}}}>
      <Stack sx={{gap: {xs: 6}}}>
        {heading && (
          <motion.div
            initial={{opacity: 0, y: 10}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: 0.4}}
          >
            <Typeset {...{heading, caption, stackProps: {sx: {textAlign: 'center'}}}} />
          </motion.div>
        )}
        <Grid container spacing={1.5} sx={{height: 1, justifyContent: 'center'}}>
          {plans.map((plan, index) => (
            <Grid key={index} size={{xs: 12, sm: 6, md: 4}}>
              <motion.div
                key={index}
                initial={{opacity: 0, x: index === 0 ? -60 : index === 2 ? 60 : 0, y: 0, scale: index === 1 ? 0.9 : 1}}
                whileInView={{opacity: 1, x: 0, y: 0, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 0.4, ease: 'easeInOut', delay: plan.animationDelay}}
                style={{height: '100%'}}
              >
                <GraphicsCard sx={{height: 1, ...(plan.active && {border: '1px solid', borderColor: 'primary.main'})}}>
                  <Box sx={{pt: {xs: 4, sm: 5, md: 8}, px: {xs: 2, md: 5}, pb: {xs: 2, sm: 3, md: 5.25}, height: 1}}>
                    <Stack sx={{gap: 5, height: 1}}>
                      <Stack sx={{gap: {xs: 2, md: 3}}}>
                        <Stack sx={{gap: {xs: 1, sm: 1.5}, textAlign: 'center'}}>
                          <Typography variant="subtitle1" sx={{color: 'text.secondary'}}>
                            {plan.title}
                          </Typography>
                          <Typography component="div" variant="h1">
                            {plan.price === 0 ? "Gratuita" : plan.price + "€"}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              display: {
                                xs: plan.subtitle?.trim() ? 'block' : 'none',
                                sm: 'block'
                              },
                              minHeight: {
                                xs: 0,
                                sm: 24
                              }
                            }}
                          >
                            {plan.subtitle?.trim() || null}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack sx={{height: 1, justifyContent: 'space-between', gap: {xs: 3, sm: 4, md: 5}}}>
                        <Stack sx={{gap: 5}}>
                          <Divider/>
                          <Stack sx={{gap: {xs: 0.75, md: 1}}}>
                            {plan.features.map((item, index) => {
                              return (
                                <Stack key={index} direction="row" sx={{gap: 1.25, alignItems: 'center'}}>
                                  <SvgIcon
                                    component={Cookie}
                                    inheritViewBox
                                    sx={{
                                      fill: 'none',
                                      stroke: theme.palette.secondary.dark,
                                      strokeWidth: 2,
                                      strokeLinecap: 'round',
                                      strokeLinejoin: 'round',
                                      fontSize: 16,
                                    }}/>
                                  <Typography sx={{color: theme.palette.secondary.dark}}>
                                    {item}
                                  </Typography>
                                </Stack>
                              );
                            })}
                          </Stack>
                        </Stack>
                        <Stack sx={{gap: 0.75}}>
                          {plan.contentLink && (
                            <Typography variant="body2" sx={{color: 'text.secondary', textAlign: 'center', mb: 1.25}}>
                              {plan.content}&nbsp;
                            </Typography>
                          )}

                          <motion.div
                            initial={{scale: 0.9}}
                            animate={{scale: plan.active ? [1, 1.04, 1] : 1}}
                            transition={{
                              duration: plan.active ? 0.9 : 1,
                              delay: 0.1,
                              ease: 'easeInOut',
                              ...(plan.active && {repeat: Infinity, repeatType: 'loop'})
                            }}
                            whileHover={{scale: 1.01, transition: {duration: 0.3}}}
                          >
                            <ButtonAnimationWrapper>
                              <Button
                                variant={plan.active ? 'contained' : 'outlined'}
                                sx={{
                                  justifyContent: 'center',
                                  textAlign: 'center',
                                  ...(!plan.link && {mb: {sm: 3.25, md: 3.75}})
                                }}
                                fullWidth
                                {...plan.exploreLink}
                              />
                            </ButtonAnimationWrapper>
                          </motion.div>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                </GraphicsCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <Typography variant="body1">
          {firstVisit}
        </Typography>
      </Stack>
    </ContainerWrapper>
  );
}