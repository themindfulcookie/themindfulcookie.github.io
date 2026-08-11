import {person, buildFaqSchema, buildServiceSchema} from "../data/seo";

// Escapes "<" so a "</script" substring inside any JSON-LD value (e.g. a FAQ
// answer or plan title) can't prematurely close the surrounding <script> tag.
function toJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function Seo({faqList, plans}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: toJsonLd(person)}} />
      {faqList && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: toJsonLd(buildFaqSchema(faqList))}} />
      )}
      {plans && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: toJsonLd(buildServiceSchema(plans))}} />
      )}
    </>
  );
}
