<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Helpdesk extends Model
{
    use HasFactory;

    protected $table = 'helpdesks';

    protected $fillable = [
        'id_user', 'keluhan', 'tanggal', 'description', 'foto',
    ];

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
}
