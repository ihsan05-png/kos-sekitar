export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-surface-container-lowest py-20 px-8 border-t border-primary-container/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-container/30 to-surface-variant flex items-center justify-center border border-primary-container/30">
                            <span className="material-symbols-outlined text-primary-container text-lg">home_work</span>
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-primary-container font-headline">
                            Kos Sekitar
                        </span>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                        Elevating the room-finding experience into a luminous journey. Your sanctuary awaits in the deep forest of urban possibilities.
                    </p>
                    {/* Social Links */}
                    <div className="flex gap-4 mt-6">
                        <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 transition-all border border-outline-variant/30">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="Twitter/X" className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 transition-all border border-outline-variant/30">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 transition-all border border-outline-variant/30">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-headline font-bold text-primary-container mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-on-surface-variant text-sm">
                        <li><a href="#" className="hover:text-primary-container transition-colors flex items-center gap-2 group"><span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>Home</a></li>
                        <li><a href="#listings" className="hover:text-primary-container transition-colors flex items-center gap-2 group"><span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>Explore Rooms</a></li>
                        <li><a href="#map" className="hover:text-primary-container transition-colors flex items-center gap-2 group"><span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>Map View</a></li>
                        <li><a href="#" className="hover:text-primary-container transition-colors flex items-center gap-2 group"><span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>Pricing</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-headline font-bold text-primary-container mb-6">Support</h4>
                    <ul className="space-y-4 text-on-surface-variant text-sm">
                        <li><a href="#" className="hover:text-primary-container transition-colors flex items-center gap-2 group"><span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>Help Center</a></li>
                        <li><a href="#" className="hover:text-primary-container transition-colors flex items-center gap-2 group"><span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>Safety Guidelines</a></li>
                        <li><a href="#" className="hover:text-primary-container transition-colors flex items-center gap-2 group"><span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>Terms of Service</a></li>
                        <li><a href="#" className="hover:text-primary-container transition-colors flex items-center gap-2 group"><span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-headline font-bold text-primary-container mb-6">Newsletter</h4>
                    <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                        Get weekly updates on exclusive sanctuaries and new listings.
                    </p>
                    <div className="flex gap-2">
                        <input
                            className="bg-surface-container-high border-none rounded-xl px-4 text-sm w-full focus:ring-1 focus:ring-primary-container text-on-surface placeholder:text-on-surface-variant"
                            placeholder="Email address"
                            type="email"
                        />
                        <button
                            className="bg-primary-container text-on-primary-fixed p-3 rounded-xl hover:brightness-110 active:scale-95 transition-all"
                            aria-label="Subscribe"
                        >
                            <span className="material-symbols-outlined text-xl">send</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-primary-container/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant uppercase tracking-widest font-bold">
                <p>© {year} Kos Sekitar. All Rights Reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-primary-container transition-colors">Instagram</a>
                    <a href="#" className="hover:text-primary-container transition-colors">Twitter</a>
                    <a href="#" className="hover:text-primary-container transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}
