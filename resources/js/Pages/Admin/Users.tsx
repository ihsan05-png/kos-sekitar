import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

type UserStatus = 'active' | 'suspended' | 'banned';
type UserRole   = 'seeker' | 'owner';

interface AppUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    joinedAt: string;
    lastSeen: string;
}

const DUMMY_USERS: AppUser[] = [
    { id: 1, name: 'Budi Santoso',    email: 'budi@email.com',    role: 'seeker', status: 'active',    joinedAt: '10 Jan 2026', lastSeen: '14 Apr 2026' },
    { id: 2, name: 'Siti Rahayu',     email: 'siti@email.com',    role: 'owner',  status: 'active',    joinedAt: '5 Feb 2026',  lastSeen: '13 Apr 2026' },
    { id: 3, name: 'Ahmad Fauzi',     email: 'ahmad@email.com',   role: 'owner',  status: 'suspended', joinedAt: '22 Feb 2026', lastSeen: '1 Apr 2026'  },
    { id: 4, name: 'Dewi Kusuma',     email: 'dewi@email.com',    role: 'seeker', status: 'active',    joinedAt: '3 Mar 2026',  lastSeen: '12 Apr 2026' },
    { id: 5, name: 'Joko Susilo',     email: 'joko@email.com',    role: 'owner',  status: 'banned',    joinedAt: '15 Jan 2026', lastSeen: '20 Mar 2026' },
    { id: 6, name: 'Rini Wulandari',  email: 'rini@email.com',    role: 'seeker', status: 'active',    joinedAt: '8 Mar 2026',  lastSeen: '14 Apr 2026' },
    { id: 7, name: 'Hendra Gunawan',  email: 'hendra@email.com',  role: 'owner',  status: 'active',    joinedAt: '12 Mar 2026', lastSeen: '11 Apr 2026' },
    { id: 8, name: 'Nurul Hidayah',   email: 'nurul@email.com',   role: 'seeker', status: 'suspended', joinedAt: '1 Apr 2026',  lastSeen: '5 Apr 2026'  },
];

const STATUS_CFG: Record<UserStatus, { label: string; bg: string; text: string }> = {
    active:    { label: 'Aktif',     bg: 'bg-primary-container/10', text: 'text-primary-container' },
    suspended: { label: 'Suspend',   bg: 'bg-secondary-container/40', text: 'text-secondary' },
    banned:    { label: 'Banned',    bg: 'bg-error-container/20',   text: 'text-error' },
};

const ROLE_CFG: Record<UserRole, { label: string; bg: string; text: string }> = {
    seeker: { label: 'Pencari', bg: 'bg-tertiary-container/20', text: 'text-tertiary' },
    owner:  { label: 'Pemilik', bg: 'bg-surface-container-highest', text: 'text-on-surface-variant' },
};

type StatusFilter = 'all' | UserStatus;

export default function AdminUsers() {
    usePage<PageProps>().props;
    const [users, setUsers] = useState<AppUser[]>(DUMMY_USERS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [confirmAction, setConfirmAction] = useState<{ id: number; action: UserStatus } | null>(null);

    const filtered = users.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase())
            || u.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || u.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const counts = {
        all:       users.length,
        active:    users.filter(u => u.status === 'active').length,
        suspended: users.filter(u => u.status === 'suspended').length,
        banned:    users.filter(u => u.status === 'banned').length,
    };

    const applyAction = (id: number, action: UserStatus) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, status: action } : u));
        setConfirmAction(null);
    };

    const statusTabs: { key: StatusFilter; label: string }[] = [
        { key: 'all',       label: `Semua (${counts.all})`           },
        { key: 'active',    label: `Aktif (${counts.active})`        },
        { key: 'suspended', label: `Suspend (${counts.suspended})`   },
        { key: 'banned',    label: `Banned (${counts.banned})`       },
    ];

    return (
        <AdminLayout>
            <Head title="Manajemen Pengguna | Admin" />

            <main className="p-10">
                {/* Header */}
                <header className="mb-10">
                    <p className="text-xs uppercase tracking-widest text-on-surface/40 mb-1">Admin Panel</p>
                    <h2 className="text-4xl font-headline font-extrabold tracking-tighter">Manajemen Pengguna</h2>
                    <p className="text-on-surface-variant mt-1">
                        Pantau dan kelola seluruh akun pengguna platform.
                    </p>
                </header>

                {/* Stat Cards */}
                <div className="grid grid-cols-4 gap-5 mb-8">
                    {[
                        { label: 'Total Pengguna', value: counts.all,       color: 'border-outline-variant', icon: 'group' },
                        { label: 'Akun Aktif',     value: counts.active,    color: 'border-primary-container', icon: 'check_circle' },
                        { label: 'Disuspend',      value: counts.suspended, color: 'border-secondary', icon: 'pause_circle' },
                        { label: 'Dibanned',       value: counts.banned,    color: 'border-error', icon: 'block' },
                    ].map(card => (
                        <div key={card.label} className={`bg-surface-container-low p-6 rounded-2xl border-l-4 ${card.color}`}>
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">{card.label}</p>
                            <h3 className="text-4xl font-headline font-bold">{card.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-outline">
                            <span className="material-symbols-outlined text-[18px]">search</span>
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Cari nama atau email..."
                            className="w-full bg-surface-container-lowest border-none rounded-xl py-3 pl-10 pr-4 text-sm text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container/30 outline-none transition-all"
                        />
                    </div>

                    {/* Status filter tabs */}
                    <div className="flex gap-2">
                        {statusTabs.map(tab => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setStatusFilter(tab.key)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                                    statusFilter === tab.key
                                        ? 'bg-primary-container text-on-primary-fixed'
                                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-surface-container-low rounded-2xl overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant/20 text-[10px] uppercase tracking-widest text-on-surface-variant">
                        <div className="col-span-4">Pengguna</div>
                        <div className="col-span-2">Role</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Bergabung</div>
                        <div className="col-span-2 text-right">Aksi</div>
                    </div>

                    {filtered.length === 0 && (
                        <div className="px-6 py-12 text-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-4xl mb-3 block">person_search</span>
                            <p className="font-medium">Tidak ada pengguna yang cocok.</p>
                        </div>
                    )}

                    {filtered.map((user, idx) => {
                        const sc = STATUS_CFG[user.status];
                        const rc = ROLE_CFG[user.role];
                        return (
                            <div
                                key={user.id}
                                className={`grid grid-cols-12 gap-4 items-center px-6 py-4 transition-colors ${
                                    idx % 2 === 0 ? 'bg-surface-container/20' : ''
                                } hover:bg-surface-container-high/40`}
                            >
                                {/* User */}
                                <div className="col-span-4 flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 shrink-0 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                                        <span className="material-symbols-outlined text-[18px]">person</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm truncate">{user.name}</p>
                                        <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="col-span-2">
                                    <span className={`inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${rc.bg} ${rc.text}`}>
                                        {rc.label}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className="col-span-2">
                                    <span className={`inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                                        {sc.label}
                                    </span>
                                </div>

                                {/* Joined */}
                                <div className="col-span-2">
                                    <p className="text-xs text-on-surface-variant">{user.joinedAt}</p>
                                    <p className="text-[10px] text-on-surface/30">Aktif: {user.lastSeen}</p>
                                </div>

                                {/* Actions */}
                                <div className="col-span-2 flex items-center justify-end gap-2">
                                    {user.status === 'active' && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setConfirmAction({ id: user.id, action: 'suspended' })}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary-container/30 text-secondary hover:bg-secondary-container/50 text-xs font-semibold transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[14px]">pause_circle</span>
                                                Suspend
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setConfirmAction({ id: user.id, action: 'banned' })}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-error-container/20 text-error hover:bg-error-container/30 text-xs font-semibold transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[14px]">block</span>
                                                Ban
                                            </button>
                                        </>
                                    )}
                                    {user.status !== 'active' && (
                                        <button
                                            type="button"
                                            onClick={() => applyAction(user.id, 'active')}
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container/10 text-primary-container hover:bg-primary-container/20 text-xs font-semibold transition-all"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                                            Aktifkan
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Confirm Modal */}
            {confirmAction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/70 backdrop-blur-sm">
                    <div className="bg-surface-container-low rounded-2xl p-8 w-full max-w-sm shadow-2xl border border-outline-variant/20">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${
                            confirmAction.action === 'banned' ? 'bg-error-container/30' : 'bg-secondary-container/40'
                        }`}>
                            <span className={`material-symbols-outlined ${
                                confirmAction.action === 'banned' ? 'text-error' : 'text-secondary'
                            }`}>
                                {confirmAction.action === 'banned' ? 'block' : 'pause_circle'}
                            </span>
                        </div>
                        <h3 className="font-headline font-bold text-lg mb-2">
                            {confirmAction.action === 'banned' ? 'Ban Pengguna?' : 'Suspend Pengguna?'}
                        </h3>
                        <p className="text-sm text-on-surface-variant mb-8">
                            {confirmAction.action === 'banned'
                                ? 'Akun ini akan diblokir permanen dan tidak bisa login. Tindakan ini bisa dibalik kapan saja.'
                                : 'Akun ini akan dinonaktifkan sementara. Pengguna tidak bisa login sampai diaktifkan kembali.'
                            }
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setConfirmAction(null)}
                                className="flex-1 py-3 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high text-sm font-semibold transition-all"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={() => applyAction(confirmAction.id, confirmAction.action)}
                                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                                    confirmAction.action === 'banned'
                                        ? 'bg-error text-on-error hover:opacity-90'
                                        : 'bg-secondary text-on-secondary hover:opacity-90'
                                }`}
                            >
                                {confirmAction.action === 'banned' ? 'Ya, Ban' : 'Ya, Suspend'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
