<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    private const STORAGE = 'https://backend.solalaa.com/storage/';
    private const API = 'https://backend.solalaa.com/api/media/';

    public function up(): void
    {
        foreach ([
            ['media', 'url'], ['courses', 'image'], ['course_categories', 'image'], ['course_specialties', 'image'],
            ['cms_sections', 'content'], ['cms_sections', 'items'],
        ] as [$table, $column]) {
            DB::table($table)->where($column, 'like', self::STORAGE.'%')->update([
                $column => DB::raw("REPLACE(`{$column}`, '".self::STORAGE."', '".self::API."')"),
            ]);
        }
    }

    public function down(): void
    {
        // Existing URLs remain routable through the API; no rollback needed.
    }
};
