import {Box, Avatar, Stack, SvgIcon} from "@mui/material";
import Typeset from "../components/Typeset";
import ContainerWrapper from "../components/ContainerWrapper";
import {SECTION_COMMON_PY} from "../utils/constant";
import {motion} from 'motion/react';
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Cookie from "../assets/icons/Cookie";
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";

export default function About({avatar, title, about, resume}) {
  return (
    <ContainerWrapper
      id="about"
      sx={{
        py: SECTION_COMMON_PY,
        mt: -2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        <Stack
          direction={{xs: "column", md: "row"}}
          spacing={4}
          alignItems={{xs: "center", md: "flex-start"}}
        >
          <motion.div
            initial={{opacity: 0, y: 10}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: 0.1}}
          >
            <Avatar
              src={avatar}
              alt={name}
              sx={{
                width: 250,
                height: 250,
              }}
            />
          </motion.div>

          <Box sx={{textAlign: {xs: "center", md: "left"}}}>
            <motion.div
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: 0.2}}
            >
              <Typeset heading={title}/>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: 0.4}}
            >
              <Typeset
                sx={{
                  mt: 2,
                  maxWidth: 640,
                }}
                caption={about}
              />
            </motion.div>
          </Box>
        </Stack>
        <motion.div
          initial={{opacity: 0, y: 10}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5, delay: 0.6}}
        >
          <Resume items={resume}/>
        </motion.div>
      </Stack>
    </ContainerWrapper>
);
}

function Resume({items}) {
  const theme = useTheme();

  return (
    <Box>
      <Timeline position="alternate">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const [text, year] = item.split('\n');

          return (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color="primary">
                  <SvgIcon
                    component={Cookie}
                    inheritViewBox
                    sx={{
                      fill: 'none',
                      stroke: theme.palette.primary.dark,
                      strokeWidth: 2,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      fontSize: 16,
                    }}
                  />
                </TimelineDot>

                {!isLast && <TimelineConnector/>}
              </TimelineSeparator>

              <TimelineContent>
                <Typography variant="body2" color={theme.palette.grey[700]}>{year}</Typography>
                <Typography>{text}</Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
}
