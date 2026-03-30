// @ts-nocheck
// src/pages/HomePage.tsx
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PopularDestinations from '../components/PopularDestinations';
import DestinationsByCountry from '../components/DestinationsByCountry';
import ExperienceSection from '../components/ExperienceSection';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <PopularDestinations />
      <DestinationsByCountry />
      <ExperienceSection />
      <CTABanner />
      <Footer />
    </div>
  );
}