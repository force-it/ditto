<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->nullable();
            $table->foreignId('user_id')->nullable();
            $table->string('type')->nullable();
            $table->string('token');
            $table->string('name')->nullable();
            $table->string('username')->nullable();
            $table->json('meta')->default(new Expression('(JSON_OBJECT())'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bots');
    }
}
