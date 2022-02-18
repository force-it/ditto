<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAlertsAndButtonsToWebhookReceiversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('webhook_receivers', function (Blueprint $table) {
            $table->json('buttons')->default(new Expression('(JSON_ARRAY())'))->affter('jmte');
            $table->json('alerts')->default(new Expression('(JSON_ARRAY())'))->affter('buttons');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('webhook_receivers', function (Blueprint $table) {
            $table->dropColumn('buttons');
            $table->dropColumn('alerts');
        });
    }
}
