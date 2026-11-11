<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\InstitutionSettingFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstitutionSetting extends Model
{
    /** @use HasFactory<InstitutionSettingFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'has_jurusan' => 'boolean',
            'fitur_ppdb' => 'boolean',
            'fitur_pkl' => 'boolean',
        ];
    }

    /**
     * Get the active/current institution profile (singleton pattern).
     */
    public static function current(): self
    {
        return static::firstOrCreate([], [
            'nama_institusi' => 'SMK Negeri 1 Padaherang',
            'jenjang' => 'SMK',
            'kurikulum_aktif' => 'merdeka',
            'has_jurusan' => true,
            'fitur_ppdb' => true,
            'fitur_pkl' => true,
        ]);
    }

    /**
     * List available educational tiers.
     *
     * @return array<string, string>
     */
    public static function educationalTiers(): array
    {
        return [
            'SD' => 'Sekolah Dasar (SD)',
            'MI' => 'Madrasah Ibtidaiyah (MI)',
            'SMP' => 'Sekolah Menengah Pertama (SMP)',
            'MTs' => 'Madrasah Tsanawiyah (MTs)',
            'SMA' => 'Sekolah Menengah Atas (SMA)',
            'MA' => 'Madrasah Aliyah (MA)',
            'SMK' => 'Sekolah Menengah Kejuruan (SMK)',
            'MAK' => 'Madrasah Aliyah Kejuruan (MAK)',
        ];
    }

    /**
     * Check if institution has vocational/major programs.
     */
    public function hasMajors(): bool
    {
        return in_array($this->jenjang, ['SMA', 'MA', 'SMK', 'MAK'], true) && $this->has_jurusan;
    }

    /**
     * Get applicable grade levels for this institution's tier.
     *
     * @return array<int, string>
     */
    public function gradeLevels(): array
    {
        return match ($this->jenjang) {
            'SD', 'MI' => [
                1 => 'Kelas 1',
                2 => 'Kelas 2',
                3 => 'Kelas 3',
                4 => 'Kelas 4',
                5 => 'Kelas 5',
                6 => 'Kelas 6',
            ],
            'SMP', 'MTs' => [
                7 => 'Kelas 7',
                8 => 'Kelas 8',
                9 => 'Kelas 9',
            ],
            default => [
                10 => 'Kelas 10',
                11 => 'Kelas 11',
                12 => 'Kelas 12',
            ],
        };
    }
}
