<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commons', function (Blueprint $table) {
            $table->increments('id');
            $table->text('footprint')->nullable();
            $table->text('hd_image')->nullable();
            $table->text('datasheet')->nullable();
            $table->text('ld_image')->nullable();
            $table->string('part_number')->nullable();
            $table->index('part_number');
            $table->string('manufacturer_part_number')->nullable();
            $table->index('manufacturer_part_number');
            $table->string('manufacturer')->nullable();
            $table->index('manufacturer');
            $table->text('description')->nullable();
            $table->string('quantity_available')->nullable();
            $table->string('unit_price')->nullable();
            $table->string('minimum_quantity')->nullable();
            $table->string('packaging')->nullable();
            $table->index('packaging');
            $table->string('series')->nullable();
            $table->index('series');
            $table->string('part_status')->nullable();
            $table->index('part_status');
            $table->string('model')->nullable();
            $table->index('model');
            $table->boolean('original')->default(0);
            $table->unsignedInteger('component_id')->default('0');
            $table->foreign('component_id')->references('id')->on('components')->onDelete('cascade');
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
        Schema::dropIfExists('commons');
    }
}
