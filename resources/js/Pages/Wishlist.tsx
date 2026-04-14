import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { PageProps } from '@/types';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const wishlistItems = [
    {
        id: 1,
        name: 'The Glass Pavilion',
        location: 'Cyberjaya',
        distance: '2.4km from Center',
        price: 'Rp 3.850.000',
        priceNum: 3850000,
        featured: true,
        amenities: ['Pool', 'Gym', 'AC'],
        availability: 'immediate' as const,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm-z0OVumujH35o3gizBY_oaT6RUBAJ_QAbBxZRG-fPNBKoRUC5qpjOD8_NCcyOmW_1aDR3b4yUljrK9plb9uSs5veq-FBaZOr9bdtSC0_Fsqje-OiHkpiheILPZBBWE2WQ6YvdWTDlNvmhlJOef1TJNGmcToafeUJ2gNKOr1uW6vF5SnG_Z2z6W_d8fzszsaOLFeAj1XXYv-Q8Ki8cTK-VAr2jUX2qLrBTOxnTcVzGCMOJPi61YBEEc5xHvoa--fdpY9OVqDXdhc',
    },
    {
        id: 2,
        name: 'Neon Studio',
        location: 'Shah Alam',
        distance: '5.1km',
        price: 'Rp 1.950.000',
        priceNum: 1950000,
        featured: false,
        amenities: ['Fiber WiFi', 'Kitchen'],
        availability: 'next_month' as const,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVQhtDUHzVC3BbiK6YT1ixrcF7JE-vl_vd7pAfJnsjFzj5f3stld1F6sZ4jomiGr9bBxLIxOCfWuxyaiLzjzifBuNPQrYndCYrea6VR4SM0f7mOH_EDgkG3egJafXeqH74WeqFoUBF1FP0LR0uleuETfxWz8JjZAt_nldO98LxCIhfh41ZU4lXHE0-Yyd_OUbqK9eJdRKx94MtE9DLxofoT3sg-qBsjEantC4gH9UQwh8yTCC2Znd2pB0HxyrWAltraPGRb5hp9jI',
    },
    {
        id: 3,
        name: 'Lumina Loft',
        location: 'Bandung',
        distance: '1.8km',
        price: 'Rp 2.400.000',
        priceNum: 2400000,
        featured: false,
        amenities: ['Parking', 'Security'],
        availability: 'waitlist' as const,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm-z0OVumujH35o3gizBY_oaT6RUBAJ_QAbBxZRG-fPNBKoRUC5qpjOD8_NCcyOmW_1aDR3b4yUljrK9plb9uSs5veq-FBaZOr9bdtSC0_Fsqje-OiHkpiheILPZBBWE2WQ6YvdWTDlNvmhlJOef1TJNGmcToafeUJ2gNKOr1uW6vF5SnG_Z2z6W_d8fzszsaOLFeAj1XXYv-Q8Ki8cTK-VAr2jUX2qLrBTOxnTcVzGCMOJPi61YBEEc5xHvoa--fdpY9OVqDXdhc',
    },
];

const availabilityConfig = {
    immediate: { label: 'Immediate', color: 'text-emerald-400', dot: 'bg-emerald-400' },
    next_month: { label: 'Next Month', color: 'text-emerald-400', dot: 'bg-emerald-400' },
    waitlist: { label: 'Waitlist', color: 'text-orange-400', dot: 'bg-orange-400' },
};

// ─── Page Component ───────────────────────────────────────────────────────────
export default function Wishlist(_props: PageProps) {
    const [items, setItems] = useState(wishlistItems);

    const removeItem = (id: number) => setItems(prev => prev.filter(item => item.id !== id));
    const featured = items.find(i => i.featured) ?? items[0];
    const secondary = items.filter(i => i.id !== featured?.id);

    return (
        <>
            <Head title="Wishlist | Kos Sekitar" />
            <Navbar />

            <main className="pt-32 pb-32 px-6 md:px-16 max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-16">
                    <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight mb-4 text-primary">
                        Your Sanctuary{' '}
                        <span className="text-primary-fixed-dim">Collection</span>
                    </h1>
                    <p className="text-on-surface-variant max-w-2xl text-lg">
                        A curated gallery of your future homes. Compare amenities, track pricing, and find your perfect luminous retreat.
                    </p>
                </header>

                {items.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 bg-surface-container-low rounded-[3rem] border-2 border-dashed border-outline-variant/20">
                        <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center text-primary-container/20">
                            <span className="material-symbols-outlined text-6xl">bookmark</span>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-headline font-bold">Your Wishlist is Empty</h3>
                            <p className="text-on-surface-variant max-w-sm mx-auto">
                                Discover beautiful living spaces and save them here for a side-by-side comparison later.
                            </p>
                        </div>
                        <Link
                            href={route('explore')}
                            className="bg-primary-container text-on-primary-fixed px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all active:scale-95"
                        >
                            Start Exploring
                        </Link>
                    </div>
                ) : (
                    <section className="space-y-24">
                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Featured Item */}
                            {featured && (
                                <div className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-surface-container-highest border border-outline-variant/10"
                                    style={{ boxShadow: '0 0 40px -15px rgba(0,243,255,0.3)' }}>
                                    <div className="aspect-[16/9] w-full relative">
                                        <img
                                            src={featured.image}
                                            alt={featured.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-6 right-6">
                                            <button
                                                type="button"
                                                onClick={() => removeItem(featured.id)}
                                                className="bg-surface/80 backdrop-blur-md p-3 rounded-full text-primary-fixed-dim border border-primary-container/20 hover:text-red-400 transition-colors"
                                                aria-label="Remove from wishlist"
                                            >
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-primary-container text-xs font-bold tracking-widest uppercase mb-2 block">Featured Collection</span>
                                                <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">{featured.name}, {featured.location}</h3>
                                                <p className="text-on-surface-variant flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                                    {featured.distance}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-headline font-bold text-primary">{featured.price}</p>
                                                <p className="text-on-surface-variant text-sm">/bulan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Secondary Items */}
                            {secondary.slice(0, 1).map(item => (
                                <div key={item.id} className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-surface-container-highest border border-outline-variant/10">
                                    <div className="aspect-square w-full relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-6 right-6">
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="bg-surface/80 backdrop-blur-md p-3 rounded-full text-primary-fixed-dim hover:text-red-400 transition-colors"
                                                aria-label="Remove from wishlist"
                                            >
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-headline font-bold text-on-surface mb-1">{item.name}</h3>
                                        <p className="text-on-surface-variant text-sm mb-4">{item.location} • {item.distance}</p>
                                        <p className="text-xl font-headline font-bold text-primary">
                                            {item.price} <span className="text-xs font-normal text-on-surface-variant">/mo</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Comparison Table */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-headline font-bold text-on-surface">
                                    Precision <span className="text-primary-container">Comparison</span>
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setItems(wishlistItems)}
                                    className="px-6 py-2 rounded-full border border-primary-container/30 text-primary-container text-sm font-bold hover:bg-primary-container/10 transition-all"
                                >
                                    Reset
                                </button>
                            </div>

                            <div className="overflow-x-auto pb-4">
                                <div
                                    className="min-w-[700px] rounded-3xl overflow-hidden border border-outline-variant/10"
                                    style={{ background: 'rgba(14,60,41,0.4)', backdropFilter: 'blur(24px)' }}
                                >
                                    {/* Header row */}
                                    <div className={`grid gap-px bg-outline-variant/10`}
                                        style={{ gridTemplateColumns: `1fr repeat(${items.length}, 1fr)` }}>
                                        {/* Labels column header */}
                                        <div className="p-6 bg-surface-container-low" />
                                        {items.map((item, idx) => (
                                            <div key={item.id} className={`p-6 bg-surface-container-highest/40 border-l border-outline-variant/10 relative ${idx === 1 ? 'bg-surface-container-highest/60' : ''}`}>
                                                {idx === 1 && (
                                                    <div className="absolute top-0 left-0 w-full h-1 bg-primary-container shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
                                                )}
                                                <h4 className="font-headline font-bold text-primary text-sm">{item.name}</h4>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Data rows */}
                                    {[
                                        {
                                            label: 'Harga/Bulan',
                                            render: (item: typeof items[0]) => (
                                                <p className="text-xl font-headline font-black">{item.price}</p>
                                            ),
                                        },
                                        {
                                            label: 'Jarak',
                                            render: (item: typeof items[0]) => (
                                                <p className="text-on-surface font-medium">{item.distance}</p>
                                            ),
                                        },
                                        {
                                            label: 'Fasilitas',
                                            render: (item: typeof items[0]) => (
                                                <div className="flex flex-wrap gap-2">
                                                    {item.amenities.map(a => (
                                                        <span key={a} className="px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary-fixed-dim text-[10px] font-bold uppercase tracking-tighter">
                                                            {a}
                                                        </span>
                                                    ))}
                                                </div>
                                            ),
                                        },
                                        {
                                            label: 'Ketersediaan',
                                            render: (item: typeof items[0]) => {
                                                const cfg = availabilityConfig[item.availability];
                                                return (
                                                    <p className={`flex items-center gap-2 font-bold text-sm ${cfg.color}`}>
                                                        <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                                                        {cfg.label}
                                                    </p>
                                                );
                                            },
                                        },
                                    ].map(row => (
                                        <div
                                            key={row.label}
                                            className="grid gap-px bg-outline-variant/10 border-t border-outline-variant/10"
                                            style={{ gridTemplateColumns: `1fr repeat(${items.length}, 1fr)` }}
                                        >
                                            <div className="p-6 bg-surface-container-low flex items-center">
                                                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">{row.label}</p>
                                            </div>
                                            {items.map((item, idx) => (
                                                <div key={item.id} className={`p-6 border-l border-outline-variant/10 flex items-center ${idx === 1 ? 'bg-surface-container-highest/60' : 'bg-surface-container-highest/40'}`}>
                                                    {row.render(item)}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-6 pb-8 pt-4 bg-[#00180d]/80 backdrop-blur-2xl rounded-t-[2rem] z-50 shadow-[0_-10px_40px_rgba(0,243,255,0.1)]">
                <Link href={route('home')} className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary-container transition-colors">
                    <span className="material-symbols-outlined">home</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Home</span>
                </Link>
                <Link href={route('explore')} className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary-container transition-colors">
                    <span className="material-symbols-outlined">explore</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Explore</span>
                </Link>
                <Link href={route('wishlist')} className="flex flex-col items-center justify-center bg-primary-container/10 text-primary-container rounded-2xl px-6 py-2">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1">Wishlist</span>
                </Link>
            </nav>
        </>
    );
}
