<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    private const DUPLICATE = 'https://backend.solalaa.comhttps://backend.solalaa.com';
    private const NORMAL = 'https://backend.solalaa.com';

    public function up(): void
    {
        foreach ([
            ['media', 'url'], ['courses', 'image'], ['course_categories', 'image'], ['course_specialties', 'image'],
            ['cms_sections', 'content'], ['cms_sections', 'items'],
        ] as [$table, $column]) {
            DB::table($table)->where($column, 'like', self::DUPLICATE.'%')->update([
                $column => DB::raw("REPLACE(`{$column}`, '".self::DUPLICATE."', '".self::NORMAL."')"),
            ]);
        }
    }

    public function down(): void
    {
        // URL cleanup is intentionally irreversible: restoring broken URLs is not useful.
    }
};
