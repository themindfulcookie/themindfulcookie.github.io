import {useEffect, useRef, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {motion} from 'motion/react';
import {Avatar, SvgIcon} from "@mui/material";
import ContainerWrapper from "../components/ContainerWrapper";
import {SECTION_COMMON_PY} from "../utils/constant";
import {withAlpha} from "../utils/colorUtils";
import Wave from "../assets/icons/Wave";
import ButtonAnimationWrapper from "../components/ButtonAnimationWrapper";

export default function Hero({avatar, chip, headLine, captionLine, primaryBtn, subtitle, email, spam}) {
  const theme = useTheme();

  const containerRef = useRef(null);

  return (
    <ContainerWrapper sx={{py: SECTION_COMMON_PY}}>
      <Box ref={containerRef}>
        <Box sx={{pb: {xs: 3, sm: 4, md: 5}}}>
          <Stack sx={{alignItems: "center", gap: 1.5}}>
            <motion.div
              initial={{opacity: 0, scale: 0.6}}
              whileInView={{opacity: 1, scale: [0.6, 1.15, 0.95, 1]}}
              animate={{
                boxShadow: [
                  `0 0 0px ${withAlpha(theme.vars.palette.primary.dark, 0)}`,
                  `0 0 20px ${withAlpha(theme.vars.palette.primary.main, 0.8)}`,
                  `0 0 0px ${withAlpha(theme.vars.palette.primary.dark, 0)}`,
                ],
                borderRadius: "74px",
              }}
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.2, ease: "linear"}}
            >
              <Typography
                component="span"
                variant="body2"
                textAlign="center"
                sx={{
                  borderRadius: 999,
                  padding: 1.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: "grey.100",
                  color: theme.palette.primary.darker,
                }}
              >
                {chip.label}
              </Typography>
            </motion.div>

            <motion.div
              initial={{opacity: 0, scale: 0.6}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.4, ease: "linear"}}
            >
              <Typography variant="h1" align="center" sx={{maxWidth: 800}}>
                {headLine}
              </Typography>
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <Box sx={{pt: 0.5, pb: 0.75}}>
                <Wave/>
              </Box>
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <Typography
                variant="h3"
                align="center"
                sx={{color: "text.secondary", maxWidth: 650}}
              >
                {captionLine}
              </Typography>
            </motion.div>
          </Stack>
          <Stack
            sx={{alignItems: "center", gap: 8, mt: {xs: 3, sm: 4, md: 5}}}
          >
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.3, ease: "linear", delay: 1.0,}}
            >
              <ButtonAnimationWrapper>
                <Button
                  color="primary"
                  variant="contained"
                  {...primaryBtn}
                />
              </ButtonAnimationWrapper>
            </motion.div>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.3, ease: "linear", delay: 1.0}}
            >
              <Stack spacing={1} alignItems="center">
                <Typography variant="body1" align="center" sx={{maxWidth: 800}}>
                  {subtitle}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {email}
                </Typography>
                <Typography variant="body1" align="center">
                  {spam}
                </Typography>
              </Stack>
            </motion.div>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.3, ease: "linear", delay: 1.2}}
            >
              <Avatar
                src={avatar}
                alt={name}
                sx={{
                  width: 260,
                  height: 260,
                }}
              />
            </motion.div>
          </Stack>
        </Box>
      </Box>
    </ContainerWrapper>
  );
}