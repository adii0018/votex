import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.guide': 'Voting Guide',
    'nav.timeline': 'Timeline',
    'nav.quiz': 'Quiz',
    'nav.glossary': 'Glossary',
    'nav.eligibility': 'Check Eligibility',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    
    // Auth
    'auth.username': 'Username',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.loginTitle': 'Login to VoteX',
    'auth.registerTitle': 'Create Account',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.loginHere': 'Login here',
    'auth.registerHere': 'Register here',
    
    // Home
    'home.hero.title': 'Know Your Vote. Own Your Democracy.',
    'home.hero.subtitle': 'Your complete guide to voting in India',
    'home.cta.getStarted': 'Get Started',
    'home.cta.learnMore': 'Learn More',
    
    // Footer
    'footer.tagline': 'Empowering Democracy Through Technology',
    'footer.rights': 'All rights reserved.',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.guide': 'मतदान गाइड',
    'nav.timeline': 'समयरेखा',
    'nav.quiz': 'क्विज़',
    'nav.glossary': 'शब्दावली',
    'nav.eligibility': 'पात्रता जांचें',
    'nav.about': 'हमारे बारे में',
    'nav.login': 'लॉगिन',
    'nav.register': 'रजिस्टर',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.logout': 'लॉगआउट',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.submit': 'जमा करें',
    'common.cancel': 'रद्द करें',
    'common.save': 'सहेजें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    
    // Auth
    'auth.username': 'उपयोगकर्ता नाम',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.firstName': 'पहला नाम',
    'auth.lastName': 'अंतिम नाम',
    'auth.loginTitle': 'VoteX में लॉगिन करें',
    'auth.registerTitle': 'खाता बनाएं',
    'auth.forgotPassword': 'पासवर्ड भूल गए?',
    'auth.noAccount': 'खाता नहीं है?',
    'auth.hasAccount': 'पहले से खाता है?',
    'auth.loginHere': 'यहां लॉगिन करें',
    'auth.registerHere': 'यहां रजिस्टर करें',
    
    // Home
    'home.hero.title': 'अपने वोट को जानें। अपने लोकतंत्र के मालिक बनें।',
    'home.hero.subtitle': 'भारत में मतदान के लिए आपकी संपूर्ण गाइड',
    'home.cta.getStarted': 'शुरू करें',
    'home.cta.learnMore': 'और जानें',
    
    // Footer
    'footer.tagline': 'प्रौद्योगिकी के माध्यम से लोकतंत्र को सशक्त बनाना',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('votex_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('votex_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
    ]
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
