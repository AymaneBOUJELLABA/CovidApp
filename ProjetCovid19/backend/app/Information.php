<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    protected $fillable = ['nom' , 'prenom' , 'age' , 'sexe' , 'adresse' , 'telephone' , 'ville'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}