import { ReactNode } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

interface MainLayoutProps {
    children: ReactNode;
    /** Page title for <title> tag (without app name suffix) */
    title?: string;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-surface text-on-surface">
            {/* Sticky top navbar */}
            <Navbar />

            {/* Page content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-6 pb-8 pt-4 bg-[#00180d]/80 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,243,255,0.1)] rounded-t-[2rem] z-50">
                <a
                    href="#"
                    className="flex flex-col items-center justify-center bg-primary-container/10 text-primary-container rounded-2xl px-6 py-2"
                >
                    <span className="material-symbols-outlined">home</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Home</span>
                </a>
                <a
                    href="#listings"
                    className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary-container transition-colors"
                >
                    <span className="material-symbols-outlined">explore</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Explore</span>
                </a>
                <a
                    href="#map"
                    className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary-container transition-colors"
                >
                    <span className="material-symbols-outlined">map</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Map</span>
                </a>
                <a
                    href="#"
                    className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary-container transition-colors"
                >
                    <span className="material-symbols-outlined">bookmark</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Wishlist</span>
                </a>
            </nav>
        </div>
    );
}
