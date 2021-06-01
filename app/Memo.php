<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Memo extends Model
{
    protected $table="memos";
    protected $fillable = [
        'title', 'text',"isFavorite" ,'create_at','updated_at'
    ];

   
}
