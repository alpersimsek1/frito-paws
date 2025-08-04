import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: "Frito Paws | Professional Dog Walking & Pet Sitting Services in Chiswick, London",
  description: "Professional dog walking, pet sitting, and in-home care services in Chiswick, London. Trusted, loving care for your furry friends with real-time updates and GPS tracking. From £15 per walk.",
  keywords: "dog walking Chiswick, pet sitting London, dog walker Chiswick, pet care London, professional dog walking, pet sitting services, dog walking Chiswick London, pet care Chiswick, dog sitting, pet sitting near me, W4 dog walker, Turnham Green pet care, Hammersmith dog walking, Acton pet sitting, Richmond dog walker, Kew Gardens pet care",
  other: {
    'geo.region': 'GB-LND',
    'geo.placename': 'Chiswick, London',
    'geo.position': '51.4907;-0.2546',
    'ICBM': '51.4907, -0.2546',
    'DC.title': 'Professional Dog Walking & Pet Sitting Services in Chiswick, London',
    'DC.subject': 'Dog Walking, Pet Sitting, Pet Care Services',
    'DC.description': 'Professional dog walking and pet sitting services in Chiswick, London. Individual walks, group walks, and in-home pet care.',
    'DC.language': 'en-GB',
    'DC.coverage': 'Chiswick, London, UK',
  },
  authors: [{ name: "Frito Paws" }],
  creator: "Frito Paws",
  publisher: "Frito Paws",
  icons: {
    icon: '/frito-logo.png',
    shortcut: '/frito-logo.png',
    apple: '/frito-logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://fritopaws.co',
    title: 'Frito Paws | Professional Dog Walking & Pet Sitting in Chiswick, London',
    description: 'Professional dog walking, pet sitting, and in-home care services in Chiswick, London. Trusted, loving care for your furry friends with real-time updates and GPS tracking.',
    siteName: 'Frito Paws',
    images: [
      {
        url: 'https://fritopaws.co/frito-logo.png',
        width: 1200,
        height: 630,
        alt: 'Frito Paws - Professional Dog Walking Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frito Paws | Professional Dog Walking & Pet Sitting in Chiswick, London',
    description: 'Professional dog walking, pet sitting, and in-home care services in Chiswick, London. Trusted, loving care for your furry friends.',
    images: ['https://fritopaws.co/frito-logo.png'],
  },
  alternates: {
    canonical: 'https://fritopaws.co',
  },
  category: 'Pet Services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://fritopaws.co",
    "name": "Frito Paws",
    "description": "Professional dog walking, pet sitting, and in-home care services in Chiswick, London. Trusted, loving care for your furry friends with real-time updates and GPS tracking.",
    "url": "https://fritopaws.co",
    "telephone": "+447534148093",
    "email": "info@fritopaws.com",
    "priceRange": "£15-£20",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chiswick",
      "addressRegion": "London",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.4907,
      "longitude": -0.2546
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Chiswick"
      },
      {
        "@type": "City", 
        "name": "London"
      }
    ],
    "serviceType": ["Dog Walking", "Pet Sitting", "Pet Care"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pet Care Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Private Adventures - Individual Dog Walking",
            "description": "Exclusive one-on-one dog walking service with personalized attention and detailed reports."
          },
          "price": "20",
          "priceCurrency": "GBP"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Pack Walks - Group Dog Walking",
            "description": "Small group dog walking service with maximum 4 dogs for socialization and exercise."
          },
          "price": "15",
          "priceCurrency": "GBP"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cosy Homestays - Pet Sitting",
            "description": "In-home pet care service providing loving environment and personalized care plans."
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "Contact for pricing",
            "priceCurrency": "GBP"
          }
        }
      ]
    },
    "openingHours": "Mo-Su 07:00-19:00",
    "image": "https://fritopaws.co/frito-logo.png",
    "logo": "https://fritopaws.co/frito-logo.png",
    "sameAs": [],
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5,
        "bestRating": 5
      },
      "author": {
        "@type": "Person",
        "name": "Pet Owner"
      },
      "reviewBody": "Professional and caring service for our furry friends in Chiswick."
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17115856128"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17115856128');
            `,
          }}
        />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Diplomata&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${notoSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
