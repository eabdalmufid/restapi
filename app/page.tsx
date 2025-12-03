import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function HomePage() {
    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <Hero />
        </div>
    );
}
