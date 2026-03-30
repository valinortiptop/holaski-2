// @ts-nocheck
// src/pages/HomePage.tsx
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import DestinationsSection from '../components/DestinationsSection';
import PackagesSection from '../components/PackagesSection';
import ExperienceSection from '../components/ExperienceSection';
import CTASection from '../components/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <DestinationsSection />
      <PackagesSection />
      <ExperienceSection />
      <CTASection />
    </>
  );
}