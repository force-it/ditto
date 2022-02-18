<?php

use App\Enums\WebhookStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStatusToWebhookReceiversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('webhook_receivers', function (Blueprint $table) {
            $table->string('status')->default(WebhookStatus::BUILDING)->after('jmte');
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
            $table->dropColumn('status');
        });
    }
}
