import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

const NAV_ITEMS = [
    { icon: 'dashboard', label: 'Overview', route: 'owner.dashboard' },
    { icon: 'domain', label: 'My Properties', route: 'owner.properties' },
    { icon: 'add_business', label: 'Add New', route: 'owner.properties.create' },
    { icon: 'analytics', label: 'Analytics', route: 'owner.analytics' },
    { icon: 'chat_bubble', label: 'Messages', route: 'owner.messages' },
    { icon: 'settings', label: 'Settings', route: 'owner.settings' },
];

export default function OwnerLayout({ children }: PropsWithChildren) {
    const currentRoute = route().current();

    return (
        <div className="flex min-h-screen bg-surface text-on-surface font-body">

            {/* ── Sidebar ── */}
            <aside
                className="fixed left-0 top-0 h-screen w-64 flex flex-col p-6 z-50"
                style={{
                    background: 'rgba(0, 49, 31, 0.5)',
                    backdropFilter: 'blur(24px)',
                    borderRight: '1px solid rgba(58,73,75,0.2)',
                }}
            >
                {/* Brand */}
                <div className="mb-10 flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center border border-primary-container/30"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(0,243,255,0.3))' }}
                    >
                        <span className="material-symbols-outlined text-primary-container text-xl">home_work</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-headline font-black tracking-tighter">Kos Sekitar</h1>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface/40">Management Portal</p>
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
                                        ? 'text-on-surface bg-primary-container/10 border border-primary-container/20'
                                        : 'text-on-surface/40 hover:text-on-surface hover:bg-surface-container-high/50'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span>{item.label}</span>
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-container" />
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
                        <span className="material-symbols-outlined text-[20px]">contact_support</span>
                        <span>Support</span>
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
