import {Stack, Dialog, DialogTitle, DialogContent, IconButton, Menu, useTheme, SvgIcon} from "@mui/material";
import ContainerWrapper from "../components/ContainerWrapper";
import {INSTAGRAM, SECTION_COMMON_PY, TIKTOK} from "../utils/constant";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {useState} from "react";
import {privacyPolicy} from "../data/privacy";
import {cookiePolicy} from "../data/cookie";
import {Close} from "@mui/icons-material";
import {motion} from 'motion/react';
import Button from "@mui/material/Button";
import Instagram from "../assets/icons/Instagram";
import TikTok from "../assets/icons/TikTok";

export default function Footer({footer}) {
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const handleOpenPrivacy = (e) => {
    e.preventDefault();
    setOpenPrivacy(true);
  };
  const onClosePrivacy = () => setOpenPrivacy(false);

  const [openCookie, setOpenCookie] = useState(false);
  const handleOpenCookie = (e) => {
    e.preventDefault();
    setOpenCookie(true);
  };
  const onCloseCookie = () => setOpenCookie(false);
  const theme = useTheme();
  return (
    <ContainerWrapper
      sx={{
        py: SECTION_COMMON_PY,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{opacity: 0, y: 10}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.5, delay: 0.5}}
      >
        <Stack
          direction="column"
          alignItems="center"
        >
          <Stack direction="row" spacing={0}>
            <Button
              component="a"
              target="_blank"
              href={INSTAGRAM}
              size="small"
              rel="noopener noreferrer"
              aria-label="nav-secondary-btn"
            >
              <SvgIcon
                component={Instagram}
                inheritViewBox
                sx={{
                  fill: 'none',
                  stroke: theme.palette.primary.dark,
                  strokeWidth: 1,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  fontSize: 36,
                }}
              />
            </Button>
            <Button
              component="a"
              target="_blank"
              href={TIKTOK}
              size="small"
              rel="noopener noreferrer"
              aria-label="nav-secondary-btn"
            >
              <SvgIcon
                component={TikTok}
                inheritViewBox
                sx={{
                  fill: 'none',
                  stroke: theme.palette.primary.dark,
                  strokeWidth: 1,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  fontSize: 36,
                }}
              />
            </Button>
          </Stack>
          {footer.map((item, i) => (
            <Typography key={i} variant="subtitle2" textAlign="center">
              {item}
            </Typography>
          ))}
          <Stack direction="row"
                 alignItems="center" spacing={3}>
            <Link variant="subtitle2" onClick={handleOpenPrivacy}>Privacy Policy</Link>
            <Link variant="subtitle2" onClick={handleOpenCookie}>Cookie Policy</Link>
          </Stack>
        </Stack>
      </motion.div>

      <LargeDialog
        title={privacyPolicy.title}
        content={privacyPolicy.content}
        open={openPrivacy}
        onClose={onClosePrivacy}/>
      <LargeDialog
        title={cookiePolicy.title}
        content={cookiePolicy.content}
        open={openCookie}
        onClose={onCloseCookie}/>
    </ContainerWrapper>
  );
}

function LargeDialog({title, content, open, onClose}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 6,
          },
        },
      }}
    >
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[900],
          }}
        >
          <Close/>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography sx={{whiteSpace: 'pre-line'}}>{content}</Typography>
      </DialogContent>
    </Dialog>
  )
}