<?php

declare(strict_types=1);

namespace App\Filament\Resources\PpdbApplicants;

use App\Filament\Resources\PpdbApplicants\Pages\ManagePpdbApplicants;
use App\Models\PpdbApplicant;
use App\Models\PpdbWave;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;
use Symfony\Component\HttpFoundation\StreamedResponse;
use UnitEnum;

class PpdbApplicantResource extends Resource
{
    protected static ?string $model = PpdbApplicant::class;

    protected static ?string $navigationLabel = 'Pendaftar Calon Siswa';

    protected static ?string $modelLabel = 'Calon Siswa PPDB';

    protected static ?string $pluralModelLabel = 'Pendaftar Calon Siswa';

    protected static string|UnitEnum|null $navigationGroup = 'PPDB Online';

    protected static ?int $navigationSort = 2;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedIdentification;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Pendaftaran & Gelombang')
                    ->schema([
                        Grid::make(3)->schema([
                            Select::make('ppdb_wave_id')
                                ->label('Gelombang PPDB')
                                ->relationship('wave', 'nama_gelombang')
                                ->required()
                                ->default(fn () => PpdbWave::open()->first()?->id ?? PpdbWave::first()?->id),

                            TextInput::make('nomor_pendaftaran')
                                ->label('Nomor Registrasi')
                                ->default(fn () => PpdbApplicant::generateNomorPendaftaran())
                                ->required()
                                ->unique(ignoreRecord: true),

                            Select::make('jalur_pendaftaran')
                                ->label('Jalur Masuk')
                                ->options([
                                    'reguler' => 'Reguler / Umum',
                                    'prestasi' => 'Jalur Prestasi Akademik & Non-Akademik',
                                    'afirmasi' => 'Jalur Afirmasi (KIP / KPS / PKH)',
                                    'zonasi' => 'Jalur Zonasi Wilayah',
                                    'perpindahan_ortu' => 'Jalur Perpindahan Tugas Orang Tua',
                                    'tes' => 'Jalur Tes Bakat Skolastik',
                                ])
                                ->required()
                                ->default('reguler'),
                        ]),
                    ]),

                Section::make('Data Calon Siswa')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('nisn')
                                ->label('NISN (10 Digit)')
                                ->length(10)
                                ->required(),

                            TextInput::make('nik')
                                ->label('NIK Kependudukan (16 Digit)')
                                ->length(16)
                                ->required(),

                            TextInput::make('nama_calon_siswa')
                                ->label('Nama Lengkap Siswa')
                                ->required(),
                        ]),

                        Grid::make(4)->schema([
                            Select::make('jenis_kelamin')
                                ->label('Jenis Kelamin')
                                ->options([
                                    'L' => 'Laki-laki',
                                    'P' => 'Perempuan',
                                ])
                                ->required()
                                ->default('L'),

                            TextInput::make('tempat_lahir')
                                ->label('Tempat Lahir')
                                ->required(),

                            DatePicker::make('tanggal_lahir')
                                ->label('Tanggal Lahir')
                                ->required(),

                            TextInput::make('agama')
                                ->label('Agama')
                                ->default('Islam')
                                ->required(),
                        ]),

                        Grid::make(3)->schema([
                            TextInput::make('asal_sekolah')
                                ->label('Asal Sekolah (SMP/MTs)')
                                ->required(),

                            Select::make('jurusan_pilihan_1')
                                ->label('Pilihan Jurusan 1')
                                ->relationship('firstMajorChoice', 'nama_jurusan')
                                ->searchable()
                                ->preload()
                                ->nullable(),

                            Select::make('jurusan_pilihan_2')
                                ->label('Pilihan Jurusan 2')
                                ->relationship('secondMajorChoice', 'nama_jurusan')
                                ->searchable()
                                ->preload()
                                ->nullable(),
                        ]),
                    ]),

                Section::make('Data Wali & Kontak')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('nama_wali')
                                ->label('Nama Orang Tua / Wali')
                                ->required(),

                            TextInput::make('hubungan_wali')
                                ->label('Hubungan Keluarga')
                                ->default('Ayah Kandung')
                                ->required(),

                            TextInput::make('nomor_whatsapp_wali')
                                ->label('No. WhatsApp Aktif')
                                ->tel()
                                ->required(),
                        ]),

                        TextInput::make('pekerjaan_wali')
                            ->label('Pekerjaan Orang Tua / Wali'),

                        Textarea::make('alamat')
                            ->label('Alamat Tempat Tinggal Lengkap')
                            ->rows(3)
                            ->required(),
                    ]),

                Section::make('Unggah Dokumen Berkas Pendukung')
                    ->description('Unggah dokumen berupa file JPG/PNG atau PDF')
                    ->schema([
                        Grid::make(2)->schema([
                            FileUpload::make('berkas_kartu_keluarga')
                                ->label('Kartu Keluarga (KK)')
                                ->directory('ppdb-documents')
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),

                            FileUpload::make('berkas_akta_kelahiran')
                                ->label('Akta Kelahiran')
                                ->directory('ppdb-documents')
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),

                            FileUpload::make('berkas_ijazah_skl')
                                ->label('Ijazah / SKL (Surat Keterangan Lulus)')
                                ->directory('ppdb-documents')
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),

                            FileUpload::make('berkas_rapor_prestasi')
                                ->label('Rapor / Sertifikat Prestasi (Opsional)')
                                ->directory('ppdb-documents')
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
                        ]),
                    ]),

                Section::make('Verifikasi & Putusan Panitia')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('status_seleksi')
                                ->label('Status Seleksi PPDB')
                                ->options([
                                    'menunggu_verifikasi' => 'Menunggu Verifikasi',
                                    'berkas_sesuai' => 'Berkas Sesuai (Lolos Administrasi)',
                                    'perlu_perbaikan' => 'Perlu Perbaikan Berkas',
                                    'diterima' => 'Diterima (Lulus Seleksi)',
                                    'tidak_diterima' => 'Tidak Diterima',
                                ])
                                ->required()
                                ->default('menunggu_verifikasi'),

                            Select::make('diverifikasi_oleh')
                                ->label('Verifikator')
                                ->relationship('verifiedBy', 'name')
                                ->searchable()
                                ->preload()
                                ->nullable(),
                        ]),

                        Textarea::make('catatan_panitia')
                            ->label('Catatan Panitia Seleksi')
                            ->placeholder('Catatan atau alasan verifikasi/revisi untuk calon siswa')
                            ->rows(2),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction('verifikasi_berkas')
            ->columns([
                TextColumn::make('nomor_pendaftaran')
                    ->label('No. Registrasi')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->copyable()
                    ->sortable(),

                TextColumn::make('nama_calon_siswa')
                    ->label('Nama Calon Siswa')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('asal_sekolah')
                    ->label('Asal Sekolah')
                    ->searchable()
                    ->limit(25),

                TextColumn::make('jalur_pendaftaran')
                    ->label('Jalur')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'prestasi' => 'warning',
                        'afirmasi' => 'info',
                        'zonasi' => 'primary',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->sortable(),

                TextColumn::make('firstMajorChoice.singkatan')
                    ->label('Pilihan 1')
                    ->badge()
                    ->color('primary')
                    ->placeholder('-'),

                TextColumn::make('status_seleksi')
                    ->label('Status Seleksi')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'berkas_sesuai' => 'info',
                        'diterima' => 'success',
                        'perlu_perbaikan' => 'warning',
                        'tidak_diterima' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'berkas_sesuai' => 'Berkas Sesuai',
                        'diterima' => 'Diterima',
                        'perlu_perbaikan' => 'Perlu Perbaikan',
                        'tidak_diterima' => 'Tidak Diterima',
                        default => 'Menunggu Verifikasi',
                    })
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label('Tanggal Daftar')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('ppdb_wave_id')
                    ->label('Gelombang PPDB')
                    ->relationship('wave', 'nama_gelombang'),

                SelectFilter::make('jalur_pendaftaran')
                    ->label('Jalur Pendaftaran')
                    ->options([
                        'reguler' => 'Reguler',
                        'prestasi' => 'Prestasi',
                        'afirmasi' => 'Afirmasi',
                        'zonasi' => 'Zonasi',
                        'perpindahan_ortu' => 'Perpindahan Orang Tua',
                        'tes' => 'Tes Skolastik',
                    ]),

                SelectFilter::make('status_seleksi')
                    ->label('Status Seleksi')
                    ->options([
                        'menunggu_verifikasi' => 'Menunggu Verifikasi',
                        'berkas_sesuai' => 'Berkas Sesuai',
                        'perlu_perbaikan' => 'Perlu Perbaikan',
                        'diterima' => 'Diterima',
                        'tidak_diterima' => 'Tidak Diterima',
                    ]),

                SelectFilter::make('jurusan_pilihan_1')
                    ->label('Jurusan Pilihan 1')
                    ->relationship('firstMajorChoice', 'nama_jurusan'),
            ])
            ->recordActions([
                Action::make('verifikasi_berkas')
                    ->label('Periksa Berkas')
                    ->icon(Heroicon::OutlinedDocumentMagnifyingGlass)
                    ->color('info')
                    ->modalHeading(fn (PpdbApplicant $record): string => 'Verifikasi Berkas Calon Siswa - '.$record->nama_calon_siswa.' ('.$record->nomor_pendaftaran.')')
                    ->modalContent(function (PpdbApplicant $record): HtmlString {
                        $docs = [
                            'Kartu Keluarga (KK)' => $record->berkas_kartu_keluarga,
                            'Akta Kelahiran' => $record->berkas_akta_kelahiran,
                            'Ijazah / SKL' => $record->berkas_ijazah_skl,
                            'Rapor / Prestasi' => $record->berkas_rapor_prestasi,
                        ];

                        $html = '<div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.875rem;">';
                        $html .= '<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0.875rem;">';
                        $html .= '<p><strong>Asal Sekolah:</strong> '.e($record->asal_sekolah).'</p>';
                        $html .= '<p><strong>NISN:</strong> '.e($record->nisn).' | <strong>NIK:</strong> '.e($record->nik).'</p>';
                        $html .= '<p><strong>Nama Wali:</strong> '.e($record->nama_wali).' ('.e($record->hubungan_wali).') - WA: '.e($record->nomor_whatsapp_wali).'</p>';
                        $html .= '</div>';

                        $html .= '<h4 style="font-weight: 700; color: #1e293b; margin-top: 0.5rem;">Dokumen Pendukung:</h4>';
                        $html .= '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;">';

                        foreach ($docs as $title => $path) {
                            $html .= '<div style="border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.75rem; background: #ffffff;">';
                            $html .= '<div style="font-weight: 600; margin-bottom: 0.5rem; color: #334155;">'.e($title).'</div>';

                            if ($path) {
                                $url = str_starts_with($path, 'http') ? $path : Storage::disk('public')->url($path);
                                $isImg = preg_match('/\.(jpg|jpeg|png|webp|gif)$/i', $path);

                                if ($isImg) {
                                    $html .= '<a href="'.e($url).'" target="_blank" rel="noopener noreferrer"><img src="'.e($url).'" alt="'.e($title).'" style="max-height: 140px; border-radius: 0.375rem; object-fit: cover; width: 100%; border: 1px solid #e2e8f0;"/></a>';
                                } else {
                                    $html .= '<a href="'.e($url).'" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 0.375rem 0.75rem; background-color: #3b82f6; color: white; border-radius: 0.375rem; text-decoration: none; font-size: 0.75rem; font-weight: 600;">Lihat Dokumen PDF / Unduh</a>';
                                }
                            } else {
                                $html .= '<span style="color: #94a3b8; font-style: italic; font-size: 0.75rem;">Tidak diunggah</span>';
                            }

                            $html .= '</div>';
                        }

                        $html .= '</div></div>';

                        return new HtmlString($html);
                    })
                    ->form([
                        Select::make('status_seleksi')
                            ->label('Update Status Seleksi')
                            ->options([
                                'berkas_sesuai' => 'Berkas Sesuai (Lolos Administrasi)',
                                'diterima' => 'Diterima (Lulus Seleksi Penuh)',
                                'perlu_perbaikan' => 'Perlu Perbaikan / Revisi Berkas',
                                'tidak_diterima' => 'Tidak Diterima',
                            ])
                            ->required(),

                        Textarea::make('catatan_panitia')
                            ->label('Catatan Panitia untuk Calon Siswa')
                            ->placeholder('Tuliskan catatan verifikasi atau kekurangan dokumen yang perlu dilengkapi...')
                            ->rows(3),
                    ])
                    ->fillForm(fn (PpdbApplicant $record): array => [
                        'status_seleksi' => $record->status_seleksi === 'menunggu_verifikasi' ? 'berkas_sesuai' : $record->status_seleksi,
                        'catatan_panitia' => $record->catatan_panitia,
                    ])
                    ->action(function (PpdbApplicant $record, array $data): void {
                        $record->update([
                            'status_seleksi' => $data['status_seleksi'],
                            'catatan_panitia' => $data['catatan_panitia'],
                            'diverifikasi_oleh' => auth()->id(),
                            'diverifikasi_pada' => now(),
                        ]);

                        Notification::make()
                            ->title('Status Verifikasi Berhasil Diperbarui')
                            ->success()
                            ->send();
                    }),

                Action::make('terima_siswa')
                    ->label('Terima')
                    ->icon(Heroicon::OutlinedCheckCircle)
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Terima Calon Siswa')
                    ->modalDescription(fn (PpdbApplicant $record): string => 'Apakah Anda yakin ingin menyatakan '.$record->nama_calon_siswa.' DITERIMA sebagai peserta didik baru?')
                    ->action(function (PpdbApplicant $record): void {
                        $record->update([
                            'status_seleksi' => 'diterima',
                            'catatan_panitia' => 'Selamat! Anda dinyatakan LULUS seleksi PPDB.',
                            'diverifikasi_oleh' => auth()->id(),
                            'diverifikasi_pada' => now(),
                        ]);

                        Notification::make()
                            ->title('Calon siswa dinyatakan Diterima')
                            ->success()
                            ->send();
                    }),

                Action::make('minta_revisi')
                    ->label('Revisi')
                    ->icon(Heroicon::OutlinedExclamationTriangle)
                    ->color('warning')
                    ->form([
                        Textarea::make('catatan_panitia')
                            ->label('Alasan / Bagian yang Perlu Direvisi')
                            ->required()
                            ->placeholder('Contoh: Berkas kartu keluarga buram/tidak terbaca, harap perbarui.'),
                    ])
                    ->action(function (PpdbApplicant $record, array $data): void {
                        $record->update([
                            'status_seleksi' => 'perlu_perbaikan',
                            'catatan_panitia' => $data['catatan_panitia'],
                            'diverifikasi_oleh' => auth()->id(),
                            'diverifikasi_pada' => now(),
                        ]);

                        Notification::make()
                            ->title('Permintaan perbaikan berkas telah dicatat')
                            ->warning()
                            ->send();
                    }),

                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                Action::make('export_csv')
                    ->label('Ekspor Calon Siswa (CSV)')
                    ->icon(Heroicon::OutlinedArrowDownTray)
                    ->color('success')
                    ->action(function (): StreamedResponse {
                        $applicants = PpdbApplicant::with(['wave', 'firstMajorChoice', 'secondMajorChoice'])->get();

                        return response()->streamDownload(function () use ($applicants) {
                            $handle = fopen('php://output', 'w');
                            fwrite($handle, "\xEF\xBB\xBF");
                            fputcsv($handle, [
                                'No. Registrasi',
                                'Nama Calon Siswa',
                                'NISN',
                                'NIK',
                                'Jenis Kelamin',
                                'Tempat Lahir',
                                'Tanggal Lahir',
                                'Asal Sekolah',
                                'Gelombang',
                                'Jalur',
                                'Jurusan 1',
                                'Jurusan 2',
                                'Nama Wali',
                                'No WA Wali',
                                'Status Seleksi',
                                'Catatan Panitia',
                                'Tanggal Daftar',
                            ]);

                            foreach ($applicants as $app) {
                                fputcsv($handle, [
                                    $app->nomor_pendaftaran,
                                    $app->nama_calon_siswa,
                                    $app->nisn,
                                    $app->nik,
                                    $app->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan',
                                    $app->tempat_lahir,
                                    $app->tanggal_lahir?->format('d/m/Y') ?? '',
                                    $app->asal_sekolah,
                                    $app->wave?->nama_gelombang ?? '',
                                    ucfirst($app->jalur_pendaftaran),
                                    $app->firstMajorChoice?->nama_jurusan ?? '-',
                                    $app->secondMajorChoice?->nama_jurusan ?? '-',
                                    $app->nama_wali,
                                    $app->nomor_whatsapp_wali,
                                    $app->status_label,
                                    $app->catatan_panitia ?? '',
                                    $app->created_at?->format('d/m/Y H:i') ?? '',
                                ]);
                            }

                            fclose($handle);
                        }, 'rekapitulasi-ppdb-'.date('Ymd-His').'.csv', [
                            'Content-Type' => 'text/csv; charset=UTF-8',
                        ]);
                    }),

                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManagePpdbApplicants::route('/'),
        ];
    }
}
