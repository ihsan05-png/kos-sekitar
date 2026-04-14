import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { PageProps } from '@/types';

export default function Navbar() {
    const { auth } = usePage<PageProps>().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    // Detect current page to highlight active nav link
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
    const isHome = currentUrl === '/';
    const isExplore = currentUrl.startsWith('/explore');
    const isWishlist = currentUrl.startsWith('/wishlist');

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#00180d]/60 backdrop-blur-3xl shadow-[0_0_40px_-15px_rgba(0,243,255,0.2)]">
            <div className="flex justify-between items-center px-6 md:px-8 h-20 w-full">
                {/* Logo */}
                <Link href={route('home')} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-container/30 to-surface-variant flex items-center justify-center border border-primary-container/30">
                        <span className="material-symbols-outlined text-primary-container text-xl">home_work</span>
                    </div>
                    <span className="text-xl md:text-2xl font-bold tracking-tighter text-on-surface font-headline">
                        Kos <span className="text-primary-container">Sekitar</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center space-x-10 font-headline text-sm tracking-wide">
                    <Link
                        href={route('home')}
                        className={`transition-colors duration-300 pb-1 ${
                            isHome
                                ? 'text-primary-container border-b-2 border-primary-container'
                                : 'text-on-surface/70 hover:text-primary-container'
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        href={route('explore')}
                        className={`transition-colors duration-300 pb-1 ${
                            isExplore
                                ? 'text-primary-container border-b-2 border-primary-container'
                                : 'text-on-surface/70 hover:text-primary-container'
                        }`}
                    >
                        Explore
                    </Link>
                    <Link
                        href={route('wishlist')}
                        className={`transition-colors duration-300 pb-1 ${
                            isWishlist
                                ? 'text-primary-container border-b-2 border-primary-container'
                                : 'text-on-surface/70 hover:text-primary-container'
                        }`}
                    >
                        Wishlist
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        className="material-symbols-outlined text-on-surface/70 hover:text-primary-container transition-colors hidden md:block"
                        aria-label="Notifications"
                    >
                        notifications
                    </button>

                    {auth?.user ? (
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('dashboard')}
                                className="bg-surface-variant text-on-surface px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-container/10 hover:text-primary-container transition-all border border-primary-container/20"
                            >
                                Dashboard
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link
                                href={route('login')}
                                className="bg-surface-variant text-on-surface px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-container/10 hover:text-primary-container transition-all border border-primary-container/20"
                            >
                                Sign In
                            </Link>
                            <Link
                                href={route('register')}
                                className="bg-gradient-to-br from-primary-container to-primary-fixed-dim text-on-primary-fixed px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:brightness-110 active:scale-95 duration-200"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-on-surface/70 hover:text-primary-container transition-colors ml-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined">
                            {mobileOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden glass-card border-t border-primary-container/10 px-6 py-6 flex flex-col gap-4">
                    <Link
                        href={route('home')}
                        className={`font-headline font-semibold ${isHome ? 'text-primary-container' : 'text-on-surface/70'}`}
                        onClick={() => setMobileOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href={route('explore')}
                        className={`font-headline font-semibold ${isExplore ? 'text-primary-container' : 'text-on-surface/70'}`}
                        onClick={() => setMobileOpen(false)}
                    >
                        Explore
                    </Link>
                    <Link
                        href={route('wishlist')}
                        className={`font-headline font-semibold ${isWishlist ? 'text-primary-container' : 'text-on-surface/70'}`}
                        onClick={() => setMobileOpen(false)}
                    >
                        Wishlist
                    </Link>
                </div>
            )}
        </nav>
    );
}
