<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cms_sections', function (Blueprint $table) {
            $table->string('page_slug')->default('/')->after('section_key')->index();
            $table->string('section_type')->default('content')->after('page_slug');
            $table->unsignedInteger('position')->default(0)->after('section_type');
            $table->json('content')->nullable()->after('items');
        });

        DB::table('cms_sections')->where('section_key', 'like', 'home.%')->update(['page_slug' => '/']);
        DB::table('cms_sections')->where('section_key', 'like', 'courses.%')->update(['page_slug' => '/courses']);
        DB::table('cms_sections')->where('section_key', 'like', 'landscape.%')->update(['page_slug' => '/landscape']);
        DB::table('cms_sections')->orderBy('id')->get()->each(function ($section, $index) {
            DB::table('cms_sections')->where('id', $section->id)->update([
                'position' => $index,
                'content' => json_encode([
                    'title' => $section->title,
                    'subtitle' => $section->subtitle,
                    'body' => $section->body,
                    'items' => json_decode($section->items, true) ?: [],
                    'ctaLabel' => '',
                    'ctaHref' => '',
                    'image' => '',
                ], JSON_UNESCAPED_UNICODE),
            ]);
        });

        Schema::create('course_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->boolean('published')->default(true);
            $table->timestamps();
        });

        Schema::create('course_specialties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('course_categories')->cascadeOnDelete();
            $table->string('slug');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('hero_title')->nullable();
            $table->text('hero_subtitle')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->boolean('published')->default(true);
            $table->timestamps();
            $table->unique(['category_id', 'slug']);
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('specialty_id')->constrained('course_specialties')->cascadeOnDelete();
            $table->string('slug');
            $table->string('title');
            $table->text('summary')->nullable();
            $table->string('trainer')->nullable();
            $table->string('duration')->nullable();
            $table->string('badge')->nullable();
            $table->string('format')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->boolean('published')->default(true);
            $table->timestamps();
            $table->unique(['specialty_id', 'slug']);
        });

        Schema::create('course_modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->text('body');
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
        });

        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('disk')->default('public');
            $table->string('path')->unique();
            $table->string('url');
            $table->string('mime_type');
            $table->unsignedBigInteger('size');
            $table->string('alt')->nullable();
            $table->timestamps();
        });

        Schema::create('course_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->nullable()->constrained('courses')->nullOnDelete();
            $table->string('course_title');
            $table->string('full_name');
            $table->unsignedTinyInteger('age');
            $table->string('status');
            $table->string('university')->nullable();
            $table->string('faculty')->nullable();
            $table->string('graduation_year')->nullable();
            $table->string('workplace')->nullable();
            $table->string('job_title')->nullable();
            $table->string('schedule');
            $table->string('country');
            $table->string('governorate')->nullable();
            $table->string('phone');
            $table->string('email');
            $table->string('state')->default('new')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_registrations');
        Schema::dropIfExists('media');
        Schema::dropIfExists('course_modules');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('course_specialties');
        Schema::dropIfExists('course_categories');
        Schema::table('cms_sections', function (Blueprint $table) {
            $table->dropColumn(['page_slug', 'section_type', 'position', 'content']);
        });
    }
};
