import {useTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Masonry from '@mui/lab/Masonry';
import {motion} from 'motion/react';
import {SECTION_COMMON_PY} from "../utils/constant";
import Typeset from "../components/Typeset";
import GraphicsCard from "../components/GraphicsCard";
import {Rating} from "@mui/material";
import ContainerWrapper from "../components/ContainerWrapper";
import {withAlpha} from "../utils/colorUtils";

export default function Testimonial({heading, testimonials}) {
  const theme = useTheme();

  return (
    <ContainerWrapper id="recensioni" sx={{py: SECTION_COMMON_PY, mt: -4}}>
      <Stack sx={{gap: {xs: 3, sm: 4}}}>
        <Typeset {...{heading, stackProps: {sx: {maxWidth: {xs: 550, md: 700}, textAlign: 'center', mx: 'auto'}}}} />
        <Masonry
          columns={{xs: 2, sm: 3}}
          spacing={{xs: 1, sm: 1.5}}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, scale: 0.5}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.4, ease: 'easeOut', delay: index * 0.1}}
            >
              <GraphicsCard key={index} sx={{borderRadius: {xs: 4, md: 6}}}>
                <Stack sx={{justifyContent: 'space-between', height: 1, gap: 1, p: {xs: 1.5, md: 2}}}>
                  <Rating sx={{color: theme.palette.primary.main}} {...{
                    defaultValue: 5,
                    readOnly: true,
                  }} />
                  <Stack sx={{gap: 1}}>
                    <Typography sx={{color: 'text.secondary'}}>{testimonial}</Typography>
                  </Stack>
                </Stack>
              </GraphicsCard>
            </motion.div>
          ))}
        </Masonry>
      </Stack>
    </ContainerWrapper>
  );
}