/**
 * useSEO — sets document <title> and all meta tags for each page.
 * Call at the top of every page component.
 *
 * Covers: title, description, canonical, Open Graph, Twitter Card,
 *         JSON-LD structured data (Organization + WebPage).
 */

const SITE = {
  name:        'CodeXClear',
  url:         'https://codexclear.com',
  altUrl:      'https://d2digit.com',         // future domain
  logo:        'https://codexclear.com/logo.png',
  phone:       '+918400087325',
  email:       'info@codexclear.com',
  address: {
    street:    'KH179 Anand Puram, STP Chauraha, Gomtinagar Extension',
    city:      'Lucknow',
    state:     'Uttar Pradesh',
    pin:       '226010',
    country:   'IN',
  },
  social: {
    twitter:   'https://twitter.com/codexclear',
    linkedin:  'https://linkedin.com/company/codexclear',
    github:    'https://github.com/codexclear',
  },
}

function setMeta(name, content, isProperty = false) {
  if (!content) return
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLD(data) {
  let el = document.querySelector('script[data-cxc-schema]')
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute('data-cxc-schema', '1')
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function useSEO({
  title,
  description,
  path = '/',
  keywords = '',
  ogImage = '/og-image.png',
  schemaType = 'WebPage',
  extraSchema = {},
}) {
  const fullTitle = `${title} | CodeXClear — IT Services Lucknow`
  const canonical = `${SITE.url}${path}`

  // Update <title>
  document.title = fullTitle

  // Primary meta
  setMeta('description', description)
  setMeta('keywords', keywords)
  setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large')
  setMeta('author', 'CodeXClear, Lucknow, India')
  setMeta('geo.region', 'IN-UP')
  setMeta('geo.placename', 'Lucknow')
  setMeta('geo.position', '26.8467;80.9462')
  setMeta('ICBM', '26.8467, 80.9462')
  setMeta('language', 'English')
  setMeta('revisit-after', '7 days')

  // Canonical
  setLink('canonical', canonical)
  setLink('alternate', `${SITE.altUrl}${path}`)   // d2digit.com alternate

  // Open Graph
  setMeta('og:type',        'website',    true)
  setMeta('og:url',         canonical,    true)
  setMeta('og:title',       fullTitle,    true)
  setMeta('og:description', description,  true)
  setMeta('og:image',       `${SITE.url}${ogImage}`, true)
  setMeta('og:image:width', '1200',       true)
  setMeta('og:image:height','630',        true)
  setMeta('og:site_name',   SITE.name,    true)
  setMeta('og:locale',      'en_IN',      true)

  // Twitter Card
  setMeta('twitter:card',        'summary_large_image')
  setMeta('twitter:site',        '@codexclear')
  setMeta('twitter:creator',     '@codexclear')
  setMeta('twitter:title',       fullTitle)
  setMeta('twitter:description', description)
  setMeta('twitter:image',       `${SITE.url}${ogImage}`)

  // JSON-LD structured data
  const orgSchema = {
    '@type': 'Organization',
    '@id':   `${SITE.url}/#organization`,
    name:    'CodeXClear',
    url:     SITE.url,
    logo:    SITE.logo,
    sameAs:  [SITE.altUrl, SITE.social.twitter, SITE.social.linkedin, SITE.social.github],
    contactPoint: {
      '@type':       'ContactPoint',
      telephone:     SITE.phone,
      contactType:   'customer service',
      areaServed:    'IN',
      availableLanguage: ['English','Hindi'],
    },
    address: {
      '@type':           'PostalAddress',
      streetAddress:     SITE.address.street,
      addressLocality:   SITE.address.city,
      addressRegion:     SITE.address.state,
      postalCode:        SITE.address.pin,
      addressCountry:    SITE.address.country,
    },
  }

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      orgSchema,
      {
        '@type':          schemaType,
        '@id':            `${canonical}#webpage`,
        url:              canonical,
        name:             fullTitle,
        description:      description,
        isPartOf:         { '@id': `${SITE.url}/#website` },
        inLanguage:       'en-IN',
        publisher:        { '@id': `${SITE.url}/#organization` },
        ...extraSchema,
      },
      {
        '@type': 'WebSite',
        '@id':   `${SITE.url}/#website`,
        url:     SITE.url,
        name:    'CodeXClear',
        publisher: { '@id': `${SITE.url}/#organization` },
        potentialAction: {
          '@type':       'SearchAction',
          target:        `${SITE.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  setJsonLD(pageSchema)
}

// Pre-built SEO configs for every page
export const SEO_PAGES = {
  home: {
    title:       'IT Services, Invoice App & Software Solutions',
    description: 'CodeXClear offers expert IT consulting, custom software development with Angular & .NET Core, ERP systems, invoice billing software, cloud & DevOps, and digital products from Lucknow, India. Also available at d2digit.com.',
    path:        '/',
    keywords:    [
      // Brand
      'CodeXClear','codexclear.com','d2digit','d2digit.com',
      // IT services — core
      'IT services Lucknow','IT company Lucknow','IT solutions India',
      'software development company Lucknow','web development Lucknow',
      'software company Lucknow UP','technology company Lucknow',
      // Invoice / billing — high intent
      'invoice software India','billing software India','GST invoice software',
      'simple billing system','online invoice generator India',
      'invoice management system','free invoice app','invoice maker online',
      'bill generator India','invoice billing software small business',
      'GST billing software Lucknow','accounting software India',
      // Angular / .NET
      'Angular development India','Angular .NET Core developer',
      '.NET Core developer Lucknow','full stack developer Lucknow',
      // ERP
      'ERP solutions India','ERP software Lucknow','small business ERP India',
      // Web / IT solution
      'website creation Lucknow','website development company Lucknow',
      'IT solution provider UP','custom web application India',
    ].join(', '),
  },

  services: {
    title:       'IT Consulting, Software Engineering & Cloud Services',
    description: 'Expert IT consulting, Angular & .NET Core software engineering, ERP development, cloud & DevOps on AWS/Azure, cybersecurity, and managed support — delivered by CodeXClear from Lucknow, India.',
    path:        '/services',
    keywords:    [
      'IT consulting Lucknow','software engineering India','cloud services India',
      'DevOps consulting India','ERP development company India',
      'cybersecurity services India','managed IT support Lucknow',
      'Angular developer India','.NET Core developer India',
      'API integration services India','IT training Lucknow',
      'website creation services India','web app development India',
    ].join(', '),
    schemaType:  'Service',
  },

  products: {
    title:       'Invoice Manager, Music App & Digital Products',
    description: 'CodeXClear products: Invoice Manager — free GST billing & invoice software built on Angular + .NET Core. Music App — free streaming. Plus Shadi Portal, CX Ride, CX Classifieds, CX Housing coming soon.',
    path:        '/products',
    keywords:    [
      'invoice manager app India','free invoice software','GST invoice app',
      'billing management system','online invoicing tool India',
      'invoice software for small business','simple invoice maker',
      'free music app India','streaming app India',
      'matrimonial portal India','ride hailing app India',
      'classifieds website India','property listing app India',
      'digital products India','SaaS products India','CodeXClear apps',
    ].join(', '),
    schemaType:  'SoftwareApplication',
  },

  about: {
    title:       'About CodeXClear — IT Company in Lucknow, India',
    description: 'CodeXClear is a Lucknow-based IT services company specialising in Angular, .NET Core, ERP, cloud, and billing software. 6+ years, 200+ projects, 50+ clients. Also known as d2digit.com.',
    path:        '/about',
    keywords:    [
      'about CodeXClear','IT company Lucknow India','software company Lucknow',
      'IT firm Gomtinagar Lucknow','technology startup Lucknow UP',
      'd2digit','d2digit IT company','Angular .NET Core company India',
    ].join(', '),
  },

  blog: {
    title:       'Tech Blog — Angular, .NET Core, Billing & IT Insights',
    description: 'CodeXClear blog: tutorials on Angular 17, .NET Core 8, invoice software development, ERP, cloud architecture, and IT consulting. Expert guides from Lucknow, India.',
    path:        '/blog',
    keywords:    [
      'Angular tutorial India','.NET Core tutorial','billing software development',
      'ERP development guide','cloud architecture India','IT blog India',
      'invoice app development','CodeXClear blog','software engineering blog India',
    ].join(', '),
    schemaType:  'Blog',
  },

  contact: {
    title:       'Contact CodeXClear — IT Services & Free Consultation',
    description: 'Contact CodeXClear for IT consulting, software development, invoice billing systems, ERP solutions, or website creation in Lucknow, India. Free consultation. Call +91-8400087325.',
    path:        '/contact',
    keywords:    [
      'contact CodeXClear','IT company contact Lucknow',
      'hire software developer Lucknow','free IT consultation India',
      'invoice software inquiry','ERP software quote India',
      'website development quote Lucknow',
    ].join(', '),
    schemaType:  'ContactPage',
    extraSchema: {
      mainEntity: {
        '@type':     'LocalBusiness',
        name:        'CodeXClear',
        image:       'https://codexclear.com/logo.png',
        telephone:   '+918400087325',
        email:       'info@codexclear.com',
        priceRange:  '₹₹',
        openingHours:'Mo-Sa 09:00-19:00',
        address: {
          '@type':         'PostalAddress',
          streetAddress:   'KH179 Anand Puram, STP Chauraha, Gomtinagar Extension',
          addressLocality: 'Lucknow',
          addressRegion:   'Uttar Pradesh',
          postalCode:      '226010',
          addressCountry:  'IN',
        },
        geo: {
          '@type':    'GeoCoordinates',
          latitude:   26.8467,
          longitude:  80.9462,
        },
        sameAs: ['https://d2digit.com'],
      },
    },
  },
}
