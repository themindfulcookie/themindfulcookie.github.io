import {CONTACT_HREF, INSTAGRAM} from "../utils/constant";
import Instagram from "../assets/icons/Instagram";
import {SvgIcon} from "@mui/material";

const linkProps = {target: '_blank', rel: 'noopener noreferrer'};
export const navbar = {
  customization: true,
  secondaryBtn: {
    children:
      <SvgIcon
        component={Instagram}
        inheritViewBox
        sx={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fontSize: 24,
        }}
      />,
    href: INSTAGRAM,
    ...linkProps,
    sx: {minWidth: 40, width: 40, height: 40, p: 0}
  },
  primaryBtn: {children: 'CONTATTAMI', href: CONTACT_HREF, ...linkProps},
  navItems: [
    {id: 'home', title: 'Home', link: '#'},
    {id: 'about', title: 'Chi sono', link: '#about'},
    {id: 'servizi', title: 'I miei servizi', link: '#servizi'},
    {id: 'recensioni', title: 'Recensioni', link: '#recensioni'},
    {id: 'faq', title: 'FAQ', link: '#faq'},
  ]
};
