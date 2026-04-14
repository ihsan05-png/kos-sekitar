import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Sign In | Kos Sekitar" />

            <div className="bg-background text-on-surface font-body min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Atmospheric blobs */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[100px] pointer-events-none" />

                <main className="w-full max-w-[480px] z-10">
                    {/* Branding */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary-container/30 to-surface-variant flex items-center justify-center border border-primary-container/30"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(0,243,255,0.4))' }}>
                            <span className="material-symbols-outlined text-primary-container text-3xl">home_work</span>
                        </div>
                        <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface text-center">
                            Kos <span className="text-primary-container">Sekitar</span>
                        </h1>
                        <p className="text-on-surface-variant font-medium mt-2 tracking-wide">Enter your private sanctuary</p>
                    </div>

                    {/* Status message */}
                    {status && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-primary-container/10 border border-primary-container/20 text-sm text-primary-container text-center font-medium">
                            {status}
                        </div>
                    )}

                    {/* Card */}
                    <div className="rounded-[2rem] p-8 md:p-10 shadow-2xl"
                        style={{
                            background: 'rgba(14, 60, 41, 0.4)',
                            backdropFilter: 'blur(24px)',
                            border: '1px solid rgba(0, 243, 255, 0.15)',
                        }}>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-headline font-semibold tracking-widest text-secondary-fixed uppercase ml-1">
                                    Email atau Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                                        <span className="material-symbols-outlined text-[20px]">person</span>
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="nama@email.com"
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container/30 transition-all duration-300 outline-none"
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label htmlFor="password" className="text-xs font-headline font-semibold tracking-widest text-secondary-fixed uppercase">
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-[11px] font-bold text-primary-fixed-dim hover:text-primary-container transition-colors tracking-tight"
                                        >
                                            Forgot Password?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-12 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container/30 transition-all duration-300 outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(v => !v)}
                                        className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-primary-container transition-colors"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-primary-container text-on-primary-fixed font-headline font-extrabold text-lg py-4 rounded-xl active:scale-[0.98] transition-all duration-300 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{ boxShadow: '0 0 20px rgba(0,243,255,0.3)' }}
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative flex items-center my-8">
                            <div className="flex-grow border-t border-outline-variant/30" />
                            <span className="flex-shrink mx-4 text-[10px] font-headline font-bold tracking-widest text-outline uppercase">
                                Or continue with
                            </span>
                            <div className="flex-grow border-t border-outline-variant/30" />
                        </div>

                        {/* Social Logins */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 bg-surface-container-high/50 hover:bg-surface-container-high text-on-surface border border-outline-variant/20 rounded-xl py-3.5 transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.23.81-.61z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="text-sm font-semibold tracking-tight">Google</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-on-surface-variant font-medium">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="text-primary-container font-bold ml-1 hover:underline transition-all">
                                Register Now
                            </Link>
                        </p>
                    </div>
                </main>

                {/* Bottom decorative text */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 opacity-30 pointer-events-none">
                    <span className="text-[10px] font-headline font-bold tracking-[0.3em] uppercase">Premium Spaces</span>
                    <div className="w-1 h-1 rounded-full bg-outline-variant" />
                    <span className="text-[10px] font-headline font-bold tracking-[0.3em] uppercase">Elite Security</span>
                    <div className="w-1 h-1 rounded-full bg-outline-variant" />
                    <span className="text-[10px] font-headline font-bold tracking-[0.3em] uppercase">Luminous Living</span>
                </div>
            </div>
        </>
    );
}
