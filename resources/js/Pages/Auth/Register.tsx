import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function Register() {
    const [role, setRole] = useState<'seeker' | 'owner'>('seeker');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        role: 'seeker',
    });

    const handleRoleChange = (value: 'seeker' | 'owner') => {
        setRole(value);
        setData('role', value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register | Kos Sekitar" />

            <div className="bg-background text-on-surface font-body min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
                {/* Atmospheric blobs */}
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-surface-bright/20 blur-[120px] pointer-events-none" />
                <div className="absolute top-[40%] -right-[15%] w-[50%] h-[50%] rounded-full bg-primary-container/5 blur-[120px] pointer-events-none" />

                <main className="relative z-10 w-full max-w-2xl">
                    {/* Branding */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="auth-logo-glow w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary-container/30 to-surface-variant flex items-center justify-center border border-primary-container/30">
                            <span className="material-symbols-outlined text-primary-container text-3xl">home_work</span>
                        </div>
                        <h1 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tighter text-center">
                            Bergabung di <span className="text-primary-container">Kos Sekitar</span>
                        </h1>
                        <p className="text-on-surface-variant mt-2 text-center max-w-xs">
                            Temukan atau tawarkan hunian terbaik di sekitarmu.
                        </p>
                    </div>

                    {/* Role Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {/* Seeker */}
                        <button
                            type="button"
                            onClick={() => handleRoleChange('seeker')}
                            className={`group cursor-pointer h-full p-6 rounded-xl transition-all duration-300 border text-left ${
                                role === 'seeker'
                                    ? 'border-primary-container glass-card-primary'
                                    : 'border-outline-variant/15 hover:border-outline-variant/30 glass-card'
                            }`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-primary-container">person_search</span>
                                </div>
                                <h3 className="font-headline font-bold text-lg mb-1">Saya Pencari</h3>
                                <p className="text-xs text-on-surface-variant">Mencari hunian kos yang ideal.</p>
                            </div>
                        </button>

                        {/* Owner */}
                        <button
                            type="button"
                            onClick={() => handleRoleChange('owner')}
                            className={`group cursor-pointer h-full p-6 rounded-xl transition-all duration-300 border text-left ${
                                role === 'owner'
                                    ? 'border-primary-container glass-card-primary'
                                    : 'border-outline-variant/15 hover:border-outline-variant/30 glass-card'
                            }`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-primary-container">real_estate_agent</span>
                                </div>
                                <h3 className="font-headline font-bold text-lg mb-1">Saya Pemilik Kos</h3>
                                <p className="text-xs text-on-surface-variant">Menawarkan hunian untuk disewa.</p>
                            </div>
                        </button>
                    </div>

                    {/* Form Card */}
                    <div className="auth-card p-8 md:p-10 rounded-[2rem] shadow-2xl">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-xs font-headline font-semibold uppercase tracking-widest text-primary-container/70 px-1">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                                            <span className="material-symbols-outlined text-[20px]">badge</span>
                                        </div>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            autoComplete="name"
                                            autoFocus
                                            placeholder="Budi Santoso"
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container/30 transition-all duration-300 outline-none"
                                        />
                                    </div>
                                    <InputError message={errors.name} className="mt-1" />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-headline font-semibold uppercase tracking-widest text-primary-container/70 px-1">
                                        Alamat Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                                            <span className="material-symbols-outlined text-[20px]">mail</span>
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            autoComplete="email"
                                            placeholder="budi@email.com"
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container/30 transition-all duration-300 outline-none"
                                        />
                                    </div>
                                    <InputError message={errors.email} className="mt-1" />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-headline font-semibold uppercase tracking-widest text-primary-container/70 px-1">
                                        Nomor Telepon
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                                            <span className="material-symbols-outlined text-[20px]">phone</span>
                                        </div>
                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={data.phone}
                                            autoComplete="tel"
                                            placeholder="+62 812 3456 7890"
                                            onChange={e => setData('phone', e.target.value)}
                                            className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container/30 transition-all duration-300 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-headline font-semibold uppercase tracking-widest text-primary-container/70 px-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                                            <span className="material-symbols-outlined text-[20px]">lock</span>
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            onChange={e => setData('password', e.target.value)}
                                            className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-12 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container/30 transition-all duration-300 outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(v => !v)}
                                            className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-primary-container transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-1" />
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-headline font-semibold uppercase tracking-widest text-primary-container/70 px-1">
                                        Konfirmasi Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                                            <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                                        </div>
                                        <input
                                            id="password_confirmation"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            onChange={e => setData('password_confirmation', e.target.value)}
                                            className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-12 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container/30 transition-all duration-300 outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(v => !v)}
                                            className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-primary-container transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                    <InputError message={errors.password_confirmation} className="mt-1" />
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="mt-8 flex items-start gap-3">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    required
                                    className="mt-0.5 w-5 h-5 rounded-md bg-surface-container-lowest border-outline-variant text-primary-container focus:ring-primary-container/30 focus:ring-offset-0 cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-sm text-on-surface-variant cursor-pointer">
                                    Saya menyetujui{' '}
                                    <a href="#" className="text-primary-container hover:underline transition-all">
                                        Syarat & Ketentuan
                                    </a>{' '}
                                    dan{' '}
                                    <a href="#" className="text-primary-container hover:underline transition-all">
                                        Kebijakan Privasi
                                    </a>.
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="neon-button-glow w-full mt-8 bg-primary-container text-on-primary-fixed font-headline font-extrabold text-lg py-5 rounded-full flex items-center justify-center gap-2 group active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <span>{processing ? 'Membuat Akun...' : 'Buat Akun'}</span>
                                {!processing && (
                                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                )}
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-8 text-center">
                            <p className="text-on-surface-variant">
                                Sudah punya akun?{' '}
                                <Link
                                    href={route('login')}
                                    className="text-primary-container font-bold ml-1 hover:underline transition-all"
                                >
                                    Masuk Sekarang
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 text-center text-on-surface-variant/40 text-xs tracking-widest uppercase">
                        © 2024 Kos Sekitar • Hunian Terbaik di Sekitarmu
                    </div>
                </main>
            </div>
        </>
    );
}
