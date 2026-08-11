import {CONTACT_EMAIL, INSTAGRAM, TIKTOK, LINKEDIN, ORDINE_REGISTRATION} from "../utils/constant";

export const SITE_URL = "https://themindfulcookie.com/";

export const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alice Ciani",
  "jobTitle": "Dietista Nutrizionista",
  "description": `Dietista Nutrizionista specializzata in mindful eating e intuitive eating, ${ORDINE_REGISTRATION}.`,
  "url": SITE_URL,
  "image": `${SITE_URL}og-image.jpg`,
  "email": `mailto:${CONTACT_EMAIL}`,
  "affiliation": {
    "@type": "Organization",
    "name": "The Mindful Cookie",
    "url": SITE_URL,
  },
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "Università degli Studi di Milano",
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "Università degli Studi di Pavia",
    },
  ],
  "sameAs": [LINKEDIN, INSTAGRAM, TIKTOK],
};

export function buildServiceSchema(plans) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Percorso di mindful eating",
    "serviceType": "Consulenza nutrizionale",
    "provider": {"@type": "Person", "name": "Alice Ciani"},
    "areaServed": "IT",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": SITE_URL,
      "availableLanguage": "Italian",
    },
    "offers": plans.map(({title, price}) => ({
      "@type": "Offer",
      "name": title,
      "price": price,
      "priceCurrency": "EUR",
    })),
  };
}

export function buildFaqSchema(faqList) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map(({question, answer}) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer,
      },
    })),
  };
}
