<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@solalaa.com')],
            ['name' => 'Solala Administrator', 'password' => Hash::make(env('ADMIN_PASSWORD', 'Change-this-password-now'))],
        );

        DB::table('cms_settings')->updateOrInsert(['key' => 'site'], ['value' => json_encode([
            'siteName' => 'Solala سلالة', 'tagline' => 'تدريب، استشارات، ريادة أعمال',
            'email' => 'info@solalaa.com', 'phone' => '', 'address' => '', 'facebook' => '#', 'twitter' => '#', 'linkedin' => '#',
            'seoDescription' => 'سلالة منصة عربية للتدريب الزراعي والاستشارات وريادة الأعمال والمشروعات الاستثمارية.',
        ], JSON_UNESCAPED_UNICODE), 'created_at' => now(), 'updated_at' => now()]);

        $pages = [
            ['/', 'الرئيسية'], ['/about', 'عن سلالة'], ['/courses', 'الدورات والتدريبات'], ['/consulting', 'الاستشارات'],
            ['/entrepreneurship', 'ريادة الأعمال والمشاريع'], ['/library', 'المكتبة'], ['/faq', 'الأسئلة الشائعة'], ['/policies', 'السياسات والشروط'],
            ['/contact', 'تواصل معنا'], ['/landscape', 'اللاندسكيب'], ['/breed-innovation', 'مركز ابتكار السلالات'],
            ['/courses/animal-livestock', 'الإنتاج الحيواني والداجني والسمكي'], ['/courses/animal-livestock/animal', 'الإنتاج الحيواني'],
            ['/courses/animal-livestock/poultry', 'الإنتاج الداجني'], ['/courses/animal-livestock/fish', 'الاستزراع السمكي'],
        ];
        foreach ($pages as [$slug, $title]) {
            DB::table('cms_pages')->updateOrInsert(['slug' => $slug], [
                'title' => $title, 'description' => '', 'hero_title' => '', 'hero_subtitle' => '', 'published' => true,
                'created_at' => now(), 'updated_at' => now(),
            ]);
        }

        $sections = [
            ['home-pillars', 'home.pillars', 'ركائز سلالة', 'لماذا سلالة؟', 'ثلاث ركائز أساسية توجه عمل المنصة.', [['id' => 'p1', 'title' => 'سد الفجوة', 'description' => 'بين التعليم الأكاديمي وسوق العمل'], ['id' => 'p2', 'title' => 'تطوير ودعم', 'description' => 'المهارات الشخصية والفنية للأفراد والشركات'], ['id' => 'p3', 'title' => 'المساهمة', 'description' => 'في دفع عجلة الابتكار وريادة الأعمال']]],
            ['home-cta', 'home.cta', 'ابدأ رحلتك مع Solala اليوم', 'دعوة للتواصل', 'سواء كنت طالباً أو مهندساً أو مستثمراً، لدينا البرنامج المناسب لك.', []],
            ['courses-custom', 'courses.customTraining', 'هل تبحث عن تدريب مخصص لمزرعتك أو شركتك؟', 'تدريب مخصص', 'نوفر حقائب تدريبية واستشارات ميدانية مصممة خصيصاً لتلبية متطلبات الشركات والمزارع الخاصة وفرق العمل الزراعي.', []],
            ['landscape-cta', 'landscape.cta', 'هل لديك مساحة خارجية وترغب في تحويلها إلى تحفة خضراء؟', 'لاندسكيب', 'تواصل معنا مباشرة مع كبار مهندسي اللاندسكيب لحجز موعد الرفع المساحي والمعاينة الميدانية.', []],
        ];
        foreach ($sections as [$id, $key, $title, $subtitle, $body, $items]) {
            DB::table('cms_sections')->updateOrInsert(['section_id' => $id], [
                'section_key' => $key, 'title' => $title, 'subtitle' => $subtitle, 'body' => $body,
                'items' => json_encode($items, JSON_UNESCAPED_UNICODE), 'visible' => true, 'created_at' => now(), 'updated_at' => now(),
            ]);
        }

        $categoryRows = [
            ['animal-livestock', 'الإنتاج الحيواني والداجني والسمكي', 'تدريبات متخصصة في الإنتاج الحيواني والداجني والسمكي'],
            ['plant-production', 'الإنتاج النباتي', 'برامج متخصصة للمحاصيل والخضر والفاكهة والزينة'],
            ['plant-protection', 'وقاية النبات', 'أمراض النبات والحشرات والمبيدات'],
            ['food-processing', 'التصنيع الغذائي', 'برامج في الألبان والصناعات الغذائية'],
        ];
        foreach ($categoryRows as $position => [$slug, $title, $description]) {
            DB::table('course_categories')->updateOrInsert(['slug' => $slug], ['title' => $title, 'description' => $description, 'position' => $position, 'published' => true, 'created_at' => now(), 'updated_at' => now()]);
        }
        $animalCategory = DB::table('course_categories')->where('slug', 'animal-livestock')->first();
        if ($animalCategory) {
            $specialties = [
                ['animal', 'الإنتاج الحيواني', 'دورات تطبيقية في تربية وتغذية ورعاية المجترات.', 'دورات قطاع الإنتاج الحيواني'],
                ['poultry', 'الإنتاج الداجني', 'برامج دجاج التسمين والبياض والأمهات والعنابر.', 'دورات قطاع الإنتاج الداجني'],
                ['fish', 'الإنتاج السمكي', 'الاستزراع المكثف وجودة المياه وتغذية الأسماك.', 'دورات قطاع الإنتاج السمكي'],
            ];
            foreach ($specialties as $position => [$slug, $title, $description, $hero]) {
                DB::table('course_specialties')->updateOrInsert(['category_id' => $animalCategory->id, 'slug' => $slug], ['title' => $title, 'description' => $description, 'hero_title' => $hero, 'hero_subtitle' => $description, 'position' => $position, 'published' => true, 'created_at' => now(), 'updated_at' => now()]);
            }
            $animalSpecialty = DB::table('course_specialties')->where(['category_id' => $animalCategory->id, 'slug' => 'animal'])->first();
            if ($animalSpecialty) {
                $courses = [
                    ['dairy-cattle', 'كورس إدارة وتغذية مزارع أبقار الحليب', 'د. مصطفى الشناوي', '36 ساعة تدريبية (6 أسابيع)', 'إنتاج الحليب والألبان', 'تدريب معتمد + حقل', ['حساب الاحتياجات الغذائية وتركيب العلائق وحفظ السيلاج.', 'تشغيل وإدارة المحالب الآلية ومعايير جودة الحليب.', 'دورات التناسل والتلقيح الاصطناعي ومتابعة العشار.', 'إدارة قطعان الفطام والعجلات البديلة.']],
                    ['beef-fattening', 'كورس اقتصاديات وتسمين العجول والمجترات', 'م. أحمد عبد الرازق', '30 ساعة تدريبية (5 أسابيع)', 'إنتاج اللحوم الحمراء', 'تدريب معتمد + حقل', ['اختيار وشراء عجول التسمين واختبارات الصحة الأولية.', 'برامج التعليف التدريجي ومعدلات التحويل اليومية.', 'الإجراءات الوقائية وبرامج التحصينات.', 'دراسات الجدوى وحساب تكلفة الإنتاج.']],
                    ['sheep-goats', 'كورس الإنتاج المكثف للأغنام والماعز', 'د. هاني سلامة', '24 ساعة تدريبية (4 أسابيع)', 'المجترات الصغيرة', 'تدريب معتمد + حقل', ['السلالات التجارية المناسبة للتربية المكثفة.', 'برامج الدفع الغذائي ورفع الخصوبة.', 'نظم الإيواء والتهوية والتحكم الحراري.', 'الرعاية البيطرية للمواليد وبرامج التحصين.']],
                ];
                foreach ($courses as $position => [$slug, $title, $trainer, $duration, $badge, $format, $modules]) {
                    DB::table('courses')->updateOrInsert(['specialty_id' => $animalSpecialty->id, 'slug' => $slug], ['title' => $title, 'summary' => $badge, 'trainer' => $trainer, 'duration' => $duration, 'badge' => $badge, 'format' => $format, 'position' => $position, 'published' => true, 'created_at' => now(), 'updated_at' => now()]);
                    $course = DB::table('courses')->where(['specialty_id' => $animalSpecialty->id, 'slug' => $slug])->first();
                    if ($course && DB::table('course_modules')->where('course_id', $course->id)->count() === 0) foreach ($modules as $modulePosition => $body) DB::table('course_modules')->insert(['course_id' => $course->id, 'body' => $body, 'position' => $modulePosition, 'created_at' => now(), 'updated_at' => now()]);
                }
            }
        }
    }
}
