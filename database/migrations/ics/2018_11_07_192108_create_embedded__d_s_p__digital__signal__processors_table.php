<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmbeddedDSPDigitalSignalProcessorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            $this->cols = unserialize(\App\Helper::find(87)->helper);
        Schema::create('embedded__d_s_p__digital__signal__processors', function (Blueprint $table) {
            $table->increments('id');
            for($i=0;$i<count($this->cols);$i++){
                $table->string($this->cols[$i])->nullable();
            }
            $table->unsignedInteger('common_id')->default(0);
            $table->unsignedInteger('product_id')->nullable()->default(0);
            $table->foreign('common_id',str_random(5).'_'.'common_id')->references('id')->on('commons')->onDelete('cascade');
            $table->foreign('product_id',str_random(5).'_'.'product_id')->references('id')->on('products')->onDelete('cascade');
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
        Schema::dropIfExists('embedded__d_s_p__digital__signal__processors');
    }
}
