import Navbar from '@/components/sections/Landing/Navbar';
import Hero from '@/components/sections/Landing/Hero';
import Features from '@/components/sections/Landing/Features';
import About from '@/components/sections/Landing/About';
import Contact from '@/components/sections/Landing/Contact';
import Footer from '@/components/sections/Landing/Footer';

export default function HomePage() {
    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <Features />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
