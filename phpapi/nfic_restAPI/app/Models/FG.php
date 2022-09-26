<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FG extends Model
{
    use HasFactory;
    protected $table = 'finished_goods';
    public $timestamps = false;
}
