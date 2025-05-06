export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> {/* Replace with your actual verification code if available */}
      <meta name="author" content="Cristian Herrera" />

      {/* Social media meta tags */}
      <meta property="og:site_name" content="ventura.dev" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Cristian Herrera | Ventura Web Design & Development" />
      <meta property="og:description" content="Professional web design and development services in Ventura County. Fast, secure websites built by Cristian Herrera to help local businesses grow online." />
      <meta property="og:image" content="https://ventura.dev/imgs/me.jpg" />
      <meta property="og:url" content="https://ventura.dev" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cristianherrera" /> {/* Replace with your actual Twitter handle */}
      <meta name="twitter:title" content="Cristian Herrera | Ventura Web Design & Development" />
      <meta name="twitter:description" content="Professional web design and development services in Ventura County. Fast, secure websites built by Cristian Herrera to help local businesses grow online." />
      <meta name="twitter:image" content="https://ventura.dev/imgs/me.jpg" />
      
      {/* Geo tags */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Ventura" />
      <meta name="geo.position" content="34.2805;-119.2945" />
      <meta name="ICBM" content="34.2805, -119.2945" />
      
      {/* Canonical link */}
      <link rel="canonical" href="https://ventura.dev" />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Preconnect to CDNs or APIs */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Alternate languages - if you have them */}
      {/* <link rel="alternate" hrefLang="es" href="https://ventura.dev/es/" /> */}
    </>
  );
} 