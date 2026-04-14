import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

const NAV_ITEMS = [
    { icon: 'verified', label: 'Verifikasi Kos', route: 'admin.dashboard' },
    { icon: 'manage_accounts', label: 'Pengguna', route: 'admin.users' },
    { icon: 'bar_chart', label: 'Statistik', route: 'admin.stats' },
    { icon: 'settings', label: 'Pengaturan', route: 'admin.settings' },
];

export default function AdminLayout({ children }: PropsWithChildren) {
    const currentRoute = route().current();

    return (
        <div className="flex min-h-screen bg-surface text-on-surface font-body">

            {/* ── Sidebar ── */}
            <aside
                className="fixed left-0 top-0 h-screen w-64 flex flex-col p-6 z-50"
                style={{
                    background: 'rgba(0, 33, 19, 0.6)',
                    backdropFilter: 'blur(24px)',
                    borderRight: '1px solid rgba(255,180,171,0.1)',
                }}
            >
                {/* Brand */}
                <div className="mb-10 flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center border border-error/30"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(255,180,171,0.2))' }}
                    >
                        <span className="material-symbols-outlined text-error text-xl">admin_panel_settings</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-headline font-black tracking-tighter">Kos Sekitar</h1>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface/40">Admin Portal</p>
                    </div>
                </div>

                {/* Nav items */}
                <nav className="flex-1 space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = currentRoute === item.route;
                        return (
                            <Link
                                key={item.route}
                                href={route(item.route)}
                                className={`flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${
                                    isActive
                                        ? 'text-on-surface bg-error/10 border border-error/20'
                                        : 'text-on-surface/40 hover:text-on-surface hover:bg-surface-container-high/50'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span>{item.label}</span>
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-error" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom nav */}
                <div className="pt-6 border-t border-outline-variant/20 space-y-1">
                    <a
                        href="#"
                        className="flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-medium text-on-surface/40 hover:text-on-surface hover:bg-surface-container-high/50 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">help</span>
                        <span>Bantuan</span>
                    </a>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-medium text-on-surface/40 hover:text-error hover:bg-error-container/10 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* ── Page Content ── */}
            <div className="ml-64 flex-1 min-h-screen">
                {children}
            </div>
        </div>
    );
}
