import dynamic from 'next/dynamic';

// Regular imports for components without client-side dependencies
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Dynamic imports for components with client-side dependencies
const Hero = dynamic(() => import('@/components/Hero'), { ssr: true });
const About = dynamic(() => import('@/components/About'), { ssr: true });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: true });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: true });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: true });

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
    </main>
  );
}
