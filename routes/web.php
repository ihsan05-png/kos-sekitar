<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/explore', function () {
    return Inertia::render('Explore');
})->name('explore');

Route::get('/kos/{id}', function (int $id) {
    return Inertia::render('KosDetail', ['id' => $id]);
})->name('kos.detail');

Route::get('/wishlist', function () {
    return Inertia::render('Wishlist');
})->name('wishlist');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/owner/dashboard', function () {
    return Inertia::render('Owner/Dashboard');
})->middleware(['auth', 'verified'])->name('owner.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('admin')->middleware(['auth', 'verified'])->name('admin.')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Admin/Dashboard'))->name('dashboard');
    Route::get('/users',     fn () => Inertia::render('Admin/Users'))->name('users');
});

require __DIR__.'/auth.php';
