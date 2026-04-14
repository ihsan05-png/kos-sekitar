import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Status = 'pending' | 'accepted' | 'rejected';

interface KosSubmission {
    id: number;
    name: string;
    owner: string;
    location: string;
    type: string;
    price: string;
    submittedAt: string;
    status: Status;
    rooms: number;
    img: string;
}

const DUMMY_SUBMISSIONS: KosSubmission[] = [
    {
        id: 1,
        name: 'Kos Harmoni Indah',
        owner: 'Budi Hartono',
        location: 'Depok, Jawa Barat',
        type: 'Putra',
        price: 'Rp 800.000/bln',
        submittedAt: '14 Apr 2026, 09.12',
        status: 'pending',
        rooms: 8,
        img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=120&h=120&fit=crop',
    },
    {
        id: 2,
        name: 'Griya Putri Cantik',
        owner: 'Siti Rahayu',
        location: 'Tangerang Selatan',
        type: 'Putri',
        price: 'Rp 950.000/bln',
        submittedAt: '14 Apr 2026, 08.45',
        status: 'pending',
        rooms: 12,
        img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=120&h=120&fit=crop',
    },
    {
        id: 3,
        name: 'The Urban Den',
        owner: 'Ahmad Fauzi',
        location: 'Jakarta Timur',
        type: 'Campur',
        price: 'Rp 1.200.000/bln',
        submittedAt: '13 Apr 2026, 21.30',
        status: 'pending',
        rooms: 6,
        img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=120&h=120&fit=crop',
    },
    {
        id: 4,
        name: 'Wisma Sejahtera',
        owner: 'Dewi Kusuma',
        location: 'Bekasi Utara',
        type: 'Putra',
        price: 'Rp 600.000/bln',
        submittedAt: '13 Apr 2026, 15.00',
        status: 'accepted',
        rooms: 10,
        img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=120&h=120&fit=crop',
    },
    {
        id: 5,
        name: 'Kos Murah Meriah',
        owner: 'Joko Susilo',
        location: 'Jakarta Utara',
        type: 'Campur',
        price: 'Rp 350.000/bln',
        submittedAt: '12 Apr 2026, 11.20',
        status: 'rejected',
        rooms: 3,
        img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=120&h=120&fit=crop',
    },
];

const STATUS_CONFIG = {
    pending:  { label: 'Pending',  bg: 'bg-secondary-container/40', text: 'text-secondary', icon: 'schedule' },
    accepted: { label: 'Diterima', bg: 'bg-primary-container/10',   text: 'text-primary-container', icon: 'check_circle' },
    rejected: { label: 'Ditolak',  bg: 'bg-error-container/20',     text: 'text-error', icon: 'cancel' },
};

type FilterTab = 'all' | Status;

export default function AdminDashboard() {
    const { auth } = usePage<PageProps>().props;
    const [submissions, setSubmissions] = useState<KosSubmission[]>(DUMMY_SUBMISSIONS);
    const [activeTab, setActiveTab] = useState<FilterTab>('pending');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const counts = {
        all:      submissions.length,
        pending:  submissions.filter(s => s.status === 'pending').length,
        accepted: submissions.filter(s => s.status === 'accepted').length,
        rejected: submissions.filter(s => s.status === 'rejected').length,
    };

    const filtered = activeTab === 'all'
        ? submissions
        : submissions.filter(s => s.status === activeTab);

    const updateStatus = (id: number, status: Status) => {
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
        setExpandedId(null);
    };

    const tabs: { key: FilterTab; label: string }[] = [
        { key: 'pending',  label: `Pending (${counts.pending})` },
        { key: 'accepted', label: `Diterima (${counts.accepted})` },
        { key: 'rejected', label: `Ditolak (${counts.rejected})` },
        { key: 'all',      label: `Semua (${counts.all})` },
    ];

    return (
        <AdminLayout>
            <Head title="Verifikasi Kos | Admin" />

            <main className="p-10">
                {/* Header */}
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-on-surface/40 mb-1">Admin Panel</p>
                        <h2 className="text-4xl font-headline font-extrabold tracking-tighter">
                            Verifikasi Kos
                        </h2>
                        <p className="text-on-surface-variant mt-1">
                            Halo, <span className="text-primary-container font-semibold">{auth.user.name}</span>. Tinjau kiriman kos dari pemilik sebelum dipublikasi.
                        </p>
                    </div>
                </header>

                {/* Stat Cards */}
                <div className="grid grid-cols-3 gap-5 mb-10">
                    <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-secondary">
                        <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">Menunggu Review</p>
                        <h3 className="text-4xl font-headline font-bold">{counts.pending}</h3>
                        <p className="text-xs text-secondary mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            Perlu ditindaklanjuti
                        </p>
                    </div>
                    <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-primary-container">
                        <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">Diterima Hari Ini</p>
                        <h3 className="text-4xl font-headline font-bold">{counts.accepted}</h3>
                        <p className="text-xs text-primary-container mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Sudah dipublikasi
                        </p>
                    </div>
                    <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-error">
                        <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">Ditolak</p>
                        <h3 className="text-4xl font-headline font-bold">{counts.rejected}</h3>
                        <p className="text-xs text-error mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">cancel</span>
                            Tidak memenuhi syarat
                        </p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                                activeTab === tab.key
                                    ? 'bg-primary-container text-on-primary-fixed'
                                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Submissions List */}
                <div className="space-y-4">
                    {filtered.length === 0 && (
                        <div className="bg-surface-container-low rounded-2xl p-12 text-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-4xl mb-3 block">inbox</span>
                            <p className="font-medium">Tidak ada kiriman di kategori ini.</p>
                        </div>
                    )}

                    {filtered.map((kos) => {
                        const cfg = STATUS_CONFIG[kos.status];
                        const isExpanded = expandedId === kos.id;

                        return (
                            <div
                                key={kos.id}
                                className="bg-surface-container-low rounded-2xl overflow-hidden transition-all duration-300"
                            >
                                {/* Row */}
                                <div className="flex items-center gap-5 p-5">
                                    <img
                                        src={kos.img}
                                        alt={kos.name}
                                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h4 className="font-headline font-bold text-on-surface truncate">{kos.name}</h4>
                                            <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                                                <span className="material-symbols-outlined text-[12px]">{cfg.icon}</span>
                                                {cfg.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-on-surface-variant">
                                            Pemilik: <span className="text-on-surface font-medium">{kos.owner}</span>
                                            &nbsp;•&nbsp;{kos.location}
                                            &nbsp;•&nbsp;{kos.type}
                                            &nbsp;•&nbsp;{kos.rooms} kamar
                                        </p>
                                        <p className="text-xs text-on-surface-variant mt-0.5">
                                            {kos.price} &nbsp;•&nbsp; Dikirim: {kos.submittedAt}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        {kos.status === 'pending' && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => updateStatus(kos.id, 'accepted')}
                                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container/15 text-primary-container hover:bg-primary-container/25 text-xs font-bold transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">check</span>
                                                    Terima
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => updateStatus(kos.id, 'rejected')}
                                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-error-container/20 text-error hover:bg-error-container/30 text-xs font-bold transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                                    Tolak
                                                </button>
                                            </>
                                        )}
                                        {kos.status !== 'pending' && (
                                            <button
                                                type="button"
                                                onClick={() => updateStatus(kos.id, 'pending')}
                                                className="px-3 py-2 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high text-xs font-medium transition-all"
                                            >
                                                Reset
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => setExpandedId(isExpanded ? null : kos.id)}
                                            className="p-2 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-all"
                                            aria-label="Toggle detail"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                {isExpanded ? 'expand_less' : 'expand_more'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Detail */}
                                {isExpanded && (
                                    <div className="border-t border-outline-variant/20 px-5 py-4 bg-surface-container/50">
                                        <p className="text-xs font-headline font-semibold uppercase tracking-widest text-on-surface-variant mb-3">Detail Kiriman</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">Nama Kos</p>
                                                <p className="font-medium">{kos.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">Pemilik</p>
                                                <p className="font-medium">{kos.owner}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">Lokasi</p>
                                                <p className="font-medium">{kos.location}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">Harga</p>
                                                <p className="font-medium text-primary-container">{kos.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </AdminLayout>
    );
}
