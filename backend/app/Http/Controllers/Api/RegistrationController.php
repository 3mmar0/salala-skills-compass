<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate(['courseId'=>['required','integer','exists:courses,id'],'fullName'=>['required','string','min:3','max:255'],'age'=>['required','integer','between:15,80'],'status'=>['required','string','max:100'],'university'=>['nullable','string','max:255'],'faculty'=>['nullable','string','max:255'],'graduationYear'=>['nullable','string','max:40'],'workplace'=>['nullable','string','max:255'],'jobTitle'=>['nullable','string','max:255'],'schedule'=>['required','string','max:255'],'country'=>['required','string','max:100'],'governorate'=>['nullable','string','max:100'],'phone'=>['required','string','min:8','max:50'],'email'=>['required','email','max:255']]);
        $course = DB::table('courses')->find($data['courseId']);
        $id = DB::table('course_registrations')->insertGetId(['course_id'=>$course->id,'course_title'=>$course->title,'full_name'=>$data['fullName'],'age'=>$data['age'],'status'=>$data['status'],'university'=>$data['university']??null,'faculty'=>$data['faculty']??null,'graduation_year'=>$data['graduationYear']??null,'workplace'=>$data['workplace']??null,'job_title'=>$data['jobTitle']??null,'schedule'=>$data['schedule'],'country'=>$data['country'],'governorate'=>$data['governorate']??null,'phone'=>$data['phone'],'email'=>$data['email'],'state'=>'new','created_at'=>now(),'updated_at'=>now()]);
        return response()->json(['id'=>$id,'message'=>'تم استلام طلب التسجيل بنجاح.'], 201);
    }
    public function index(Request $request) { $state=$request->query('state'); $query=DB::table('course_registrations')->orderByDesc('created_at'); if($state) $query->where('state',$state); return response()->json(['registrations'=>$query->paginate(30)]); }
    public function update(Request $request, int $id) { $data=$request->validate(['state'=>['required','in:new,contacted,accepted,closed']]); DB::table('course_registrations')->where('id',$id)->update(['state'=>$data['state'],'updated_at'=>now()]); return response()->json(DB::table('course_registrations')->find($id)); }
}
