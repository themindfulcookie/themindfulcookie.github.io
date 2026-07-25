import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import useFocusWithin from "../utils/useFocusWithin";
import ContainerWrapper from "../components/ContainerWrapper";
import {SECTION_COMMON_PY} from "../utils/constant";
import Typeset from "../components/Typeset";

export default function Faq({ heading, faqList }) {
  const theme = useTheme();
  const isFocusWithin = useFocusWithin();
  const [expanded, setExpanded] = useState(false);

  const cardRadius = { xs: 4, sm: 6 };
  const accordionRadius = { xs: cardRadius.xs * 4, sm: cardRadius.sm * 4 };
  const accordionPX = { xs: 2, sm: 3 };

  const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  return (
    <ContainerWrapper id="faq" sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        {heading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Stack direction={{ sm: 'row' }} sx={{ gap: 4, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'end' } }}>
              <Typeset {...{ heading }} />
            </Stack>
          </motion.div>
        )}
        <Stack sx={{ gap: 2 }}>
          <Stack
            sx={{
              gap: 1,
              '& .MuiAccordion-root:first-of-type': { borderTopLeftRadius: accordionRadius, borderTopRightRadius: accordionRadius },
              '& .MuiAccordion-root:last-of-type': { borderBottomLeftRadius: accordionRadius, borderBottomRightRadius: accordionRadius }
            }}
          >
            {faqList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  sx={{
                    borderRadius: cardRadius,
                    backgroundColor: 'grey.100',
                    ...(isFocusWithin && { '&:focus-within': generateFocusVisibleStyles(theme.vars.palette.primary.main) })
                  }}
                >
                  <AccordionSummary
                    sx={{
                      p: accordionPX,
                      '&.Mui-focusVisible': { bgcolor: 'transparent' },
                      '&:hover, &:hover svg': { color: 'primary.dark' }
                    }}
                    slotProps={{ content: { sx: { my: 0 } } }}
                  >
                    <Typography variant="h6">{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: accordionPX, pt: 0, pb: accordionPX }} key={index}>
                    <Typography sx={{color: 'text.secondary'}}>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}