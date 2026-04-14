import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { PageProps } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Amenity {
    icon: string;
    label: string;
    detail: string;
}

interface KosDetailProps {
    id: number;
    name: string;
    location: string;
    rating: number;
    reviewCount: number;
    price: string;
    priceNum: number;
    serviceFee: number;
    description: string;
    images: string[];
    amenities: Amenity[];
    hostName: string;
    hostImage: string;
    hostResponseTime: string;
    nearbyPOIs: { name: string; duration: string }[];
    mapImage: string;
}

// ─── Static Mock Data ─────────────────────────────────────────────────────────
const mockKosData: Record<number, KosDetailProps> = {
    1: {
        id: 1,
        name: 'The Emerald Suite',
        location: 'Kuningan, South Jakarta',
        rating: 4.9,
        reviewCount: 124,
        price: 'Rp 3.8jt',
        priceNum: 3800000,
        serviceFee: 150000,
        description:
            'Experience the pinnacle of urban living in this eco-conscious sanctuary. Nestled in the heart of Kuningan, The Emerald Suite offers a rare fusion of metropolitan convenience and serene natural aesthetics. Every corner is curated with sustainable materials and smart home technology to ensure your stay is as responsible as it is luxurious.',
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAKWHIDhG2n_cW5_GqZiZscYSb8znv92Qq1RGkxgtF-_cQs9ZXUq_L9B-AkiileVcAtj3Po_VKCsxVOQvPUEvkOn5FjfrNZsKx4SKcV5qjRUGiEhPXQ80Koy6PavOYUfyyBMlRF25ZA2g0SkulrzProm91jxh89qgJBfx96xRb4CBdtJ2StR102U4q0ZfiSRcpQSwIqgrmMcRXeQclmFD3gm0SbB-ZEW6Ss5wH3eJ3F8qW-ohPNL8dPVj_rzQU2nu3CoSCrEFZxXV0',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAJWg9_A2HiUaoklh3_ALwMDRcSdr3liC9WZt44mJ3sgic49vfWwR3ZCZxofnb4iRkXWUBfBYYjmfifU12HgNhyG6Z1UPe3kKyytRTjdk2t__9p8llQtbtMZNmxGmbVVVmF2dGFR9gL7WRK0609fxQpkpGTT17odhaQJ4fVCfbmK9mMEW6B1EOym9-8swZaPg-rublE-RBnFMRprsX3T3a82mv4LUo_MmOlqFlD6xTpdvhk92II5Zin6VZxeSS3phm8WR3BNvsDbyc',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAmJ8ZkdBNiwZdguakrSpEKR_A06IV9UvJh76EEn0vc4JwAivBFKJ3gT-x3tq2ehVSjC3fQm8a_CSGU5UEx1maG_BT8rhL0-QpavAHXL30sOgTwWrkMgZ-RiqKXYV-RNrk0uo4GV44s8aLN3Qn7BZhVYXcAdBGfmroPzolEgOLPHf-qRuzWih170O6nvVDekxZV0zMUUITirFtLGq5PJ3haJ3CzTmwXkhyQfR9fq9gPg5Xn0wk_baPWRQQN8snkfQ9ce3eN6gTSUeg',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCDtNXRP1trTjqHoGp_2-P1qBoj8-g9tDrt0DpnR4RYXZ7ceVnHH3CYOXyosQXcRgQlneTddaC-9-a2YfstWDoHP8nvpQx4GX_6rqvnDrIiIY7fDnQqMa1AEYwwV4iW0w7rlKDCpUmGzxakdn1-1Df_zj0vbZyPDye978t5AF7Z11jmw_p3HtPCpF2LHKK4tVVjFNT9NkKJk0-Dvz4M6h2EAShtotX5ViEqn3KGnNRwIyhHZaexLCm2Qsnf_52BHDQ_YmOVc8fITkc',
        ],
        amenities: [
            { icon: 'wifi', label: 'High-speed WiFi', detail: 'Dedicated 100Mbps' },
            { icon: 'ac_unit', label: 'Air Conditioning', detail: 'Climate controlled' },
            { icon: 'countertops', label: 'Private Kitchen', detail: 'Full equipment' },
            { icon: 'fitness_center', label: 'Gym Access', detail: '24/7 Membership' },
            { icon: 'local_laundry_service', label: 'Laundry', detail: 'In-unit washer' },
            { icon: 'security', label: '24/7 Security', detail: 'Biometric entry' },
        ],
        hostName: 'Lumina Management',
        hostImage:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAia7FN1RSoM7Ik5eFs8bx2K4TskapaS7uhC19RWONJaosqVmChEFrRAZ8xVtmG5stYGXBbly8XvT2Yy8mqedFmRECcFxoAzxK7wlOyGobtDnMrxlY_81D6OVWOvqVk8vBaJOGhAfrm9oJ7bbPGZqnlaEOv0vKenTALfSBHUiGFkfZT-hAy1OrvUg89fR5A-e4m3INsx-etPjwLzT4rvf8TeE_zj3VcozQIm0h4wV6mdKwiVxXOC1jl9AEOe4MRpjmDZTADDKrN-AQ',
        hostResponseTime: 'Under 10 minutes',
        nearbyPOIs: [
            { name: 'SCBD District', duration: '8 min' },
            { name: 'MRT Kuningan', duration: '3 min' },
        ],
        mapImage:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDWJ4Ype26Dn3guEDATPQAC25hViTTcBqKcD9u89Tc2-n4BmXUsqJc3IxjaIA7xS4nSCtZ0AGI-8T4oxMZs8YlqYii17y_MnUlriZKwn50cwLvMVW-fIPg3mS6zwrZ8Zo1zP2DOijWeacCNeoEySvA6mXSnPtJjYZIpF2WQJf7q80-SRId0EoTkR_NYBA2mEfH1YSqpOxPUA_2-mLd4xr8i0fPOAz-JyHY2ZZxGUhzjt2l7-OIlskJWG8MLSl6v7H3xpWLYCZCsgMo',
    },
    2: {
        id: 2,
        name: 'Cyan Loft Living',
        location: 'Setiabudi, Jakarta',
        rating: 4.8,
        reviewCount: 98,
        price: 'Rp 2.5jt',
        priceNum: 2500000,
        serviceFee: 120000,
        description:
            'A sleek urban retreat nestled in the vibrant Setiabudi district. Cyan Loft Living combines industrial chic design with co-working amenities, making it perfect for young professionals and digital nomads seeking a productive yet stylish sanctuary in the heart of Jakarta.',
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCyMBflx5JG4oNCqRJJd9ccabA18NewMmkZw3tGvUkfscyB0Q8TaOKOe5ILOoNpq7FivDWOdDYU40-8dqhkXygteFBOlJWEflkcKKtTCm0kSATKYO0SQSwJTItT69tM2xQxXo14rfRcAlbXHoazj0RU-VwKKW53CgX667WoddW61yfTGv-9mYFauYTUXLJ4tKIt-_t4xc6bnD9iXoK9UjFmLwDhhBRn2sf-Q68TKKWcdmFpw5PgA1Ja70ojXpkd6lEE6jHWCw01N8s',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAKWHIDhG2n_cW5_GqZiZscYSb8znv92Qq1RGkxgtF-_cQs9ZXUq_L9B-AkiileVcAtj3Po_VKCsxVOQvPUEvkOn5FjfrNZsKx4SKcV5qjRUGiEhPXQ80Koy6PavOYUfyyBMlRF25ZA2g0SkulrzProm91jxh89qgJBfx96xRb4CBdtJ2StR102U4q0ZfiSRcpQSwIqgrmMcRXeQclmFD3gm0SbB-ZEW6Ss5wH3eJ3F8qW-ohPNL8dPVj_rzQU2nu3CoSCrEFZxXV0',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAmJ8ZkdBNiwZdguakrSpEKR_A06IV9UvJh76EEn0vc4JwAivBFKJ3gT-x3tq2ehVSjC3fQm8a_CSGU5UEx1maG_BT8rhL0-QpavAHXL30sOgTwWrkMgZ-RiqKXYV-RNrk0uo4GV44s8aLN3Qn7BZhVYXcAdBGfmroPzolEgOLPHf-qRuzWih170O6nvVDekxZV0zMUUITirFtLGq5PJ3haJ3CzTmwXkhyQfR9fq9gPg5Xn0wk_baPWRQQN8snkfQ9ce3eN6gTSUeg',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCDtNXRP1trTjqHoGp_2-P1qBoj8-g9tDrt0DpnR4RYXZ7ceVnHH3CYOXyosQXcRgQlneTddaC-9-a2YfstWDoHP8nvpQx4GX_6rqvnDrIiIY7fDnQqMa1AEYwwV4iW0w7rlKDCpUmGzxakdn1-1Df_zj0vbZyPDye978t5AF7Z11jmw_p3HtPCpF2LHKK4tVVjFNT9NkKJk0-Dvz4M6h2EAShtotX5ViEqn3KGnNRwIyhHZaexLCm2Qsnf_52BHDQ_YmOVc8fITkc',
        ],
        amenities: [
            { icon: 'wifi', label: 'High-speed WiFi', detail: 'Fiber optic' },
            { icon: 'co_present', label: 'Co-Working Space', detail: 'Open 24 hours' },
            { icon: 'fitness_center', label: 'Gym', detail: 'Modern equipment' },
            { icon: 'local_parking', label: 'Parking', detail: 'Basement parking' },
            { icon: 'ac_unit', label: 'Air Conditioning', detail: 'Individual control' },
            { icon: 'security', label: 'Security', detail: 'CCTV 24/7' },
        ],
        hostName: 'Urban Nest Properties',
        hostImage:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAia7FN1RSoM7Ik5eFs8bx2K4TskapaS7uhC19RWONJaosqVmChEFrRAZ8xVtmG5stYGXBbly8XvT2Yy8mqedFmRECcFxoAzxK7wlOyGobtDnMrxlY_81D6OVWOvqVk8vBaJOGhAfrm9oJ7bbPGZqnlaEOv0vKenTALfSBHUiGFkfZT-hAy1OrvUg89fR5A-e4m3INsx-etPjwLzT4rvf8TeE_zj3VcozQIm0h4wV6mdKwiVxXOC1jl9AEOe4MRpjmDZTADDKrN-AQ',
        hostResponseTime: 'Under 30 minutes',
        nearbyPOIs: [
            { name: 'Sudirman Station', duration: '5 min' },
            { name: 'Pacific Place Mall', duration: '7 min' },
        ],
        mapImage:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDWJ4Ype26Dn3guEDATPQAC25hViTTcBqKcD9u89Tc2-n4BmXUsqJc3IxjaIA7xS4nSCtZ0AGI-8T4oxMZs8YlqYii17y_MnUlriZKwn50cwLvMVW-fIPg3mS6zwrZ8Zo1zP2DOijWeacCNeoEySvA6mXSnPtJjYZIpF2WQJf7q80-SRId0EoTkR_NYBA2mEfH1YSqpOxPUA_2-mLd4xr8i0fPOAz-JyHY2ZZxGUhzjt2l7-OIlskJWG8MLSl6v7H3xpWLYCZCsgMo',
    },
    3: {
        id: 3,
        name: 'Forest Edge Sanctuary',
        location: 'BSD City, Tangerang',
        rating: 4.7,
        reviewCount: 76,
        price: 'Rp 1.9jt',
        priceNum: 1900000,
        serviceFee: 100000,
        description:
            'Escape the city hustle without leaving the urban grid. Forest Edge Sanctuary sits at the border of BSD Green Office Park, offering lush greenery views, a sparkling pool, and private parking — all at an accessible price point perfect for students and early-career professionals.',
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD0konT-uwZtxX4WS4yy_JFNmTepn-RZiFic_oILz61dnHYS4q9Lv94p2ITk-Q4v2_QrdDuWOBhFxzTmGKrI0HdqpiWGPF3WyBrpGGk4RRk9m0xVNwRiLWfR80HFWWwKdMDIrdAa10ywRj2EGVa4ZscwD7ggu6MdbJuD5HkVi672JpjEQspYinFgvOXDSJvHmbPyyDKPmIYkadUWyK6LjsYxt_ZIDAmAkfBF5t78UbbetgrOjLwr0dCpamQDhbIVu3z2_7Tnm8xpUk',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAKWHIDhG2n_cW5_GqZiZscYSb8znv92Qq1RGkxgtF-_cQs9ZXUq_L9B-AkiileVcAtj3Po_VKCsxVOQvPUEvkOn5FjfrNZsKx4SKcV5qjRUGiEhPXQ80Koy6PavOYUfyyBMlRF25ZA2g0SkulrzProm91jxh89qgJBfx96xRb4CBdtJ2StR102U4q0ZfiSRcpQSwIqgrmMcRXeQclmFD3gm0SbB-ZEW6Ss5wH3eJ3F8qW-ohPNL8dPVj_rzQU2nu3CoSCrEFZxXV0',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCyMBflx5JG4oNCqRJJd9ccabA18NewMmkZw3tGvUkfscyB0Q8TaOKOe5ILOoNpq7FivDWOdDYU40-8dqhkXygteFBOlJWEflkcKKtTCm0kSATKYO0SQSwJTItT69tM2xQxXo14rfRcAlbXHoazj0RU-VwKKW53CgX667WoddW61yfTGv-9mYFauYTUXLJ4tKIt-_t4xc6bnD9iXoK9UjFmLwDhhBRn2sf-Q68TKKWcdmFpw5PgA1Ja70ojXpkd6lEE6jHWCw01N8s',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCDtNXRP1trTjqHoGp_2-P1qBoj8-g9tDrt0DpnR4RYXZ7ceVnHH3CYOXyosQXcRgQlneTddaC-9-a2YfstWDoHP8nvpQx4GX_6rqvnDrIiIY7fDnQqMa1AEYwwV4iW0w7rlKDCpUmGzxakdn1-1Df_zj0vbZyPDye978t5AF7Z11jmw_p3HtPCpF2LHKK4tVVjFNT9NkKJk0-Dvz4M6h2EAShtotX5ViEqn3KGnNRwIyhHZaexLCm2Qsnf_52BHDQ_YmOVc8fITkc',
        ],
        amenities: [
            { icon: 'pool', label: 'Swimming Pool', detail: 'Rooftop access' },
            { icon: 'local_parking', label: 'Private Parking', detail: '1 slot included' },
            { icon: 'wifi', label: 'WiFi', detail: '50Mbps dedicated' },
            { icon: 'ac_unit', label: 'Air Conditioning', detail: 'All rooms' },
            { icon: 'park', label: 'Garden View', detail: 'Green surroundings' },
            { icon: 'security', label: 'Security', detail: '24/7 guard' },
        ],
        hostName: 'BSD Realty Group',
        hostImage:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAia7FN1RSoM7Ik5eFs8bx2K4TskapaS7uhC19RWONJaosqVmChEFrRAZ8xVtmG5stYGXBbly8XvT2Yy8mqedFmRECcFxoAzxK7wlOyGobtDnMrxlY_81D6OVWOvqVk8vBaJOGhAfrm9oJ7bbPGZqnlaEOv0vKenTALfSBHUiGFkfZT-hAy1OrvUg89fR5A-e4m3INsx-etPjwLzT4rvf8TeE_zj3VcozQIm0h4wV6mdKwiVxXOC1jl9AEOe4MRpjmDZTADDKrN-AQ',
        hostResponseTime: 'Under 1 hour',
        nearbyPOIs: [
            { name: 'BSD Green Office', duration: '2 min' },
            { name: 'AEON Mall BSD', duration: '10 min' },
        ],
        mapImage:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDWJ4Ype26Dn3guEDATPQAC25hViTTcBqKcD9u89Tc2-n4BmXUsqJc3IxjaIA7xS4nSCtZ0AGI-8T4oxMZs8YlqYii17y_MnUlriZKwn50cwLvMVW-fIPg3mS6zwrZ8Zo1zP2DOijWeacCNeoEySvA6mXSnPtJjYZIpF2WQJf7q80-SRId0EoTkR_NYBA2mEfH1YSqpOxPUA_2-mLd4xr8i0fPOAz-JyHY2ZZxGUhzjt2l7-OIlskJWG8MLSl6v7H3xpWLYCZCsgMo',
    },
};

// ─── Page Component ───────────────────────────────────────────────────────────
interface PageProps2 extends PageProps {
    id: number;
}

export default function KosDetail({ id }: PageProps2) {
    const kos = mockKosData[id] ?? mockKosData[1];
    const [activeImage, setActiveImage] = useState(0);
    const [favorited, setFavorited] = useState(false);
    const [checkinDate, setCheckinDate] = useState('');
    const [duration, setDuration] = useState(6);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const durationOptions = [1, 3, 6, 12];

    const formatCheckinDisplay = (dateStr: string) => {
        if (!dateStr) return 'Pilih tanggal';
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const totalPerMonth = kos.priceNum + kos.serviceFee;
    const totalAll = totalPerMonth * duration;
    const formatRp = (n: number) =>
        'Rp ' + n.toLocaleString('id-ID').replace(/\./g, '.');

    return (
        <>
            <Head title={`${kos.name} | Kos Sekitar`} />

            {/* Shared Navbar */}
            <Navbar />

            <main className="pt-28 pb-32 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm font-label text-on-surface-variant mb-8">
                    <Link href={route('home')} className="hover:text-primary-container transition-colors">
                        Home
                    </Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link href={route('explore')} className="hover:text-primary-container transition-colors">
                        Explore
                    </Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-primary-container">{kos.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* ── Left Column ──────────────────────────────────── */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Title */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary-container"
                                    style={{ textShadow: '0 0 15px rgba(0,243,255,0.4)' }}>
                                    {kos.name}
                                </h1>
                                <div className="flex items-center gap-4 text-on-surface-variant flex-wrap">
                                    <div className="flex items-center gap-1">
                                        <span
                                            className="material-symbols-outlined text-tertiary-container"
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            star
                                        </span>
                                        <span className="font-bold text-on-surface">{kos.rating}</span>
                                        <span className="text-xs opacity-60">({kos.reviewCount} reviews)</span>
                                    </div>
                                    <span className="w-1 h-1 rounded-full bg-outline-variant" />
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        <span>{kos.location}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setFavorited(!favorited)}
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-variant/40 border border-primary-container/20 text-on-surface hover:bg-surface-variant/60 transition-all active:scale-95 group flex-shrink-0"
                            >
                                <span
                                    className={`material-symbols-outlined group-hover:text-primary-container transition-colors ${favorited ? 'text-primary-container' : ''}`}
                                    style={favorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
                                >
                                    favorite
                                </span>
                                <span className="font-semibold text-sm">
                                    {favorited ? 'Saved to Wishlist' : 'Save to Wishlist'}
                                </span>
                            </button>
                        </div>

                        {/* Photo Gallery — Bento layout */}
                        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[440px]">
                            {/* Main large photo */}
                            <div
                                className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer"
                                onClick={() => setActiveImage(0)}
                            >
                                <img
                                    src={kos.images[0]}
                                    alt={`${kos.name} main`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            {/* Top-right */}
                            <div
                                className="rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
                                onClick={() => setActiveImage(1)}
                            >
                                <img
                                    src={kos.images[1]}
                                    alt={`${kos.name} photo 2`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            {/* Top-rightmost */}
                            <div
                                className="rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
                                onClick={() => setActiveImage(2)}
                            >
                                <img
                                    src={kos.images[2]}
                                    alt={`${kos.name} photo 3`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            {/* Bottom-right spanning 2 cols */}
                            <div
                                className="col-span-2 rounded-3xl overflow-hidden shadow-xl relative group cursor-pointer"
                                onClick={() => setActiveImage(3)}
                            >
                                <img
                                    src={kos.images[3]}
                                    alt={`${kos.name} photo 4`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <button className="absolute bottom-5 right-5 px-4 py-2 bg-surface/80 backdrop-blur-md rounded-xl text-sm font-semibold border border-primary-container/30 text-on-surface hover:border-primary-container/60 transition-colors">
                                    View all 24 photos
                                </button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold font-headline text-on-surface">
                                About this sanctuary
                            </h2>
                            <p className="text-on-secondary-container leading-relaxed text-lg">
                                {kos.description.split('The Emerald Suite').map((part, i, arr) =>
                                    i < arr.length - 1 ? (
                                        <span key={i}>
                                            {part}
                                            <span className="text-primary-container font-semibold">{kos.name}</span>
                                        </span>
                                    ) : (
                                        <span key={i}>{part}</span>
                                    )
                                )}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold font-headline text-on-surface">Key Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {kos.amenities.map((amenity) => (
                                    <div
                                        key={amenity.label}
                                        className="p-6 rounded-2xl bg-surface-container-low border border-primary-container/5 hover:border-primary-container/20 transition-all group"
                                    >
                                        <span className="material-symbols-outlined text-primary-container mb-4 block text-3xl transition-transform group-hover:scale-110">
                                            {amenity.icon}
                                        </span>
                                        <span className="font-semibold block text-on-surface">{amenity.label}</span>
                                        <span className="text-xs text-on-surface-variant">{amenity.detail}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location Map */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold font-headline text-on-surface">Location</h2>
                            <div className="rounded-3xl overflow-hidden h-[380px] relative border border-primary-container/10">
                                <img
                                    src={kos.mapImage}
                                    alt="Location map"
                                    className="w-full h-full object-cover grayscale brightness-[0.3] contrast-[1.2]"
                                />
                                {/* Pulse pin */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center animate-pulse">
                                        <div className="w-4 h-4 bg-primary-container rounded-full shadow-[0_0_20px_#00f3ff]" />
                                    </div>
                                </div>
                                {/* POI card */}
                                <div className="absolute bottom-6 left-6 p-4 bg-surface-container-high/90 backdrop-blur-xl rounded-2xl border border-primary-container/20 max-w-xs">
                                    <p className="font-bold text-primary-container mb-2">Nearby POIs</p>
                                    <ul className="text-sm space-y-2">
                                        {kos.nearbyPOIs.map((poi) => (
                                            <li key={poi.name} className="flex justify-between gap-8">
                                                <span className="text-on-surface">{poi.name}</span>
                                                <span className="text-on-surface-variant">{poi.duration}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Host */}
                        <div className="p-8 rounded-3xl bg-surface-container-highest/40 backdrop-blur-md border border-outline-variant/20 flex flex-col md:flex-row items-center gap-8">
                            <div className="relative flex-shrink-0">
                                <img
                                    src={kos.hostImage}
                                    alt={kos.hostName}
                                    className="w-24 h-24 rounded-2xl object-cover border-2 border-primary-container"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-primary-container p-1 rounded-full text-on-primary-fixed">
                                    <span
                                        className="material-symbols-outlined text-sm"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        verified
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-1">
                                <p className="text-xs font-bold text-primary-container tracking-widest uppercase">Managed by</p>
                                <h3 className="text-2xl font-bold font-headline text-on-surface">{kos.hostName}</h3>
                                <p className="text-on-surface-variant">
                                    Typical response time:{' '}
                                    <span className="text-on-surface font-semibold">{kos.hostResponseTime}</span>
                                </p>
                            </div>
                            <button className="px-8 py-4 rounded-full bg-transparent border-2 border-primary-container/40 text-primary-container font-bold hover:bg-primary-container/10 transition-all flex-shrink-0">
                                Contact Host
                            </button>
                        </div>
                    </div>

                    {/* ── Right Column: Booking Panel ───────────────────── */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 p-8 rounded-[2.5rem] bg-surface-container-highest/50 backdrop-blur-2xl border border-primary-container/20 space-y-8"
                            style={{ boxShadow: '0 0 40px rgba(0,243,255,0.12)' }}>

                            {/* Price header */}
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                                        Starts from
                                    </p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-extrabold text-primary-container font-headline">
                                            {kos.price}
                                        </span>
                                        <span className="text-on-surface-variant">/mo</span>
                                    </div>
                                </div>
                                <span className="text-xs bg-tertiary-container/10 text-tertiary-container px-3 py-1 rounded-full border border-tertiary-container/20">
                                    All-inclusive
                                </span>
                            </div>

                            {/* Date fields */}
                            <div className="space-y-3">
                                {/* Check-in date picker */}
                                <div
                                    className="relative p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between cursor-pointer hover:border-primary-container/50 transition-colors group"
                                    onClick={() => setShowDatePicker(v => !v)}
                                >
                                    <div className="space-y-0.5">
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase">Check-in</label>
                                        <p className="text-sm font-semibold text-on-surface">{formatCheckinDisplay(checkinDate)}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container transition-colors">
                                        calendar_month
                                    </span>
                                    {showDatePicker && (
                                        <input
                                            type="date"
                                            title="Check-in date"
                                            aria-label="Check-in date"
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                            value={checkinDate}
                                            min={new Date().toISOString().split('T')[0]}
                                            onChange={e => { setCheckinDate(e.target.value); setShowDatePicker(false); }}
                                            onClick={e => e.stopPropagation()}
                                            autoFocus
                                        />
                                    )}
                                </div>

                                {/* Duration selector */}
                                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-on-surface-variant text-base">schedule</span>
                                        <label className="text-[10px] font-bold text-on-surface-variant uppercase">Duration</label>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {durationOptions.map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setDuration(opt)}
                                                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                                                    duration === opt
                                                        ? 'bg-primary-container text-on-primary-fixed shadow-[0_4px_12px_rgba(0,243,255,0.3)]'
                                                        : 'bg-surface-container text-on-surface-variant hover:border-primary-container/50 border border-outline-variant/30'
                                                }`}
                                            >
                                                {opt}mo
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Price breakdown */}
                            <div className="space-y-3 pt-4 border-t border-outline-variant/20">
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Monthly Rent</span>
                                    <span className="text-on-surface">{formatRp(kos.priceNum)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Service Fee</span>
                                    <span className="text-on-surface">{formatRp(kos.serviceFee)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Duration</span>
                                    <span className="text-on-surface">{duration} bulan</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t border-outline-variant/10">
                                    <span className="text-on-surface">Total</span>
                                    <span className="text-primary-container">{formatRp(totalAll)}</span>
                                </div>
                            </div>

                            {/* Book button */}
                            <button className="w-full py-5 rounded-full bg-gradient-to-r from-primary-container to-primary-fixed-dim text-on-primary-fixed font-bold text-lg shadow-[0_10px_30px_rgba(0,243,255,0.3)] hover:shadow-[0_15px_40px_rgba(0,243,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all">
                                Book Now
                            </button>
                            <p className="text-center text-xs text-on-surface-variant italic">
                                You won't be charged yet
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#00180d]/90 backdrop-blur-2xl flex justify-around items-center px-4 pb-6 pt-3 border-t border-primary-container/10 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,243,255,0.05)]">
                <Link href={route('explore')} className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary-container transition-colors">
                    <span className="material-symbols-outlined">explore</span>
                    <span className="text-[10px] font-semibold mt-1">Discover</span>
                </Link>
                <button
                    onClick={() => setFavorited(!favorited)}
                    className={`flex flex-col items-center justify-center transition-colors ${favorited ? 'text-primary-container' : 'text-on-surface/50 hover:text-primary-container'}`}
                >
                    <span className="material-symbols-outlined" style={favorited ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                        favorite
                    </span>
                    <span className="text-[10px] font-semibold mt-1">Saved</span>
                </button>
                <Link href={route('home')} className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary-container transition-colors">
                    <span className="material-symbols-outlined">home</span>
                    <span className="text-[10px] font-semibold mt-1">Home</span>
                </Link>
            </nav>
        </>
    );
}
