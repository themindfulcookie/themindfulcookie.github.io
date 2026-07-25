import {CONTACT_EMAIL, CONTACT_HREF} from "../utils/constant";
import avatar from "../assets/images/profile.jpg";

export const hero = {
  chip: {
    label: "Il percorso di Mindful Eating personalizzato per fare finalmente pace con il cibo",
  },
  avatar: avatar,
  headLine: "The Mindful Cookie",
  captionLine: "Dietista Alice Ciani",
  primaryBtn: { children: "CONTATTAMI", href: CONTACT_HREF },
  subtitle: `
Contattami per una chiamata conoscitiva gratuita o per iniziare direttamente il percorso.
Ricorda di specificare nome e cognome e motivo della consulenza.
`,
  email: CONTACT_EMAIL,
  spam: "Non ti è arrivata nessuna risposta? Controlla nello spam!"
};
