<?php

declare(strict_types=1);

namespace App\Filament\Resources\Grades;

use App\Filament\Resources\Grades\Pages\ManageGrades;
use App\Models\AcademicYear;
use App\Models\Grade;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\HtmlString;
use UnitEnum;

class GradeResource extends Resource
{
    protected static ?string $model = Grade::class;

    protected static ?string $navigationLabel = 'Penilaian & Rapor';

    protected static ?string $modelLabel = 'Nilai Siswa';

    protected static ?string $pluralModelLabel = 'Penilaian & Rapor';

    protected static string|UnitEnum|null $navigationGroup = 'Pembelajaran & Asesmen';

    protected static ?int $navigationSort = 4;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentChartBar;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Penilaian & Asesmen')
                    ->description('Kelola capaian nilai formatif dan sumatif peserta didik')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('tahun_ajaran_id')
                                ->label('Tahun Ajaran')
                                ->relationship('academicYear', 'tahun')
                                ->required()
                                ->default(fn () => AcademicYear::active()->first()?->id),

                            Select::make('kelas_id')
                                ->label('Kelas / Rombel')
                                ->relationship('classroom', 'nama_kelas')
                                ->required()
                                ->searchable()
                                ->preload(),
                        ]),

                        Grid::make(2)->schema([
                            Select::make('siswa_id')
                                ->label('Peserta Didik')
                                ->relationship('student', 'nama_lengkap')
                                ->required()
                                ->searchable()
                                ->preload(),

                            Select::make('mata_pelajaran_id')
                                ->label('Mata Pelajaran')
                                ->relationship('subject', 'nama_mapel')
                                ->required()
                                ->searchable()
                                ->preload(),
                        ]),

                        Grid::make(2)->schema([
                            Select::make('jenis_asesmen')
                                ->label('Jenis Asesmen / Ujian')
                                ->options([
                                    'Formatif' => 'Formatif',
                                    'Sumatif Lingkup Materi' => 'Sumatif Lingkup Materi (TP)',
                                    'Sumatif Akhir Semester' => 'Sumatif Akhir Semester (SAS / PAS)',
                                    'Tugas Harian' => 'Tugas Mandiri / Harian',
                                    'PTS' => 'Penilaian Tengah Semester (PTS)',
                                ])
                                ->required()
                                ->default('Sumatif Lingkup Materi'),

                            TextInput::make('nilai')
                                ->label('Nilai Angka (Skala 0 - 100)')
                                ->numeric()
                                ->minValue(0)
                                ->maxValue(100)
                                ->step(0.01)
                                ->required(),
                        ]),

                        Textarea::make('capaian_kompetensi')
                            ->label('Deskripsi Capaian Kompetensi (Masuk Rapor)')
                            ->placeholder('Contoh: Menunjukkan penguasaan sangat baik dalam konsep dasar pemrograman web')
                            ->rows(2),

                        TextInput::make('catatan')
                            ->label('Catatan Pendidik')
                            ->placeholder('Pertahankan motivasi belajar'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('student.nama_lengkap')
                    ->label('Peserta Didik')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('classroom.nama_kelas')
                    ->label('Kelas')
                    ->badge()
                    ->color('info')
                    ->sortable(),

                TextColumn::make('subject.nama_mapel')
                    ->label('Mata Pelajaran')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('jenis_asesmen')
                    ->label('Jenis Asesmen')
                    ->badge()
                    ->color('primary')
                    ->sortable(),

                TextColumn::make('nilai')
                    ->label('Nilai')
                    ->badge()
                    ->color(fn (float $state): string => $state >= 75 ? 'success' : 'danger')
                    ->formatStateUsing(fn ($state): string => number_format((float) $state, 1))
                    ->sortable(),

                TextColumn::make('capaian_kompetensi')
                    ->label('Capaian Rapor')
                    ->limit(40)
                    ->placeholder('-'),
            ])
            ->filters([
                SelectFilter::make('kelas_id')
                    ->label('Kelas')
                    ->relationship('classroom', 'nama_kelas'),

                SelectFilter::make('mata_pelajaran_id')
                    ->label('Mata Pelajaran')
                    ->relationship('subject', 'nama_mapel'),

                SelectFilter::make('jenis_asesmen')
                    ->label('Jenis Asesmen')
                    ->options([
                        'Formatif' => 'Formatif',
                        'Sumatif Lingkup Materi' => 'Sumatif Lingkup Materi',
                        'Sumatif Akhir Semester' => 'Sumatif Akhir Semester',
                    ]),
            ])
            ->recordActions([
                Action::make('cetak_rapor')
                    ->label('Pratinjau Rapor')
                    ->icon(Heroicon::OutlinedPrinter)
                    ->color('info')
                    ->modalHeading(fn (Grade $record): string => 'Pratinjau Transkrip Nilai - '.$record->student?->nama_lengkap)
                    ->modalContent(function (Grade $record): HtmlString {
                        $student = $record->student;
                        $class = $record->classroom?->nama_kelas ?? '-';
                        $grades = Grade::with('subject')
                            ->where('siswa_id', $record->siswa_id)
                            ->where('tahun_ajaran_id', $record->tahun_ajaran_id)
                            ->get();

                        $rows = '';
                        $total = 0;
                        $count = $grades->count();

                        foreach ($grades as $g) {
                            $mapel = $g->subject?->nama_mapel ?? '-';
                            $kkm = $g->subject?->kkm ?? 75;
                            $val = number_format((float) $g->nilai, 1);
                            $total += (float) $g->nilai;
                            $status = (float) $g->nilai >= $kkm ? '<span style="color: #16a34a; font-weight: bold;">Tuntas</span>' : '<span style="color: #dc2626; font-weight: bold;">Belum Tuntas</span>';

                            $rows .= "<tr>
                                <td style='padding: 8px; border: 1px solid #e5e7eb;'>{$mapel}</td>
                                <td style='padding: 8px; border: 1px solid #e5e7eb; text-align: center;'>{$kkm}</td>
                                <td style='padding: 8px; border: 1px solid #e5e7eb; text-align: center;'>{$g->jenis_asesmen}</td>
                                <td style='padding: 8px; border: 1px solid #e5e7eb; text-align: center; font-weight: bold;'>{$val}</td>
                                <td style='padding: 8px; border: 1px solid #e5e7eb; text-align: center;'>{$status}</td>
                            </tr>";
                        }

                        $avg = $count > 0 ? number_format($total / $count, 2) : '0';

                        return new HtmlString("
                            <div style='font-family: sans-serif; line-height: 1.5;'>
                                <div style='text-align: center; margin-bottom: 16px; border-bottom: 2px solid #333; padding-bottom: 8px;'>
                                    <h3 style='margin: 0; font-size: 18px; font-weight: bold;'>RAPOR TRANSKRIP HASIL BELAJAR SISWA</h3>
                                    <p style='margin: 4px 0 0; font-size: 13px; color: #666;'>Sistem Informasi Manajemen Sekolah Terpadu (SIMAT)</p>
                                </div>
                                <table style='width: 100%; font-size: 13px; margin-bottom: 16px;'>
                                    <tr>
                                        <td style='width: 120px; font-weight: bold;'>Nama Siswa</td><td>: {$student?->nama_lengkap}</td>
                                        <td style='width: 100px; font-weight: bold;'>Kelas</td><td>: {$class}</td>
                                    </tr>
                                    <tr>
                                        <td style='font-weight: bold;'>NISN / NIS</td><td>: {$student?->nisn} / {$student?->nis}</td>
                                        <td style='font-weight: bold;'>Rata-rata Nilai</td><td>: <strong>{$avg}</strong></td>
                                    </tr>
                                </table>
                                <table style='width: 100%; border-collapse: collapse; font-size: 13px;'>
                                    <thead>
                                        <tr style='background: #f3f4f6;'>
                                            <th style='padding: 8px; border: 1px solid #e5e7eb; text-align: left;'>Mata Pelajaran</th>
                                            <th style='padding: 8px; border: 1px solid #e5e7eb;'>KKM</th>
                                            <th style='padding: 8px; border: 1px solid #e5e7eb;'>Asesmen</th>
                                            <th style='padding: 8px; border: 1px solid #e5e7eb;'>Nilai</th>
                                            <th style='padding: 8px; border: 1px solid #e5e7eb;'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {$rows}
                                    </tbody>
                                </table>
                            </div>
                        ");
                    })
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Tutup'),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageGrades::route('/'),
        ];
    }
}
