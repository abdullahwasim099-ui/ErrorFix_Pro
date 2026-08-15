export function generateErrorSEO(errorData) {
  if (!errorData) return {};

  const title = `How to Fix Windows Error ${errorData.code}: ${errorData.title} | ErrorFix Pro`;
  
  // Create a clean 150-160 char description
  let description = errorData.summary || errorData.overview || '';
  if (description.length > 155) {
    description = description.substring(0, 152) + '...';
  }

  const canonical = `https://errorfixerpro.co.uk/error/${errorData.code.toLowerCase()}`;
  
  const schemaData = [];
  
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `How to Fix ${errorData.code}: ${errorData.title}`,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "ErrorFix Pro"
    }
  };
  schemaData.push(techArticleSchema);

  if (errorData.detailedFixes && errorData.detailedFixes.length > 0) {
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How to Fix ${errorData.code}: ${errorData.title}`,
      "description": description,
      "step": errorData.detailedFixes.map((fix, fixIdx) => ({
        "@type": "HowToSection",
        "name": fix.title,
        "itemListElement": fix.steps.map((step, stepIdx) => ({
          "@type": "HowToStep",
          "position": stepIdx + 1,
          "text": step
        }))
      }))
    };
    schemaData.push(howToSchema);
  }
  
  if (errorData.faq && errorData.faq.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": errorData.faq.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    };
    schemaData.push(faqSchema);
  }

  return {
    title,
    description,
    canonical,
    type: 'article',
    schemaData
  };
}
