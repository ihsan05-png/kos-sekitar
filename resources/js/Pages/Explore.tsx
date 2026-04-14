import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { PageProps } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Amenity {
    label: string;
    featured?: boolean;
}

interface Listing {
    id: number;
    name: string;
    location: string;
    price: string;
    image: string;
    imageAlt: string;
    amenities: Amenity[];
    isSelected?: boolean;
    badge?: string;
    isFavorited?: boolean;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const listings: Listing[] = [
    {
        id: 1,
        name: 'The Emerald Suite',
        location: 'Kuningan, South Jakarta',
        price: 'Rp 3.8jt',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYBBB0CKZBQguhpszChjJ4LH2ibHE4usIL3XXKz3dFqB6TupukBm1bazBsW3GSxBhCCH9PNUyF4uz83GR6yfSbzd03Ie5SfS03okulyGhjNgpe6TDT2quThL-CweCeHmLunxvG-w81mWD-BBAZnpLN632OohGw3WR83GxeNEbyb6ExVNj7mvNvADNyaVbt5ZvGFXidWU40CXhEzEPbTVFpu1bSmyqZ-naBcdepV3-5LtBuobZdq2cewkO_4G7wWHO71yB9qGmtZQc',
        imageAlt: 'Modern minimalist bedroom with emerald green velvet headboard',
        amenities: [
            { label: 'WIFI 6', featured: true },
            { label: 'AC', featured: true },
            { label: 'ENSUITE BATH', featured: true },
        ],
        isSelected: true,
        badge: 'Top Rated',
        isFavorited: true,
    },
    {
        id: 2,
        name: 'Cyan Loft Living',
        location: 'Setiabudi, Jakarta',
        price: 'Rp 2.5jt',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyMBflx5JG4oNCqRJJd9ccabA18NewMmkZw3tGvUkfscyB0Q8TaOKOe5ILOoNpq7FivDWOdDYU40-8dqhkXygteFBOlJWEflkcKKtTCm0kSATKYO0SQSwJTItT69tM2xQxXo14rfRcAlbXHoazj0RU-VwKKW53CgX667WoddW61yfTGv-9mYFauYTUXLJ4tKIt-_t4xc6bnD9iXoK9UjFmLwDhhBRn2sf-Q68TKKWcdmFpw5PgA1Ja70ojXpkd6lEE6jHWCw01N8s',
        imageAlt: 'Chic small studio room with industrial style',
        amenities: [
            { label: 'CO-WORKING' },
            { label: 'GYM' },
        ],
        isFavorited: false,
    },
    {
        id: 3,
        name: 'Forest Edge Sanctuary',
        location: 'BSD City, Tangerang',
        price: 'Rp 1.9jt',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0konT-uwZtxX4WS4yy_JFNmTepn-RZiFic_oILz61dnHYS4q9Lv94p2ITk-Q4v2_QrdDuWOBhFxzTmGKrI0HdqpiWGPF3WyBrpGGk4RRk9m0xVNwRiLWfR80HFWWwKdMDIrdAa10ywRj2EGVa4ZscwD7ggu6MdbJuD5HkVi672JpjEQspYinFgvOXDSJvHmbPyyDKPmIYkadUWyK6LjsYxt_ZIDAmAkfBF5t78UbbetgrOjLwr0dCpamQDhbIVu3z2_7Tnm8xpUk',
        imageAlt: 'Bright and airy attic room with skylights',
        amenities: [
            { label: 'PARKING' },
            { label: 'POOL' },
        ],
        isFavorited: false,
    },
];

const mapPins = [
    { id: 1, price: 'Rp 3.8jt', top: '42%', left: '45%', active: true },
    { id: 2, price: 'Rp 2.5jt', top: '35%', left: '38%', active: false },
    { id: 3, price: 'Rp 4.2jt', bottom: '40%', right: '35%', active: false },
    { id: 4, price: 'Rp 5.5jt', top: '25%', right: '40%', active: false },
];

// ─── Listing Card ─────────────────────────────────────────────────────────────
function ListingCard({ listing }: { listing: Listing }) {
    const [favorited, setFavorited] = useState(listing.isFavorited);

    return (
        <Link
            href={route('kos.detail', { id: listing.id })}
            className={`group relative rounded-3xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 cursor-pointer block ${
                listing.isSelected
                    ? 'bg-surface-container-highest border-2 border-primary-container shadow-[0_0_30px_rgba(0,243,255,0.15)]'
                    : 'bg-surface-container-low border border-outline-variant/10 hover:border-primary-container/30'
            }`}
        >
            <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="w-full md:w-2/5 relative h-44 md:h-auto flex-shrink-0">
                    <img
                        src={listing.image}
                        alt={listing.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {listing.badge && (
                        <div className="absolute top-3 left-3 bg-primary-container/90 backdrop-blur text-on-primary-fixed px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                            {listing.badge}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-headline font-bold text-lg text-on-surface leading-tight">
                                {listing.name}
                            </h3>
                            {/* Favorite — stop propagation agar tidak memicu navigasi */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setFavorited(!favorited);
                                }}
                                className={`transition-colors ml-2 flex-shrink-0 z-10 relative ${
                                    favorited ? 'text-primary-container' : 'text-on-surface-variant hover:text-primary-container'
                                }`}
                                aria-label="Toggle favorite"
                            >
                                <span
                                    className="material-symbols-outlined"
                                    style={favorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
                                >
                                    favorite
                                </span>
                            </button>
                        </div>
                        <p className="text-sm text-on-surface-variant flex items-center gap-1 mb-4">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            {listing.location}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {listing.amenities.map((a) => (
                                <span
                                    key={a.label}
                                    className={`px-2 py-1 text-[10px] font-bold rounded ${
                                        a.featured
                                            ? 'bg-tertiary-container/10 text-tertiary-fixed-dim border border-tertiary-fixed-dim/20'
                                            : 'bg-surface-container-highest text-on-surface-variant'
                                    }`}
                                >
                                    {a.label}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-2xl font-black text-primary-container">{listing.price}</span>
                            <span className="text-xs text-on-surface-variant">/month</span>
                        </div>
                        <span
                            className={`px-5 py-2 font-bold rounded-full text-sm transition-all ${
                                listing.isSelected
                                    ? 'bg-primary-container text-on-primary-fixed group-hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                                    : 'border border-primary-container/30 text-primary-container group-hover:bg-primary-container/10'
                            }`}
                        >
                            {listing.isSelected ? 'Book Now' : 'View Details'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Explore(_props: PageProps) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <Head title="Explore – Find Kos Near You" />

            {/* Shared Navbar */}
            <Navbar />

            {/* Full-height split layout below navbar */}
            <div className="h-screen flex flex-col bg-surface overflow-hidden">
                {/* Spacer for fixed navbar */}
                <div className="h-20 flex-shrink-0" />

                {/* Main content */}
                <main className="flex-1 flex overflow-hidden min-h-0">

                    {/* ── Left: Map ─────────────────────────────────────── */}
                    <section className="hidden lg:block lg:w-1/2 xl:w-3/5 relative bg-surface-container-lowest overflow-hidden">
                        {/* Map background */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAneyN-bKdV_oZ141OYnArHEmFAwuZqCRqd8jvoLeQfaITCwP7MN69sPdB3GrwcnbfC1XAcKHLZUScHVc2WeSCUY2F05MVLQoFor0jzwPoJpRpfjvxbR9vuGWZKoBgyewEFa1Y9I5Tu9atB8yWkKTro6L9Tm8RGS3el7vVASlTOUyF4jSqQjNMbHLPgGNccyGzMF6cGvpB3rDO6gjFbEp-5vYKYl92csyP91QJtGTpm4Nc2BfmBw77Xinev4SBVsx4JmPNqAsx3unA"
                                alt="Dark mode map of Jakarta"
                                className="w-full h-full object-cover scale-110"
                                style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(0.5) contrast(1.2) saturate(0.5)' }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-[#00180d]/40 pointer-events-none" />
                            {/* Grid dots */}
                            <div
                                className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(#00f3ff 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}
                            />
                        </div>

                        {/* Map Pins */}
                        {mapPins.map((pin) => (
                            <div
                                key={pin.id}
                                className="absolute group cursor-pointer z-10"
                                style={{
                                    top: pin.top,
                                    left: pin.left,
                                    bottom: (pin as any).bottom,
                                    right: (pin as any).right,
                                }}
                            >
                                <div className="relative flex flex-col items-center">
                                    {pin.active ? (
                                        <>
                                            <div className="bg-primary-container text-on-primary-fixed px-4 py-1.5 rounded-full font-bold shadow-[0_0_25px_rgba(0,243,255,0.6)] flex items-center gap-1 group-hover:scale-110 transition-transform border border-primary-container">
                                                <span className="text-xs font-black tracking-tight">{pin.price}</span>
                                            </div>
                                            <div className="w-1 h-3 bg-gradient-to-b from-primary-container to-transparent shadow-[0_5px_15px_rgba(0,243,255,0.4)]" />
                                            <div className="absolute -inset-2 rounded-full border border-primary-container/40 animate-ping opacity-20" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-surface-variant/90 backdrop-blur-md text-primary-container px-3 py-1 rounded-full font-bold border border-primary-container/40 flex items-center gap-1 group-hover:bg-primary-container group-hover:text-on-primary-fixed transition-all">
                                                <span className="text-xs">{pin.price}</span>
                                            </div>
                                            <div className="w-0.5 h-3 bg-surface-variant mx-auto" />
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Area label */}
                        <div className="absolute top-8 left-8 z-10">
                            <div className="glass-card border border-outline-variant/20 px-4 py-2 rounded-2xl flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                                <span className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">
                                    South Jakarta • Kuningan District
                                </span>
                            </div>
                        </div>

                        {/* Map Controls */}
                        <div className="absolute bottom-12 right-8 flex flex-col gap-2 z-20">
                            <div className="flex flex-col rounded-xl overflow-hidden glass-card border border-outline-variant/20">
                                <button className="w-12 h-12 flex items-center justify-center text-on-surface hover:text-primary-container hover:bg-white/5 transition-colors border-b border-outline-variant/10" aria-label="Zoom in">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                                <button className="w-12 h-12 flex items-center justify-center text-on-surface hover:text-primary-container hover:bg-white/5 transition-colors" aria-label="Zoom out">
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                            </div>
                            <button className="w-12 h-12 glass-card border border-outline-variant/20 rounded-xl flex items-center justify-center text-on-surface hover:text-primary-container transition-colors mt-2" aria-label="My location">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>my_location</span>
                            </button>
                            <div className="mt-4 glass-card border border-outline-variant/20 rounded-xl p-1">
                                <button className="w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-primary-container transition-colors" aria-label="Map layers">
                                    <span className="material-symbols-outlined">layers</span>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* ── Right: Listings Panel ─────────────────────────── */}
                    <section className="w-full lg:w-1/2 xl:w-2/5 flex flex-col bg-surface border-l border-outline-variant/10 min-h-0">
                        {/* Filter header */}
                        <div className="p-6 space-y-4 bg-surface-container-low shadow-lg relative z-20 flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-bold font-headline text-on-surface">
                                    Explore Sanctuary
                                </h1>
                                <span className="text-sm text-on-surface-variant">248 results found</span>
                            </div>

                            {/* Search (mobile) */}
                            <div className="lg:hidden relative flex items-center bg-surface-container px-4 py-2.5 rounded-full border border-outline-variant/20">
                                <span className="material-symbols-outlined text-primary-container text-xl">search</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-on-surface-variant w-full ml-2"
                                    placeholder="Search areas..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Filter pills */}
                            <div className="flex flex-wrap gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest border border-primary-container/20 rounded-full text-sm font-medium text-primary-container hover:bg-primary-container/10 transition-colors">
                                    <span>Price: Rp 1jt - 5jt</span>
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full text-sm font-medium text-on-surface-variant border border-outline-variant/30 hover:border-primary-container/50 transition-colors">
                                    <span>All Genders</span>
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-full text-sm font-medium text-on-surface-variant border border-outline-variant/30 hover:border-primary-container/50 transition-colors">
                                    <span>Luxury Suite</span>
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                                <button
                                    className="w-10 h-10 flex items-center justify-center bg-surface-container-highest rounded-full border border-outline-variant/30 text-on-surface hover:border-primary-container transition-colors"
                                    aria-label="More filters"
                                >
                                    <span className="material-symbols-outlined">tune</span>
                                </button>
                            </div>
                        </div>

                        {/* Scrollable listings */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-5 min-h-0 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-primary-container/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                            {listings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                            {/* Bottom spacer for mobile nav */}
                            <div className="h-4 md:hidden" />
                        </div>
                    </section>
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-6 pb-8 pt-4 bg-[#00180d]/80 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,243,255,0.1)] rounded-t-[2rem] z-50">
                <Link href={route('home')} className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary-container transition-colors">
                    <span className="material-symbols-outlined">home</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Home</span>
                </Link>
                <a href="#" className="flex flex-col items-center justify-center bg-primary-container/10 text-primary-container rounded-2xl px-6 py-2">
                    <span className="material-symbols-outlined">explore</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Explore</span>
                </a>
                <a href="#" className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary-container transition-colors">
                    <span className="material-symbols-outlined">bookmark</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Wishlist</span>
                </a>
            </nav>

            {/* Mobile FAB */}
            <button className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary-container text-on-primary-fixed rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-90 duration-200" aria-label="Filters">
                <span className="material-symbols-outlined">tune</span>
            </button>
        </>
    );
}
