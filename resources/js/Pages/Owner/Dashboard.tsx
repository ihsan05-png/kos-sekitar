import OwnerLayout from '@/Layouts/OwnerLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const ACTIVITIES = [
    {
        icon: 'lock_open',
        color: 'text-primary-container',
        bg: 'bg-primary-container/10',
        title: 'Booking Baru:',
        highlight: 'Griya Asri Kamar 4',
        sub: 'Siti Aminah • 2 menit lalu',
    },
    {
        icon: 'credit_score',
        color: 'text-tertiary',
        bg: 'bg-tertiary-container/20',
        title: 'Pembayaran Diterima',
        highlight: '',
        sub: 'Rp 2.400.000 • 45 menit lalu',
    },
    {
        icon: 'build',
        color: 'text-error',
        bg: 'bg-error-container/20',
        title: 'Permintaan Perbaikan',
        highlight: '',
        sub: 'AC bocor di Melati House • 2 jam lalu',
    },
    {
        icon: 'person_add',
        color: 'text-primary-container',
        bg: 'bg-primary-container/10',
        title: 'Penyewa Baru Terverifikasi',
        highlight: '',
        sub: 'Budi Santoso • 5 jam lalu',
    },
];

const PROPERTIES = [
    {
        name: 'Kos Melati Residence',
        location: 'Jakarta Selatan',
        occupancy: '98%',
        revenue: 'Rp 45Jt/bln',
        img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200&h=200&fit=crop',
    },
    {
        name: 'Griya Asri Hub',
        location: 'Jakarta Barat',
        occupancy: '92%',
        revenue: 'Rp 32Jt/bln',
        img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=200&fit=crop',
    },
    {
        name: 'The Loft Menteng',
        location: 'Jakarta Pusat',
        occupancy: '100%',
        revenue: 'Rp 28Jt/bln',
        img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop',
    },
];

const BAR_HEIGHT_CLASS: Record<number, string> = {
    40: 'h-[40%]',
    45: 'h-[45%]',
    55: 'h-[55%]',
    60: 'h-[60%]',
    70: 'h-[70%]',
    85: 'h-[85%]',
    95: 'h-[95%]',
};
const BAR_HEIGHTS = [40, 55, 45, 70, 85, 95, 60];
const BAR_DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const BAR_LABELS = ['1.2k', '1.8k', '', '', '3.4k', '4.1k', ''];

export default function OwnerDashboard() {
    const { auth } = usePage<PageProps>().props;
    const [activeChart, setActiveChart] = useState<'7D' | '30D' | '6M'>('30D');

    return (
        <OwnerLayout>
            <Head title="Owner Dashboard | Kos Sekitar" />

            <main className="p-10">
                {/* Header */}
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-headline font-extrabold tracking-tighter">
                            Selamat datang, {auth.user.name.split(' ')[0]}.
                        </h2>
                        <p className="text-on-surface-variant mt-1">
                            Portofolio Anda{' '}
                            <span className="text-tertiary font-semibold">12% lebih baik</span>{' '}
                            dari bulan lalu.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-primary-container/30 flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface-variant">person</span>
                        </div>
                        <button className="bg-surface-container-high p-2.5 rounded-xl text-on-surface hover:bg-surface-container-highest transition-colors">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                    </div>
                </header>

                {/* Stat Cards */}
                <div className="grid grid-cols-12 gap-6 mb-10">
                    <div className="col-span-12 lg:col-span-3 bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group hover:bg-surface-container-high transition-all duration-300 cursor-default">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container rounded-r opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-4">Total Properti</p>
                        <h3 className="text-5xl font-headline font-bold mb-2">24</h3>
                        <div className="flex items-center gap-1.5 text-tertiary text-xs">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            <span>+2 kuartal ini</span>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-5 bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group hover:bg-surface-container-high transition-all duration-300 cursor-default">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container rounded-r opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-4">Pendapatan Bulanan</p>
                        <h3 className="text-5xl font-headline font-bold mb-2">Rp 142,5Jt</h3>
                        <div className="flex items-center gap-1.5 text-tertiary text-xs">
                            <span className="material-symbols-outlined text-sm">payments</span>
                            <span>Pencairan dijadwalkan 28 Okt</span>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group hover:bg-surface-container-high transition-all duration-300 cursor-default">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container rounded-r opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-4">Tingkat Hunian</p>
                        <div className="flex items-end gap-2 mb-4">
                            <h3 className="text-5xl font-headline font-bold">94</h3>
                            <span className="text-2xl font-headline text-on-surface-variant pb-1">%</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full">
                            <div className="h-full w-[94%] bg-primary-container rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Chart + Activities */}
                <div className="grid grid-cols-12 gap-6 mb-10">
                    {/* Bar Chart */}
                    <div className="col-span-12 xl:col-span-8 bg-surface-container-low p-8 rounded-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h4 className="text-xl font-headline font-bold">Pengunjung Bulanan</h4>
                                <p className="text-on-surface-variant text-sm mt-0.5">Traffic di semua listing properti</p>
                            </div>
                            <div className="flex gap-2">
                                {(['7D', '30D', '6M'] as const).map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setActiveChart(p)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                            activeChart === p
                                                ? 'bg-primary-container text-on-primary-fixed'
                                                : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-56 flex items-end justify-between gap-2 px-2">
                            {BAR_HEIGHTS.map((h, i) => (
                                <div key={i} className="flex-1 relative group">
                                    {BAR_LABELS[i] && (
                                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-surface-container-highest px-2 py-0.5 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {BAR_LABELS[i]}
                                        </div>
                                    )}
                                    <div
                                        className={`w-full rounded-t-lg transition-all duration-500 ${BAR_HEIGHT_CLASS[h]} ${
                                            i === 5
                                                ? 'bg-primary-container'
                                                : i === 4
                                                ? 'bg-primary-container/40'
                                                : 'bg-surface-container-high group-hover:bg-surface-container-highest'
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-on-surface-variant text-[10px] uppercase tracking-widest px-2">
                            {BAR_DAYS.map((d) => <span key={d}>{d}</span>)}
                        </div>
                    </div>

                    {/* Activities */}
                    <div className="col-span-12 xl:col-span-4 bg-surface-container-low p-8 rounded-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-xl font-headline font-bold">Aktivitas</h4>
                            <button type="button" className="text-primary-container text-xs font-semibold hover:underline">Lihat Semua</button>
                        </div>
                        <div className="space-y-7">
                            {ACTIVITIES.map((a, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className={`w-10 h-10 shrink-0 rounded-full ${a.bg} flex items-center justify-center ${a.color}`}>
                                        <span className="material-symbols-outlined text-[18px]">{a.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-on-surface font-medium leading-tight">
                                            {a.title}{' '}
                                            {a.highlight && <span className="text-primary-container">{a.highlight}</span>}
                                        </p>
                                        <p className="text-xs text-on-surface-variant mt-1">{a.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Properties */}
                <section>
                    <h4 className="text-xl font-headline font-bold mb-6">Properti Terbaik</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {PROPERTIES.map((p) => (
                            <div key={p.name} className="bg-surface-container p-4 rounded-2xl flex gap-4 hover:bg-surface-container-high transition-all duration-200 cursor-pointer group">
                                <img
                                    src={p.img}
                                    alt={p.name}
                                    className="w-24 h-24 rounded-xl object-cover shrink-0 group-hover:scale-[1.02] transition-transform duration-300"
                                />
                                <div className="flex flex-col justify-center">
                                    <h5 className="font-headline font-bold">{p.name}</h5>
                                    <p className="text-xs text-on-surface-variant mb-2">{p.location}</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs bg-primary-container/15 text-primary-container px-2 py-0.5 rounded-full font-medium">
                                            {p.occupancy} Terisi
                                        </span>
                                        <span className="text-xs font-bold">{p.revenue}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* FAB */}
            <div className="fixed bottom-10 right-10 z-50">
                <button
                    type="button"
                    className="neon-button-glow flex items-center gap-3 bg-primary-container text-on-primary-fixed px-6 py-4 rounded-full font-headline font-bold hover:scale-105 active:scale-95 transition-all duration-200"
                >
                    <span className="material-symbols-outlined">add_circle</span>
                    <span>Tambah Properti</span>
                </button>
            </div>
        </OwnerLayout>
    );
}
