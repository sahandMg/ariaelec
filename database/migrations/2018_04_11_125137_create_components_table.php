<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComponentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('components', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('slug');
            $table->unsignedInteger('product_id')->default(0);
            $table->unsignedInteger('subcategory_id')->default(0);
            $table->foreign('product_id',str_random(5).'_'.'product_id')->references('id')->on('products')->onDelete('cascade');
//            $table->unsignedInteger('common_id')->default(0);
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
        Schema::dropIfExists('components');
    }
}
