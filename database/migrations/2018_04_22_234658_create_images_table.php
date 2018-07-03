<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->increments('id');
            $table->text('image')->nullable();
//            $table->unsignedInteger('brief_id')->default(0);
            $table->unsignedInteger('user_id')->default(0);
//            $table->foreign('brief_id')->references('id')->on('Briefs')->onDelete('cascade');
            $table->string('type')->nullable();
            $table->index('type');
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
        Schema::dropIfExists('images');
    }
}
