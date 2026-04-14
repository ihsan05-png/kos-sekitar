import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Amenity {
    icon: string;
    label: string;
}

interface Property {
    id: number;
    name: string;
    location: string;
    price: string;
    rating: number;
    image: string;
    imageAlt: string;
    amenities: Amenity[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const featuredProperties: Property[] = [
    {
        id: 1,
        name: 'Lumina Suites Central',
        location: 'Jakarta Selatan, Indonesia',
        price: 'Rp 2.5jt',
        rating: 4.9,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIfx6NA8cnss9MC3aloGjhg7F-H-UmFBShAf5btHvr-q7YeIpFPp64Tk7-17u69ur0D8B9CHXIXcrVB2bTi3gP3o34hdrNzJ6Mh7JBmnn6DWj-9KmGniypwH3ghmJBnGNLgyjai9bcbcVijefZ6JvzUcIkMB52_KsfUD7GV8frVFvNVXXsfiDnxc-QS-zZtZJSKvfDoMoZFEF8AqopMW0KSb9J8WPAE8ce9M8dGRZF5Hq9b-JSOwP07C2Q91ryjixJK-LvWYxt_pY',
        imageAlt: 'Modern minimalist studio apartment with floor-to-ceiling windows',
        amenities: [
            { icon: 'wifi', label: 'Fast WiFi' },
            { icon: 'ac_unit', label: 'Full AC' },
        ],
    },
    {
        id: 2,
        name: 'The Green Sanctuary',
        location: 'Dago, Bandung',
        price: 'Rp 1.8jt',
        rating: 4.8,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByh3-e8taeENN02vlbaY4NbC21AnZ2J2xU6dhFF56udDR8oKGhSMH3jLQq-w8MYP7hf8e834i6hvSIH-hdRE-08MOB0N5tVFhj7UJgt-UQbDwJJzbcek1ANVZ_0k1_0X7tCP7bRZ34_lpD_EGGke0bcJCsGCvVGryR-EjMZnPnO2BEuLkz8ojxbvhV-7MYXKThgW1-fLyYmIKvqPdeacLxlGcXuzVE2SkZwDZFU3BwLzm6k-oDwE0R7N7nrhD7RyS_Zrm5u-aFBwg',
        imageAlt: 'Contemporary urban loft with industrial concrete walls and warm wooden floors',
        amenities: [
            { icon: 'local_parking', label: 'Parking' },
            { icon: 'bathroom', label: 'Private' },
        ],
    },
    {
        id: 3,
        name: 'Zenith Heights Studio',
        location: 'Setiabudi, Jakarta',
        price: 'Rp 3.2jt',
        rating: 5.0,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsbTzgD1gQbawjEeHF6fLzPZXlMhkY-0b9ZTcaUlzg8SS6VilvlOZEWsQM92L_maQLDnDNTwrRgADu3Dk8xBX-MqEVFBMTzIzgAwS2bCJJFSsIBz4_6sFn-aS04Djo-XAnE_RfXa_VSQEjrsE_XqbXPxX_A-jJP_OSoa3VVIHgVdcPHLmC_jo0isn_gNCeCSJKZ0xTIZVSyvZgo4hEXnP7qkp8DlMzQBooE9XvKcOvV8fdae6T_6kujVG1QrfE3esYxnjke0np1pQ',
        imageAlt: 'Cozy bohemian style bedroom with soft textiles and indoor plants',
        amenities: [
            { icon: 'pool', label: 'Pool' },
            { icon: 'fitness_center', label: 'Gym' },
        ],
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function PropertyCard({ property }: { property: Property }) {
    return (
        <div className="group relative bg-surface-container-highest rounded-[2rem] overflow-hidden neon-border-top neon-glow transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-5px_rgba(0,243,255,0.4)]">
            {/* Image */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src={property.image}
                    alt={property.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Rating badge */}
                <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-primary-container flex items-center gap-1">
                    <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        star
                    </span>
                    {property.rating.toFixed(1)}
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline text-xl font-bold text-on-surface">{property.name}</h3>
                    <span className="text-primary-container font-headline text-xl font-bold whitespace-nowrap">
                        {property.price}
                        <span className="text-xs text-on-surface-variant font-normal">/mo</span>
                    </span>
                </div>

                <p className="text-on-surface-variant text-sm mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {property.location}
                </p>

                {/* Amenities */}
                <div className="flex gap-3 mb-8 flex-wrap">
                    {property.amenities.map((amenity) => (
                        <div
                            key={amenity.label}
                            className="bg-tertiary-container/10 border border-tertiary-fixed/10 px-3 py-1.5 rounded-lg flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
                                {amenity.icon}
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface">
                                {amenity.label}
                            </span>
                        </div>
                    ))}
                </div>

                <button className="w-full bg-surface-variant border border-primary-container/30 text-primary-container py-4 rounded-xl font-bold hover:bg-primary-container hover:text-on-primary-fixed transition-all active:scale-[0.98] duration-200">
                    View Details
                </button>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home({ auth }: PageProps) {
    return (
        <MainLayout>
            <Head title="Home – Find Your Next Kos" />

            {/* ── Hero Section ─────────────────────────────────────────── */}
            <section className="relative pt-40 pb-32 px-8 overflow-hidden min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
                {/* Ambient glow backgrounds */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-surface-variant/40 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-surface-variant/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 bg-surface-container border border-primary-container/20 rounded-full px-5 py-2 mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-primary-container font-label">
                            1,200+ Kos Listed
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-primary mb-8 leading-[0.9]">
                        Find Your Next Room,
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-tertiary-fixed">
                            Right Around the Corner!
                        </span>
                    </h1>

                    <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        Discover comfortable boarding rooms near your campus or workplace. Search, compare, and book in minutes.
                    </p>

                    {/* Search well */}
                    <div className="glass-card p-2 rounded-full max-w-3xl mx-auto flex items-center border border-primary-container/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="flex-1 flex items-center px-6">
                            <span className="material-symbols-outlined text-primary-container mr-3">search</span>
                            <input
                                id="search-input"
                                className="bg-transparent border-none focus:ring-0 text-on-surface w-full placeholder:text-on-surface-variant font-body text-base"
                                placeholder="Where would you like to stay?"
                                type="text"
                            />
                        </div>
                        <div className="h-8 w-px bg-outline-variant/30" />
                        <button className="flex items-center px-6 text-primary-container font-semibold hover:text-white transition-colors gap-2">
                            <span className="material-symbols-outlined">my_location</span>
                            <span className="hidden sm:inline text-sm font-bold">Near Me</span>
                        </button>
                        <button
                            id="search-btn"
                            className="bg-primary-container text-on-primary-fixed px-8 md:px-10 py-4 rounded-full font-bold text-base hover:brightness-110 active:scale-95 transition-all"
                        >
                            Search
                        </button>
                    </div>

                    {/* Popular tags */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-label uppercase tracking-widest text-on-surface-variant">
                        <span className="bg-surface-container border border-outline-variant/30 rounded-full px-4 py-1.5 hover:border-primary-container/40 hover:text-primary-container cursor-pointer transition-all">Jakarta Pusat</span>
                        <span className="bg-surface-container border border-outline-variant/30 rounded-full px-4 py-1.5 hover:border-primary-container/40 hover:text-primary-container cursor-pointer transition-all">Bandung City</span>
                        <span className="bg-surface-container border border-outline-variant/30 rounded-full px-4 py-1.5 hover:border-primary-container/40 hover:text-primary-container cursor-pointer transition-all">Yogyakarta</span>
                        <span className="bg-surface-container border border-outline-variant/30 rounded-full px-4 py-1.5 hover:border-primary-container/40 hover:text-primary-container cursor-pointer transition-all">Surabaya</span>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant/40 animate-bounce">
                    <span className="text-xs uppercase tracking-widest font-bold">Scroll</span>
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                </div>
            </section>

            {/* Stats bar */}
            <section className="py-12 px-8 border-y border-primary-container/5 bg-surface-container-low/50">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: '1,200+', label: 'Active Listings', icon: 'home_work' },
                        { value: '50+', label: 'Cities Covered', icon: 'location_city' },
                        { value: '8,500+', label: 'Happy Tenants', icon: 'people' },
                        { value: '4.9★', label: 'Average Rating', icon: 'star' },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                            <span className="material-symbols-outlined text-primary-container text-3xl">{stat.icon}</span>
                            <span className="font-headline text-2xl font-extrabold text-on-surface">{stat.value}</span>
                            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Featured Listings ────────────────────────────────────── */}
            <section id="listings" className="px-8 py-32 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-primary-container font-label uppercase tracking-widest text-xs font-bold">
                            Curated Sanctuary
                        </span>
                        <h2 className="font-headline text-4xl md:text-5xl font-bold mt-2 text-on-surface">
                            Top-Rated Properties
                        </h2>
                    </div>
                    <button className="text-primary-container flex items-center gap-2 group font-bold text-sm">
                        View all listings
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </section>

            {/* ── Categories / Filter ──────────────────────────────────── */}
            <section className="px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-primary-container font-label uppercase tracking-widest text-xs font-bold">Browse By</span>
                        <h2 className="font-headline text-3xl md:text-4xl font-bold mt-2 text-on-surface">Room Type</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Kos Putra', icon: 'man', desc: 'For male tenants' },
                            { label: 'Kos Putri', icon: 'woman', desc: 'For female tenants' },
                            { label: 'Kos Campur', icon: 'groups', desc: 'Mixed boarding' },
                            { label: 'Kos Premium', icon: 'hotel', desc: 'Full facilities' },
                        ].map((cat) => (
                            <button
                                key={cat.label}
                                className="glass-card rounded-2xl p-6 flex flex-col items-center gap-3 border border-primary-container/10 hover:border-primary-container/40 hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary-container/10 flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
                                    <span className="material-symbols-outlined text-primary-container text-3xl">{cat.icon}</span>
                                </div>
                                <div className="text-center">
                                    <p className="font-headline font-bold text-on-surface text-sm">{cat.label}</p>
                                    <p className="text-on-surface-variant text-xs mt-1">{cat.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Map / CTA Section ─────────────────────────────────────── */}
            <section id="map" className="px-8 pb-32">
                <div className="max-w-7xl mx-auto glass-card rounded-[3rem] p-10 md:p-12 relative overflow-hidden border border-primary-container/5">
                    {/* Background glow */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        {/* Text */}
                        <div>
                            <span className="text-primary-container font-label uppercase tracking-widest text-xs font-bold">
                                Location Intelligence
                            </span>
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 mt-2 text-on-surface">
                                Explore the Neighborhood
                            </h2>
                            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                                Find the perfect location based on your commute, favorite cafes, and essential amenities. Our interactive sanctuary map highlights the best spots for your new home.
                            </p>
                            <div className="space-y-5 mb-10">
                                {[
                                    { icon: 'directions_walk', label: '100+ Walkable Properties' },
                                    { icon: 'train', label: 'Near Public Transits' },
                                    { icon: 'restaurant', label: 'Close to Dining & Cafes' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container flex-shrink-0">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <span className="font-medium text-on-surface">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                id="explore-map-btn"
                                className="bg-gradient-to-r from-primary-container to-primary-fixed-dim text-on-primary-fixed px-10 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(0,243,255,0.2)] hover:brightness-110 active:scale-95 transition-all"
                            >
                                Explore Map
                            </button>
                        </div>

                        {/* Map placeholder */}
                        <div className="h-[380px] md:h-[420px] rounded-[2rem] bg-surface-container-high relative border border-primary-container/10 overflow-hidden shadow-2xl">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2aSoSbxkHFkDHEEwl6KqSoKNhlkedBpZICKMYzdPlnXO_7PQ9le_Gig1uqC6OnKkMjzs-mP_NJGw69GqXZgQLzqI5kpFvH5v1S3BVtbgOL9Qwf70gY7EzzkyefQP9HjSNMqutHQlqTWjPnzgS20rzymJT8dZRkYdZxkK-zoK7hmn2qMTZpS4cZGYiFRgj_pqGk-ndrln1ZRWQxhXDTk8EQqZTEDO0_hcytbxPE1fKnzIUJa99V9jfrlE_7U_9-mkJtG2kfKyP1NQ"
                                alt="City map with location markers"
                                className="w-full h-full object-cover opacity-60 grayscale brightness-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                            {/* Pulsing location pin */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-primary-container/30 animate-ping scale-150" />
                                    <div className="relative w-16 h-16 bg-primary-container rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.5)]">
                                        <span className="material-symbols-outlined text-on-primary-fixed text-3xl">location_searching</span>
                                    </div>
                                </div>
                            </div>
                            {/* Floating cards */}
                            <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                                <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3 border border-primary-container/20 flex-1">
                                    <span className="material-symbols-outlined text-primary-container text-lg">place</span>
                                    <div>
                                        <p className="text-on-surface text-xs font-bold">Jakarta Selatan</p>
                                        <p className="text-on-surface-variant text-[10px]">12 kos available</p>
                                    </div>
                                </div>
                                <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3 border border-primary-container/20 flex-1">
                                    <span className="material-symbols-outlined text-tertiary-fixed text-lg">place</span>
                                    <div>
                                        <p className="text-on-surface text-xs font-bold">Depok</p>
                                        <p className="text-on-surface-variant text-[10px]">8 kos available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why Choose Us ─────────────────────────────────────────── */}
            <section className="px-8 pb-32">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <span className="text-primary-container font-label uppercase tracking-widest text-xs font-bold">Why Kos Sekitar</span>
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mt-2 text-on-surface">Built for Your Comfort</h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: 'verified',
                            title: 'Verified Listings',
                            desc: 'Every property is manually verified by our team before being listed. Zero scam, zero frustration.',
                        },
                        {
                            icon: 'location_on',
                            title: 'Location-First Search',
                            desc: 'Find kos within walking distance using our smart geospatial search engine powered by real coordinates.',
                        },
                        {
                            icon: 'support_agent',
                            title: '24/7 Support',
                            desc: 'Our sanctuary support team is always available to help you find the perfect room and settle in smoothly.',
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="glass-card rounded-3xl p-8 border border-primary-container/10 hover:border-primary-container/30 transition-all hover:-translate-y-1 duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary-container/15 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary-container text-3xl">{feature.icon}</span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-on-surface mb-3">{feature.title}</h3>
                            <p className="text-on-surface-variant leading-relaxed text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA Banner ────────────────────────────────────────────── */}
            <section className="px-8 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-surface-container-high to-surface-variant p-12 md:p-16 text-center border border-primary-container/10">
                        <div className="absolute inset-0 bg-primary-container/5 pointer-events-none" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary-container/10 blur-[80px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <span className="material-symbols-outlined text-primary-container text-5xl mb-4 block">apartment</span>
                            <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface mb-4">
                                List Your Property
                            </h2>
                            <p className="text-on-surface-variant text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                                Are you a kos owner? Reach thousands of potential tenants in your area. Register for free and start earning today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-gradient-to-r from-primary-container to-primary-fixed-dim text-on-primary-fixed px-10 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(0,243,255,0.2)] hover:brightness-110 active:scale-95 transition-all inline-block"
                                >
                                    Start for Free
                                </Link>
                                <button className="bg-surface-variant border border-primary-container/30 text-primary-container px-10 py-4 rounded-full font-bold hover:bg-primary-container/10 transition-all active:scale-95">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom padding for mobile nav */}
            <div className="md:hidden h-24" />
        </MainLayout>
    );
}
