<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\TeacherFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Teacher extends Model
{
    /** @use HasFactory<TeacherFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return HasOne<Classroom, $this>
     */
    public function homeroomClass(): HasOne
    {
        return $this->hasOne(Classroom::class, 'guru_id');
    }

    /**
     * Get full name with titles.
     *
     * @return Attribute<string, never>
     */
    protected function namaGelar(): Attribute
    {
        return Attribute::make(
            get: function (): string {
                $front = $this->gelar_depan ? trim($this->gelar_depan).' ' : '';
                $back = $this->gelar_belakang ? ', '.trim($this->gelar_belakang) : '';

                return $front.$this->nama_lengkap.$back;
            }
        );
    }
}
