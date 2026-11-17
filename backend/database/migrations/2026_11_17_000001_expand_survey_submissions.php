<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('link_applications', function (Blueprint $table) {
            $table->string('intent', 40)->default('seeker')->after('id');
            $table->string('company_name')->nullable()->after('full_name');
            $table->string('linkedin')->nullable()->after('bio');
            $table->string('cv_path')->nullable()->after('linkedin');
            $table->text('hiring_needs')->nullable()->after('cv_path');
        });

        Schema::create('entrepreneurship_applications', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('phone', 80);
            $table->string('email')->nullable();
            $table->string('project_title')->nullable();
            $table->string('stage')->nullable();
            $table->text('idea')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('cv_path')->nullable();
            $table->string('status')->default('new');
            $table->timestamps();
        });

        Schema::create('site_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('source', 60);
            $table->string('full_name')->nullable();
            $table->string('phone', 80)->nullable();
            $table->string('email')->nullable();
            $table->string('subject')->nullable();
            $table->json('payload')->nullable();
            $table->string('file_path')->nullable();
            $table->string('status')->default('new');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_inquiries');
        Schema::dropIfExists('entrepreneurship_applications');
        Schema::table('link_applications', function (Blueprint $table) {
            $table->dropColumn(['intent', 'company_name', 'linkedin', 'cv_path', 'hiring_needs']);
        });
    }
};
