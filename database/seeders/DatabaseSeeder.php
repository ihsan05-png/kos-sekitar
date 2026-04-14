<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Super Admin
        User::create([
            'name'     => 'Super Admin',
            'email'    => 'admin@kossekitar.com',
            'phone'    => '081200000001',
            'role'     => 'admin',
            'password' => Hash::make('password'),
        ]);

        // Owner
        User::create([
            'name'     => 'Budi Hartono',
            'email'    => 'owner@kossekitar.com',
            'phone'    => '081200000002',
            'role'     => 'owner',
            'password' => Hash::make('password'),
        ]);

        // Seeker
        User::create([
            'name'     => 'Siti Rahayu',
            'email'    => 'seeker@kossekitar.com',
            'phone'    => '081200000003',
            'role'     => 'seeker',
            'password' => Hash::make('password'),
        ]);
    }
}
