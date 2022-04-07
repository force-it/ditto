<?php

namespace Database\Factories\Og;

use App\Models\Og\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserLoginFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user = User::inRandomOrder()->first();

        return [
            'user_id' => $user->id,
            'user_name' => $user->username,
            'user_type' => $user->user_type,
            'really_name' => $user->really_name,
            'telephone' => $user->telephone,
            'url' => $this->faker->domainName(),
            'place' =>  $user->place,
            'ip' => $this->faker->ipv4(),
            'address' => '中国|0|台湾省|0|中华电信',
            'client_type' => $this->faker->numberBetween(0, 3),
            'app_type' => $this->faker->numberBetween(0, 1),
            'device_id' => $user->device_id,
            'login_time' => $date = $this->faker->dateTimeBetween('-30 mins', 'now'),
            // 'login_time' => $date = $this->faker->dateTimeBetween('-1 days', 'now'),
            'loginout_time' => $date,
            'user_agent' => $this->faker->userAgent(),
            'device_os' => $this->faker->numerify('#.#.#'),
            'device_name' => $this->faker->randomElement(['Apple', 'Huawei', 'Xiaomi', 'Samsung']),
            'device_type' => $this->faker->randomElement(['Apple', 'Huawei', 'Xiaomi', 'Samsung']),
            'register_ip' => $user->register_ip,
        ];
    }
}
