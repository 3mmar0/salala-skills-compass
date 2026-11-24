<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    private const PAGES = [
        ['/arabian-horse', 'الخيل العربي', 'وراثة وتحسين سلالات الخيل العربي الأصيل.', 'ميدان الخيول العربية'],
        ['/solalaa-camel', 'Solalaa Camel', 'ابتكار ووراثة سلالات الإبل العربية.', 'ابتكار ووراثة سلالات الإبل العربية'],
        ['/large-animal', 'الحيوانات الكبيرة', 'علم وراثة وتحسين سلالات الأبقار والجاموس والماشية.', 'علم وراثة وتحسين سلالات الحيوانات الكبيرة'],
        ['/poultry', 'الدواجن', 'علم وراثة وسلالات الدواجن.', 'علم وراثة وسلالات الدواجن'],
    ];

    public function up(): void
    {
        foreach (self::PAGES as [$slug, $title, $description, $heroTitle]) {
            if (DB::table('cms_pages')->where('slug', $slug)->exists()) {
                continue;
            }
            DB::table('cms_pages')->insert([
                'slug' => $slug,
                'title' => $title,
                'description' => $description,
                'hero_title' => $heroTitle,
                'hero_subtitle' => '',
                'published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        DB::table('cms_sections')->whereIn('page_slug', array_column(self::PAGES, 0))->delete();
        DB::table('cms_pages')->whereIn('slug', array_column(self::PAGES, 0))->delete();
    }
};
