import {CONTACT_EMAIL, ORDINE_REGISTRATION} from "../utils/constant";

export const privacyPolicy = {
  title: "Privacy Policy",
  content: `Questa Informativa sulla Privacy descrive le politiche del sito web themindfulcookie.com, il titolare del trattamento dei dati è:

- Alice Ciani (The Mindful Cookie)
- P.IVA 02983490182
- CF: CNILCA94S48F205G
- PEC: alice.ciani@pec.tsrm-pstrp.org
- ${ORDINE_REGISTRATION[0].toUpperCase()}${ORDINE_REGISTRATION.slice(1)}

La nostra politica è semplice: non raccogliamo, conserviamo o elaboriamo informazioni personali attraverso il nostro sito web.

Raccolta delle Informazioni: 
Non raccogliamo alcun dato personale tramite il nostro sito web. Gli utenti hanno però la possibilità di contattarci tramite l’indirizzo email ${CONTACT_EMAIL}.

Utilizzo dell’Indirizzo Email: 
Utilizziamo l’indirizzo email degli utenti (fornito da loro nel momento in cui desiderano contattarci) unicamente per rispondere alle loro richieste e per la corrispondenza successiva. Non condividiamo l’indirizzo email con terze parti e non utilizziamo l’indirizzo email per fini di marketing o promozione.

Sicurezza: 
La sicurezza delle tue informazioni è importante per noi e adottiamo misure ragionevoli per proteggere l’indirizzo email degli utenti da accessi non autorizzati o divulgazioni.

Modifiche alla Presente Informativa: 
Ci riserviamo il diritto di modificare questa Informativa sulla Privacy in qualsiasi momento. Qualsiasi modifica sarà pubblicata su questa pagina con la nuova data di aggiornamento. Ti invitiamo a rivedere periodicamente questa Informativa per essere al corrente delle eventuali modifiche

Cookie: 
Il sito web utilizza esclusivamente cookie tecnici che non richiedono il consenso dell’utente (necessari al corretto funzionamento del sito).

Contatti: 
Per qualsiasi domanda o preoccupazione riguardo a questa Informativa sulla Privacy, si prega di contattarci all’indirizzo email: ${CONTACT_EMAIL}.

Ultimo aggiornamento: 26/01/2026
`
}