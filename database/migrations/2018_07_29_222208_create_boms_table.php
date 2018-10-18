<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('boms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('price')->nullable();
            $table->string('status')->nullable();
            $table->unsignedInteger('user_id')->default(0);
            $table->string('order_number')->nullable();
//            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
//            $table->unsignedInteger('cart_id')->default(0);
//            $table->foreign('cart_id')->references('id')->on('carts')->onDelete('cascade');
            $table->unsignedInteger('address_id')->default(0);
//            $table->foreign('address_id')->references('id')->on('addresses');
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
        Schema::dropIfExists('boms');
    }
}
