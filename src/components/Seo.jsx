import {person, buildFaqSchema, buildServiceSchema} from "../data/seo";

export default function Seo({faqList, plans}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(person)}} />
      {faqList && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(buildFaqSchema(faqList))}} />
      )}
      {plans && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(buildServiceSchema(plans))}} />
      )}
    </>
  );
}
