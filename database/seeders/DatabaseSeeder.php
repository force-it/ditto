<?php

namespace Database\Seeders;

use App\Models\Og\UserLogin;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        UserLogin::factory(30)->create();
    }
}
