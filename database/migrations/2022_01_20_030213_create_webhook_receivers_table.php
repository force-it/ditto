<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWebhookReceiversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('webhook_receivers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->nullable();
            $table->foreignId('user_id');
            $table->foreignId('bot_id')->nullable();
            $table->string('token');
            $table->json('chat');
            $table->json('dql')->default(new Expression('(JSON_OBJECT())'));
            $table->text('jmte');
            $table->string('malfunction')->nullable();
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
        Schema::dropIfExists('webhook_receivers');
    }
}
