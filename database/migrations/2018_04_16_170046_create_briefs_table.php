<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBriefsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('briefs', function (Blueprint $table) {
            $table->increments('id');
            $table->mediumText('title');
            $table->mediumText('abstract');
            $table->mediumText('image')->nullable();
            $table->string('category');
            $table->index('category');
            $table->string('product');
            $table->index('product');
            $table->unsignedInteger('user_id')->default(0);
            $table->string('days')->default(0);
            $table->timestamps();
        });

        DB::statement('ALTER TABLE briefs ADD FULLTEXT INDEX briefs_fulltext_index (title,abstract)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('briefs');
    }
}
