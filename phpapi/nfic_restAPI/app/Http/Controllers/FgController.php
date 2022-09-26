<?php

namespace App\Http\Controllers;

use App\Models\FG;
use App\Models\WarehouseModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FgController extends Controller
{
    public function index()
    {

        $fglist = DB::table('finished_goods')->get();
        return response()->json($fglist);
    }
    public
    function storeFG(Request $request)
    {
        $fg = new FG();
        $fg->Product_name = $request->input('pname');
        $fg->Packaging_in_kls = $request->input('psize');
        $fg->Quantity = $request->input('iquantity');
        $fg->save();
        
        /*
        $fg = new FG();
        $fg->Product_name = $request->fgname;
        $fg->Packaging_in_kls = $request->pkilos;
        $fg->Quantity = $request->quantity;
        $fg->repros = '0';
        $fg->bin_content = '1';
        $fg->save();
        return response()->json('Success');*/
    }
}
