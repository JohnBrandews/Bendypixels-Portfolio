import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Clients from './components/Clients';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Aurora from './components/Aurora.tsx';
import BackToTop from './components/BackToTop.tsx';
import './App.css';

function App() {
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    AOS.init({
      duration: 650,
      offset: isMobile ? 120 : 50,
      easing: 'ease-out',
      // On mobile: animate once to avoid scroll jank and content not showing
      once: isMobile,
      mirror: !isMobile,
    });
    // Re-scan DOM so animations work after mount (not only on full refresh)
    const refreshTimer = setTimeout(() => AOS.refresh(), 100);

    // When navigating via hash links (e.g. FAQ, Contact), AOS can mis-detect visibility
    // after the scroll lands. Refresh AOS so the target section stays visible.
    let hashTimeouts: ReturnType<typeof setTimeout>[] = [];
    const onHashChange = () => {
      hashTimeouts.forEach((id) => clearTimeout(id));
      hashTimeouts = [
        setTimeout(() => AOS.refresh(), 100),
        setTimeout(() => AOS.refresh(), 600),
      ];
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      clearTimeout(refreshTimer);
      hashTimeouts.forEach((id) => clearTimeout(id));
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <div className="app">
      <div className="aurora-background" aria-hidden>
        <Aurora
          colorStops={['#ffffff', '#f0f0f0', '#e8e8e8']}
          blend={0.35}
          amplitude={0.35}
          speed={1}
        />
      </div>
      <div className="page-wrapper">
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        <div className="page-inner">
          <main id="main">
            <Hero />
            <Clients />
            <About />
            <Services />
            <Process />
            <Portfolio />
            <Team />
            <Testimonials />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
        <BackToTop />
      </div>
    </div>
  );
}

export default App;
