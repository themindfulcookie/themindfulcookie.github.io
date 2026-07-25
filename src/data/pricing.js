import {contactHrefWithSubject} from "../utils/constant";

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

export const pricing = {
  heading: 'I miei servizi',
  caption: `
  Contattami per una chiamata conoscitiva gratuita o per iniziare direttamente il percorso.
  `,
  firstVisit: `
  La prima visita prevede: anamnesi delle abitudini alimentari, analisi del rapporto con il cibo, della storia del peso e del comportamento alimentare. Al termine riceverai un fascicolo introduttivo di esercizi dedicati alla fame e alla sazietà.
  `,
  plans: [
    {
      title: 'Chiamata conoscitiva',
      subtitle: '',
      price: 0,
      active: false,
      exploreLink: { children: 'Prenota la chiamata conoscitiva', href: contactHrefWithSubject('Richiesta chiamata conoscitiva'), ...linkProps },
      features: [
        "15 minuti per fare chiarezza e avere le informazioni di cui hai bisogno.",
        "Valuteremo insieme se il percorso è adatto a te, in base ai tuoi bisogni e ai tuoi obiettivi.",
        "Un momento per orientarti e capire meglio senza vincoli.",
        "Se hai ricevuto una diagnosi di disturbo alimentare la chiamata conoscitiva è consigliata."
      ]
    },
    {
      title: 'Percorso personalizzato',
      subtitle: 'per ogni incontro',
      active: true,
      price: 70,
      exploreLink: { children: 'Inizia il percorso', href: contactHrefWithSubject('Richiesta inizio percorso'), ...linkProps },
      features: [
        "50 minuti di tempo per ogni consulenza.",
        "Comodamente da casa online via Google Meet.",
        "Esercizi pratici di mindful eating per fare pace con il cibo.",
        "I tuoi tempi: numero di consulenze flessibile in base alle tue necessità.",
        "Uno spazio sicuro per conoscerci e costruire un rapporto sereno con il cibo.",
      ]
    }
  ]
};
