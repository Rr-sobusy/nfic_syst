<?php

namespace App\Http\Controllers;

use App\Models\Macro;
use App\Models\Micro;
use Illuminate\Http\Request;


class UpdateController extends Controller
{
    public function addPendingMacro(Request $request)
    {
        $macro = Macro::where('rawmat_name', $request->input('rawmatName'))
            ->update(['bin_content' => $request->input('quantity')]);
    }

    public function addPendingMicro(Request $request)
    {
        $micro = Micro::where('micro_name', $request->input('microName'))
            ->update(['pending' => $request->input('quantitymicro')]);
    }
}
