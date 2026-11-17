<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        DB::table('cms_pages')->updateOrInsert(['slug' => '/solalaa-link'], [
            'title' => 'Solalaa Link',
            'description' => 'خدمة سلالة لربط الكفاءات بفرص العمل والتدريب.',
            'hero_title' => 'نربط الكفاءات بالفرص',
            'hero_subtitle' => 'خدمة توظيف وتدريب من سلالة.',
            'published' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Schema::create('link_applications', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('phone', 80);
            $table->string('email')->nullable();
            $table->string('location');
            $table->string('education');
            $table->string('specialty');
            $table->string('experience')->nullable();
            $table->string('opportunity');
            $table->string('work_type')->nullable();
            $table->text('bio')->nullable();
            $table->string('status')->default('new');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('link_applications');
        DB::table('cms_pages')->where('slug', '/solalaa-link')->delete();
    }
};
