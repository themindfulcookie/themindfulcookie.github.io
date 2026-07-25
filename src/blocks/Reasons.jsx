import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { motion } from 'motion/react';
import {SECTION_COMMON_PY} from "../utils/constant";
import Typeset from "../components/Typeset";
import GraphicsCard from "../components/GraphicsCard";
import {SvgIcon} from "@mui/material";
import ButtonAnimationWrapper from "../components/ButtonAnimationWrapper";
import ContainerWrapper from "../components/ContainerWrapper";

export default function Reasons({ heading, caption, image, features, actionBtn, secondaryBtn }) {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

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
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY, mt: -2 }}>
      <Stack sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.3
          }}
        >
          <Typeset {...{ heading, stackProps: { sx: { maxWidth: { md: 500 }, ...(!image && { maxWidth: 1, textAlign: 'center' }) } } }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.4
          }}
        >
          <GraphicsCard sx={{ position: 'relative', overflow: 'visible' }}>
            <Box sx={{ p: 3 }}>
              <Grid container>
                {features.map((item, index) => (
                  <Grid
                    key={index}
                    size={{ xs: 12 / partitionInExtraSmall, sm: 12 / partitionInSmall, md: 12 / partitionInLarge }}
                    sx={{
                      position: 'relative',
                      ...(index < indexOfFirstElementInLastRow && { borderBottom: `1px solid ${theme.vars.palette.grey[300]}` }),
                      ...(!indicesOfLastElements.includes(index) && { borderRight: `1px solid ${theme.vars.palette.grey[300]}` })
                    }}
                  >
                    <Stack sx={{ gap: { xs: 1, sm: 2 }, height: 1, py: { xs: 1.5, sm: 3, md: 4 }, px: { xs: 0, sm: 3, md: 4 } }}>
                      <Avatar sx={{ width: 60, height: 60, bgcolor: 'grey.300' }}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.6 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: index * 0.1 }}
                        >
                          <SvgIcon
                            component={item.icon}
                            inheritViewBox
                            sx={{
                              fill: 'none',
                              stroke: theme.palette.secondary.dark,
                              strokeWidth: 2,
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              fontSize: 32,
                            }}/>
                        </motion.div>
                      </Avatar>
                      <Stack sx={{ gap: { xs: 0.5, md: 1 } }}>
                        <motion.div
                          initial={{ opacity: 0, y: 25 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          {item.title && <Typography variant="h4">{item.title}</Typography>}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 25 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.3 }}
                        >
                          {item.content && <Typography sx={{ color: 'text.secondary' }}>{item.content}</Typography>}
                        </motion.div>
                      </Stack>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </GraphicsCard>
        </motion.div>
        <Stack sx={{ alignItems: 'center', gap: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: { xs: '75%', sm: '45%' }, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.4
              }}
            >
              {caption}
            </motion.div>
          </Typography>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.5
            }}
          >
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
              {secondaryBtn && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.06 }}
                >
                  <ButtonAnimationWrapper>
                    <Button variant="outlined" {...secondaryBtn} />
                  </ButtonAnimationWrapper>
                </motion.div>
              )}
              {actionBtn && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.06 }}
                >
                  <ButtonAnimationWrapper>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
                      {...actionBtn}
                    />
                  </ButtonAnimationWrapper>
                </motion.div>
              )}
            </Stack>
          </motion.div>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}