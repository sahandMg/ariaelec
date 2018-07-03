<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('details', function (Blueprint $table) {
            $table->increments('id');
            $table->text('text');
            $table->string('source_name')->nullable();
            $table->string('source_label')->nullable();
            $table->unsignedInteger('brief_id');
            $table->index('brief_id');
//            $table->foreign('brief_id')->references('id')->on('briefs')->onDelete('cascade');
            $table->timestamps();
        });

        DB::statement('ALTER TABLE details ADD FULLTEXT INDEX details_text_index (text)');



    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('details');
    }
}
