<?php

namespace App\Http\Controllers;

use App\Models\Macro;
use App\Models\Micro;
use App\Models\FG;
use Illuminate\Http\Request;

class InsertController extends Controller
{
    public function insertNewMicro(Request $request)
    {
        $newmicro = new Micro();

        $newmicro->micro_name = $request->input('microName');
        $newmicro->type = 'Micro';
        $newmicro->current_stocks = $request->input('initialStock');
        $newmicro->pending = '0';
        $result = $newmicro->save();
        if ($result) {
            echo 'saved';
        } else {
            echo 'not saved';
        }
    }

    public function insertNewMacro(Request $request)
    {
        $newmacro = new Macro();

        $newmacro->rawmat_name = $request->input('macroName');
        $newmacro->rawmat_type = 'Macro';
        $newmacro->current_stocks = $request->input('initialStock');
        $newmacro->bin_content = '0';
        $result = $newmacro->save();
        if ($result) {
            echo 'saved';
        } else {
            echo 'not saved';
        }
    }

    public function insertNewFg(Request $request)
    {
        $fg = new FG();
        $fg->Product_name = $request->input('pname');
        $fg->Packaging_in_kls = $request->input('psize');
        $fg->Quantity = $request->input('iquantity');
        $fg->repros = '0';
        $fg->bin_content = '0';
        $fg->save();
    }
}
