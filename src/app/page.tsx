"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  CodeBracketIcon, 
  ServerIcon, 
  DevicePhoneMobileIcon, 
  PaintBrushIcon,
  // Commenting out the dark mode icons
  // SunIcon,
  // MoonIcon
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';

// Theme type definition
interface ThemeColors {
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  bg: {
    primary: string;
    secondary: string;
    card: string;
  };
}

// Reveal animation for sections
const RevealSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Service card with enhanced design
const ServiceCard = ({ Icon, title, description, index, theme }: { 
  Icon: React.ElementType; 
  title: string; 
  description: string; 
  index: number;
  theme: ThemeColors;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative ${theme.bg.card} p-6 pt-12 pb-14 rounded-xl hover:shadow-lg transition-all duration-300 border border-indigo-100 group overflow-visible hover:border-indigo-300`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
      
      {/* Icon positioned at the top of the card */}
      <div className="absolute top-0 left-6 w-14 h-14 flex items-center justify-center z-20 transform -translate-y-1/2">
        <div className="absolute inset-0 bg-indigo-100 rounded-lg transform rotate-6 group-hover:bg-indigo-200 transition-colors duration-300"></div>
        <div className="absolute inset-0 bg-blue-100 rounded-lg transform -rotate-6 group-hover:bg-blue-200 transition-colors duration-300"></div>
        <Icon className="w-7 h-7 relative z-10 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" />
      </div>
      
      <div className="relative z-10">
        <div className="text-left">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className={`${theme.text.secondary} text-sm leading-relaxed`}>{description}</p>
        </div>
      </div>
      
      {/* Absolutely positioned "See Details" link */}
      <motion.a 
        href="#" 
        className="absolute bottom-4 left-6 inline-flex items-center text-indigo-600 font-medium text-sm"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        See Details
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.a>
    </motion.div>
  );
};

// Theme colors - using light theme only now
const getThemeColors = (): ThemeColors => {
  return {
    gradients: {
      primary: "bg-gradient-to-br from-indigo-600 to-blue-500",
      secondary: "bg-gradient-to-tr from-purple-600 to-indigo-600",
      accent: "bg-gradient-to-r from-blue-400 to-cyan-300",
    },
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-600",
    },
    bg: {
      primary: "bg-gray-50",
      secondary: "bg-white",
      card: "bg-white",
    }
  };
};

// Projects with testimonials component
const ProjectsWithTestimonials = ({ theme }: { theme: ThemeColors }) => {
  const projects = [
    {
      id: 1,
      title: "Ventura Surf Shop",
      description: "E-commerce site with 3x faster checkout and 40% higher mobile conversions than their previous site.",
      image: "/imgs/sites/photo.png",
      testimonial: {
        quote: "They truly understood our local business needs. Our new website loads instantly and customers love how easy it is to use.",
        author: "Sarah J.",
        business: "Ventura Surf Shop"
      }
    },
    {
      id: 2,
      title: "Ojai Organic Farm",
      description: "Farm-to-table ordering system that helped them expand deliveries throughout Ventura County.",
      image: "/imgs/sites/cristian.png",
      testimonial: {
        quote: "Not only did they build us a beautiful site, they taught us how to maintain it ourselves. That kind of support is priceless.",
        author: "Michael R.",
        business: "Ojai Organic Farm"
      }
    },
    {
      id: 3,
      title: "Ventura Harbor Tours",
      description: "Booking website that doubled their online reservations within the first month of launch.",
      image: "/imgs/sites/missionoaks.png",
      testimonial: {
        quote: "The SEO improvements they made to our site have brought us so many new customers who would have never found us otherwise.",
        author: "Lisa T.",
        business: "Ventura Harbor Tours"
      }
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
          setIsAnimating(false);
        }, 500); // Match this with animation duration
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAnimating, projects.length]);

  const handleDotClick = (index: number) => {
    if (index !== currentIndex && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 500); // Match this with animation duration
    }
  };

  // Get the current project
  const currentProject = projects[currentIndex];

  // Mac device frame component
  const MacFrame = ({ image, title }: { image: string; title: string }) => (
    <div className="relative w-full mx-auto transform transition-transform duration-500">
      {/* Shadow and reflection effects */}
      <div className="absolute -bottom-8 inset-x-8 h-14 bg-black/15 blur-xl rounded-full"></div>
      
      {/* Mac frame */}
      <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.25)] border border-gray-700">
        {/* Top bar with camera */}
        <div className="bg-gray-900 h-7 md:h-8 flex items-center px-3 relative">
          <div className="absolute left-3 flex space-x-1.5">
            <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-red-500 flex items-center justify-center">
              <div className="w-1.5 h-0.5 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-yellow-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-yellow-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-green-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700"></div>
        </div>
        
        {/* Screen with inner shadow */}
        <div className="relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10 pointer-events-none"></div>
          <Image 
            src={image}
            alt={title}
            width={1200}
            height={750}
            className="w-full object-cover aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent z-10 pointer-events-none"></div>
        </div>
        
        {/* Mac bottom bezel */}
        <div className="bg-gray-900 h-5 md:h-6 rounded-b-xl"></div>
      </div>
    </div>
  );

  // iPhone device frame component
  const IPhoneFrame = ({ image, title }: { image: string; title: string }) => (
    <div className="relative w-32 md:w-36 mx-auto transform transition-transform duration-500">
      {/* Shadow effect */}
      <div className="absolute -bottom-5 inset-x-3 h-6 bg-black/15 blur-lg rounded-full"></div>
      
      {/* iPhone frame */}
      <div className="relative bg-gray-900 rounded-[28px] overflow-hidden border-[8px] border-gray-800 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-14 h-5 bg-black rounded-b-xl z-10">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1.5 w-1.5 h-1.5 rounded-full bg-gray-700 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-gray-500/80"></div>
          </div>
        </div>
        
        {/* Speaker */}
        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-gray-700 rounded-full z-10"></div>
        
        {/* Screen with inner shadow and reflection */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10 pointer-events-none"></div>
          <Image 
            src={image}
            alt={`${title} mobile view`}
            width={240}
            height={500}
            className="w-full object-cover aspect-[9/19.5] transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
        </div>
        
        {/* Bottom "home" indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full z-20"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Project Devices Display */}
      <div className="grid md:grid-cols-7 gap-4 md:gap-6 mb-10">
        {/* Desktop preview (5 columns) */}
        <motion.div 
          className="md:col-span-5 relative self-end px-4 md:px-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: isAnimating ? 0 : 1, x: isAnimating ? -20 : 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <MacFrame image={currentProject.image} title={currentProject.title} />
        </motion.div>

        {/* Mobile preview (2 columns) */}
        <motion.div 
          className="md:col-span-2 flex justify-center md:justify-center items-end self-end"
          initial={{ opacity: 1 }}
          animate={{ opacity: isAnimating ? 0 : 1, x: isAnimating ? 20 : 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <IPhoneFrame image={currentProject.image} title={currentProject.title} />
        </motion.div>
      </div>
      
      {/* Project Info and Testimonial */}
      <motion.div 
        className="mb-12 mt-14 relative"
        initial={{ opacity: 1 }}
        animate={{ opacity: isAnimating ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Subtle background glow effect */}
        <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/5 via-purple-300/5 to-blue-300/5 rounded-3xl blur-2xl -z-10"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 md:px-8">
          {/* Testimonial quote */}
          <div className="relative pl-4">
            <div className="absolute top-0 left-0 text-6xl text-indigo-400 font-serif leading-none opacity-80">&ldquo;</div>
            <p className={`${theme.text.secondary} pl-8 pr-8 md:pr-12 text-lg md:text-xl italic leading-relaxed max-w-4xl`}>
              {currentProject.testimonial.quote}
            </p>
            <div className="absolute bottom-0 right-0 text-6xl text-indigo-400 font-serif leading-none opacity-80 rotate-180">&rdquo;</div>
          </div>
          
          {/* Author info with enhanced styling */}
          <div className="flex items-center mt-8 pl-12 relative">
            <div className="absolute w-48 h-16 -left-4 bg-gradient-to-r from-indigo-100/30 to-transparent rounded-full blur-lg -z-10"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              {currentProject.testimonial.author.charAt(0)}
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-base text-gray-800">{currentProject.testimonial.author}</h4>
              <p className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-sm font-medium">
                {currentProject.testimonial.business}
              </p>
            </div>
          </div>
          
          {/* Subtle accent element */}
          <div className="absolute -right-2 -top-2 w-20 h-20 bg-gradient-to-br from-indigo-200/20 to-purple-200/10 rounded-full blur-xl -z-10"></div>
        </div>
      </motion.div>
      
      {/* Project navigation dots */}
      <div className="flex justify-center space-x-3 mb-8">
        {projects.map((_, index) => (
          <button 
            key={index} 
            onClick={() => handleDotClick(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-indigo-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`View project ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrows for manual navigation */}
      <div className="flex justify-between mt-0 md:mt-0 max-w-6xl mx-auto px-4">
        <motion.button 
          onClick={() => {
            if (!isAnimating) {
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
                setIsAnimating(false);
              }, 500);
            }
          }}
          className="bg-white rounded-full p-2.5 shadow-md text-indigo-600 hover:bg-indigo-50 transition-colors border border-gray-100"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <motion.button 
          onClick={() => {
            if (!isAnimating) {
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
                setIsAnimating(false);
              }, 500);
            }
          }}
          className="bg-white rounded-full p-2.5 shadow-md text-indigo-600 hover:bg-indigo-50 transition-colors border border-gray-100"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

// Main Page Component
export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.9]);
  const headerY = useTransform(scrollYProgress, [0, 0.05], [0, -10]);

  // Theme colors - using light theme only
  const theme = getThemeColors();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // In a real application, you'd implement form submission logic here
    alert(`Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <Head>
        <link rel="canonical" href="https://ventura.dev" />
      </Head>
      
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "ventura.dev",
            "url": "https://ventura.dev",
            "logo": "https://ventura.dev/imgs/me.jpg",
            "image": "https://ventura.dev/imgs/me.jpg",
            "description": "Professional web design and development services in Ventura County. Fast, secure websites built by Cristian Herrera to help local businesses grow online.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ventura",
              "addressRegion": "CA",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "34.2805",
              "longitude": "-119.2945"
            },
            "priceRange": "$$$",
            "telephone": "+1-805-555-5555", // Replace with actual number if available
            "sameAs": [
              "https://github.com/cristianherrera", // Replace with actual social links if available
              "https://linkedin.com/in/cristianherrera"
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "17:00"
            }
          })
        }}
      />

      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Cristian Herrera",
            "jobTitle": "Web Developer & Designer",
            "worksFor": {
              "@type": "Organization",
              "name": "ventura.dev"
            },
            "url": "https://ventura.dev",
            "image": "https://ventura.dev/imgs/me.jpg",
            "sameAs": [
              "https://github.com/cristianherrera", // Replace with actual social links
              "https://linkedin.com/in/cristianherrera"
            ],
            "description": "Ventura County web developer specializing in custom websites and web applications for local businesses."
          })
        }}
      />

      <div className={`${theme.bg.primary} min-h-screen ${theme.text.primary} selection:bg-blue-500 selection:text-white transition-colors duration-300`}>
        {/* Progress bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Header / Hero Section */}
        <motion.header 
          className="fixed w-full z-40 backdrop-blur-lg bg-white/90 transition-colors duration-300"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ventura.dev
            </motion.div>
            <div className="flex items-center space-x-6">
              {/* Dark Mode Toggle - Commented out
              <motion.button
                onClick={toggleDarkMode}
                className={`relative p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: darkMode ? 180 : 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  {darkMode ? (
                    <SunIcon className="w-5 h-5 text-yellow-300" />
                  ) : (
                    <MoonIcon className="w-5 h-5 text-gray-500" />
                  )}
                </motion.div>
              </motion.button>
              */}
              
              <nav className="space-x-6">
                {['About', 'Services', 'Projects', 'Contact'].map((item) => (
                  <motion.a 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    className={`hover:text-indigo-600 transition ${
                      item === 'Contact' ? 
                        `${theme.gradients.primary} text-white px-4 py-2 rounded-md hover:shadow-lg` : 
                        ''
                    }`}
                    whileHover={item !== 'Contact' ? { y: -2 } : { scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section id="about" className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-50 transition-colors duration-300"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-50 transition-colors duration-300"></div>
          
          <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Ventura&apos;s Handcrafted <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                  Web Solutions
                </span>
              </h1>
              <p className={`text-xl ${theme.text.secondary} mb-8 leading-relaxed`}>
                We build lightning-fast websites and custom web applications right here in Ventura County. Fast, local, and focused on what matters to your business.
              </p>
              <motion.a 
                href="#contact" 
                className={`${theme.gradients.primary} text-white px-8 py-4 rounded-full text-lg inline-block shadow-lg shadow-indigo-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Let&apos;s Chat
              </motion.a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full filter blur-3xl opacity-20 animate-pulse transition-colors duration-300" 
                   style={{ animationDuration: '8s' }}></div>
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <Image 
                  src="/api/placeholder/400/400" 
                  alt="Cristian Herrera - Ventura Web Developer and Designer | ventura.dev" 
                  width={320}
                  height={320}
                  className="rounded-full object-cover shadow-2xl border-8 border-white transition-colors duration-300"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-indigo-50 rounded-full filter blur-3xl opacity-70"></div>
          
          <RevealSection className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block text-indigo-600 font-semibold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                What We Build
              </motion.span>
              <h2 className="text-4xl font-bold">Crafted With Care</h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-10">
              {[
                { 
                  Icon: CodeBracketIcon, 
                  title: 'Custom Websites', 
                  description: 'Hand-coded sites that load in under 2 seconds and rank higher in search results. Our optimized code ensures visitors stay engaged and convert at higher rates.' 
                },
                { 
                  Icon: ServerIcon, 
                  title: 'Local Business Apps', 
                  description: 'Specialized tools built for Ventura businesses – from booking to inventory systems. These custom solutions streamline operations and reduce the time spent on administrative tasks.' 
                },
                { 
                  Icon: DevicePhoneMobileIcon, 
                  title: 'Mobile-First Design', 
                  description: 'Sites that work flawlessly on phones, tablets, and desktops – no compromises. We build responsive interfaces that adapt perfectly to every screen size for a seamless user experience.' 
                },
                { 
                  Icon: PaintBrushIcon, 
                  title: 'Performance Optimization', 
                  description: 'Speed up your existing site with our optimization service. Most sites see 50%+ improvements. Fast-loading pages lead to better user experiences, higher conversions, and improved search rankings.' 
                },
                { 
                  Icon: ({ className }: { className: string }) => (
                    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ), 
                  title: 'Conversion Optimization', 
                  description: 'Turn more visitors into customers with data-driven UI/UX enhancements and A/B testing. Our methodical approach identifies exactly what your users respond to, boosting your conversion rates significantly.'
                },
                { 
                  Icon: ({ className }: { className: string }) => (
                    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  ), 
                  title: 'Cloud Infrastructure', 
                  description: 'Fast, reliable hosting with automated backups and enterprise-grade security protocols. Our cloud solutions scale with your business and ensure 99.9% uptime for maximum availability.'
                },
                { 
                  Icon: ({ className }: { className: string }) => (
                    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ), 
                  title: 'Email Marketing', 
                  description: 'Automated campaigns that nurture leads and turn subscribers into paying customers. We create personalized email sequences that deliver the right message at exactly the right time in the customer journey.'
                },
                { 
                  Icon: ({ className }: { className: string }) => (
                    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ), 
                  title: 'Analytics Dashboard', 
                  description: 'Custom reporting with actionable insights to help you make data-driven business decisions. Our intuitive dashboards visualize complex data in ways that make it easy to identify trends and opportunities for growth.'
                }
              ].map((service, index) => (
                <ServiceCard 
                  key={service.title} 
                  Icon={service.Icon} 
                  title={service.title} 
                  description={service.description} 
                  index={index} 
                  theme={theme} 
                />
              ))}
            </div>
          </RevealSection>
        </section>

        {/* About Owner/Developer Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-70"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-100 rounded-full filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>
          
          <RevealSection className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-xl transform rotate-3 w-4/5 mx-auto"></div>
                <div className="overflow-hidden rounded-xl relative shadow-lg border-3 border-white w-4/5 mx-auto">
                  <Image 
                    src="/imgs/me.jpg" 
                    alt="Cristian Herrera - Professional Web Development Services in Ventura County" 
                    width={400}
                    height={480}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                  <h3 className="font-bold text-lg">Cristian Herrera</h3>
                  <p className="text-indigo-600 text-sm">Owner, Lead Developer</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="inline-block text-indigo-600 font-semibold mb-1">What We Offer</span>
                <h3 className="text-3xl font-bold mb-4">The Local Advantage</h3>
                <p className={`${theme.text.secondary} mb-6`}>
                  As a locally owned and operated business, we understand the unique challenges that Ventura County businesses face online. Our mission is to provide hand-crafted web solutions that actually work for your specific needs.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg">100% Secure</h4>
                      <p className={`${theme.text.secondary}`}>Our sites are just static HTML and CSS code, meaning there&apos;s literally nothing that can be hacked.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg">Custom Designed</h4>
                      <p className={`${theme.text.secondary}`}>Our designs are made by an in-house design team, which allows us to make anything we want.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg">100 Pagespeed Scores</h4>
                      <p className={`${theme.text.secondary}`}>Our sites have zero bloat, zero waste, and built with purpose so we get perfect 98-100/100 speed scores with Google.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg">Money Back Guarantee</h4>
                      <p className={`${theme.text.secondary}`}>If we can&apos;t design something you like, you get your money back and the contract is cancelled. We stand by our work.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg">Unmatched Support</h4>
                      <p className={`${theme.text.secondary}`}>Call or text us anytime, no phone trees or robots. When you call us you get me - the owner and developer.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg">We Know SEO</h4>
                      <p className={`${theme.text.secondary}`}>No snake oil, no tricks, no lies. We explain very clearly what SEO is, how it works, and what we can do to get you ranking.</p>
                    </div>
                  </div>
                </div>
                
                <motion.a 
                  href="#contact" 
                  className={`${theme.gradients.primary} text-white px-6 py-3 rounded-md shadow-md inline-flex items-center hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Schedule a Call
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </RevealSection>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-gray-50 relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent transition-colors duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent transition-colors duration-300"></div>
          
          <RevealSection className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block text-indigo-600 font-semibold mb-2 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Recent Work
              </motion.span>
              <h2 className="text-4xl font-bold">Local Success Stories</h2>
            </div>
            
            <ProjectsWithTestimonials theme={theme} />
          </RevealSection>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent"></div>
          
          <RevealSection className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block text-indigo-600 font-semibold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Simple Pricing
              </motion.span>
              <h2 className="text-4xl font-bold mb-4">Transparent & Affordable</h2>
              <p className={`${theme.text.secondary} max-w-2xl mx-auto`}>
                No hidden fees or surprises. Choose the package that fits your needs, or contact us for a custom solution.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Starter Site",
                  price: "$1,499",
                  description: "Perfect for small local businesses just getting started online.",
                  features: [
                    "5-page responsive website",
                    "SEO optimization",
                    "Mobile-first design",
                    "Basic analytics setup",
                    "Contact form"
                  ],
                  cta: "Get Started"
                },
                {
                  title: "Growth Package",
                  price: "$2,999",
                  description: "For established businesses ready to expand their digital presence.",
                  features: [
                    "10-page custom website",
                    "Advanced SEO strategy",
                    "Content management system",
                    "Performance optimization",
                    "Social media integration",
                    "2 months of support"
                  ],
                  cta: "Most Popular",
                  highlighted: true
                },
                {
                  title: "E-commerce Solution",
                  price: "$4,499",
                  description: "Complete online store with everything you need to sell products.",
                  features: [
                    "Full e-commerce platform",
                    "Product management system",
                    "Secure payment processing",
                    "Inventory tracking",
                    "Order management",
                    "3 months of support"
                  ],
                  cta: "Start Selling"
                }
              ].map((plan, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className={`${theme.bg.card} p-6 rounded-xl shadow-md relative border group overflow-visible ${
                    plan.highlighted ? 'border-indigo-400 shadow-xl' : 'border-indigo-100 hover:border-indigo-300'
                  } transition-colors duration-300 ${plan.highlighted ? '' : 'mt-6'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl" />
                  {plan.highlighted && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center z-20">
                      <div className={`${theme.gradients.primary} text-white text-sm font-semibold py-1.5 px-6 rounded-full shadow-md`}>
                        Most Popular
                      </div>
                    </div>
                  )}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                      <div className="text-3xl font-bold mb-2">{plan.price}</div>
                      <p className={`${theme.text.secondary} text-sm`}>{plan.description}</p>
                    </div>
                    <div className="space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <svg className="w-5 h-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 rounded-lg font-medium ${
                        plan.highlighted ? 
                          theme.gradients.primary + ' text-white' : 
                          'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className={`absolute inset-0 ${theme.gradients.secondary} opacity-90 transition-colors duration-300`}></div>
          <div className="absolute inset-0 bg-[url('/api/placeholder/1000/1000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          
          <RevealSection className="container mx-auto px-4 max-w-xl relative z-10">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 transition-colors duration-300">
              <h2 className="text-3xl font-bold text-white text-center mb-4">Ready to Grow Your Business?</h2>
              <p className="text-white/80 text-center mb-8">
                Let&apos;s start with a free 30-minute consultation to understand your goals and see how we can help your Ventura business thrive online.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/90 text-gray-900 backdrop-blur-sm focus:ring-2 focus:ring-white focus:outline-none transition-colors duration-300"
                    required 
                  />
                </motion.div>
                
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/90 text-gray-900 backdrop-blur-sm focus:ring-2 focus:ring-white focus:outline-none transition-colors duration-300"
                    required 
                  />
                </motion.div>
                
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <textarea 
                    placeholder="Tell us about your project" 
                    rows={4} 
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/90 text-gray-900 backdrop-blur-sm focus:ring-2 focus:ring-white focus:outline-none transition-colors duration-300"
                    required
                  ></textarea>
                </motion.div>
                
                <motion.button 
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 text-indigo-600 p-3 rounded-lg hover:shadow-lg transition-colors duration-300 font-medium"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule Your Free Consultation
                </motion.button>
              </form>
            </div>
          </RevealSection>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 relative overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-blue-900/20 transition-colors duration-300"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center space-x-6 mb-6">
              {['LinkedIn', 'GitHub', 'Twitter'].map(platform => (
                <motion.a 
                  key={platform} 
                  href="#" 
                  className="hover:text-blue-400 transition text-gray-300 transition-colors duration-300"
                  whileHover={{ y: -3, color: '#60a5fa' }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {platform}
                </motion.a>
              ))}
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-6 transition-colors duration-300"></div>
            <p className="text-gray-400 transition-colors duration-300">&copy; 2024 Cristian Herrera | ventura.dev. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}