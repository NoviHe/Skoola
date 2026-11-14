<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\PpdbApplicantFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PpdbApplicant extends Model
{
    /** @use HasFactory<PpdbApplicantFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tanggal_lahir' => 'date',
            'diverifikasi_pada' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<PpdbWave, $this>
     */
    public function wave(): BelongsTo
    {
        return $this->belongsTo(PpdbWave::class, 'ppdb_wave_id');
    }

    /**
     * @return BelongsTo<Major, $this>
     */
    public function firstMajorChoice(): BelongsTo
    {
        return $this->belongsTo(Major::class, 'jurusan_pilihan_1');
    }

    /**
     * @return BelongsTo<Major, $this>
     */
    public function secondMajorChoice(): BelongsTo
    {
        return $this->belongsTo(Major::class, 'jurusan_pilihan_2');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'diverifikasi_oleh');
    }

    /**
     * Scope query by verification status.
     *
     * @param  Builder<PpdbApplicant>  $query
     */
    public function scopeStatus(Builder $query, string $status): void
    {
        $query->where('status_seleksi', $status);
    }

    /**
     * Scope query by registration track.
     *
     * @param  Builder<PpdbApplicant>  $query
     */
    public function scopeJalur(Builder $query, string $jalur): void
    {
        $query->where('jalur_pendaftaran', $jalur);
    }

    /**
     * Generate unique registration number.
     * Format: PPDB-YYYY-XXXX (e.g. PPDB-2026-0001)
     */
    public static function generateNomorPendaftaran(): string
    {
        $year = date('Y');
        $prefix = "PPDB-{$year}-";

        $lastRecord = static::query()
            ->where('nomor_pendaftaran', 'LIKE', "{$prefix}%")
            ->orderByDesc('id')
            ->first();

        $nextNumber = 1;

        if ($lastRecord && preg_match('/-(\d+)$/', $lastRecord->nomor_pendaftaran, $matches)) {
            $nextNumber = ((int) $matches[1]) + 1;
        }

        return sprintf('%s%04d', $prefix, $nextNumber);
    }

    /**
     * Human readable status label in Indonesian.
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status_seleksi) {
            'berkas_sesuai' => 'Berkas Sesuai (Lolos Administrasi)',
            'perlu_perbaikan' => 'Perlu Perbaikan Berkas',
            'diterima' => 'Diterima (Lulus Seleksi)',
            'tidak_diterima' => 'Tidak Diterima',
            default => 'Menunggu Verifikasi',
        };
    }

    /**
     * Badge color for status.
     */
    public function getStatusColorAttribute(): string
    {
        return match ($this->status_seleksi) {
            'berkas_sesuai' => 'info',
            'perlu_perbaikan' => 'warning',
            'diterima' => 'success',
            'tidak_diterima' => 'danger',
            default => 'gray',
        };
    }
}
