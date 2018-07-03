<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersianNamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('persian_names', function (Blueprint $table) {
            $table->increments('id');
            $table->text('names')->nullable();
            $table->text('links')->nullable();
            $table->string('type')->nullable();
            $table->unsignedInteger('component_id')->nullable();
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
        Schema::dropIfExists('persian_names');
    }
}
