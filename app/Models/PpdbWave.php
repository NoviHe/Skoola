<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\PpdbWaveFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PpdbWave extends Model
{
    /** @use HasFactory<PpdbWaveFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tanggal_buka' => 'date',
            'tanggal_tutup' => 'date',
            'kuota' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<AcademicYear, $this>
     */
    public function academicYear(): BelongsTo
    {
        return $this->belongsTo(AcademicYear::class, 'tahun_ajaran_id');
    }

    /**
     * @return HasMany<PpdbApplicant, $this>
     */
    public function applicants(): HasMany
    {
        return $this->hasMany(PpdbApplicant::class, 'ppdb_wave_id');
    }

    /**
     * Scope query to only active waves.
     *
     * @param  Builder<PpdbWave>  $query
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', true);
    }

    /**
     * Scope query to currently open waves (active and within date range).
     *
     * @param  Builder<PpdbWave>  $query
     */
    public function scopeOpen(Builder $query): void
    {
        $today = now()->toDateString();
        $query->where('is_active', true)
            ->whereDate('tanggal_buka', '<=', $today)
            ->whereDate('tanggal_tutup', '>=', $today);
    }

    /**
     * Check if wave is currently open for registration.
     */
    public function isOpen(): bool
    {
        if (! $this->is_active) {
            return false;
        }

        $today = now()->startOfDay();

        return $today->gte($this->tanggal_buka->startOfDay()) && $today->lte($this->tanggal_tutup->endOfDay());
    }

    /**
     * Check if wave registration is yet to open.
     */
    public function isUpcoming(): bool
    {
        return $this->is_active && now()->startOfDay()->lt($this->tanggal_buka->startOfDay());
    }

    /**
     * Check if wave registration has closed.
     */
    public function isClosed(): bool
    {
        return ! $this->is_active || now()->startOfDay()->gt($this->tanggal_tutup->endOfDay());
    }
}
