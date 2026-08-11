import {CONTACT_HREF, INSTAGRAM} from "../utils/constant";
import Instagram from "../assets/icons/Instagram";
import StrokeIcon from "../components/StrokeIcon";

const linkProps = {target: '_blank', rel: 'noopener noreferrer'};
export const navbar = {
  customization: true,
  secondaryBtn: {
    children:
      <StrokeIcon icon={Instagram} size={24} color="currentColor" strokeWidth={2} />,
    href: INSTAGRAM,
    ...linkProps,
    "aria-label": "Instagram",
    style: {minWidth: 40, width: 40, height: 40, padding: 0}
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
