<?php

namespace App\Http\Controllers;

use App\Models\FG;
use App\Models\Macro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SelectController extends Controller
{
    public function getFg()
    {
        $fg = FG::select('*')->get();
        return response()->json($fg);
    }

    public function getMicro()
    {
        $micro = DB::select("SELECT ID, micro_name, type, current_stocks,pending, CASE WHEN current_stocks <50 THEN '--CRITICAL--' ELSE  '' END annotation from micros ORDER BY `micro_name` ASC");
        return response()->json($micro);
    }

    public function getMacro()
    {
        $macro = DB::select("SELECT ID, rawmat_name, rawmat_type, current_stocks,bin_content, CASE WHEN current_stocks <4500 THEN '--CRITICAL--' ELSE  '' END annotation from raw_mats ORDER BY `rawmat_name` ASC");
        return response()->json(($macro));
    }

    public function getPackaging()
    {
        
    }

    
}
