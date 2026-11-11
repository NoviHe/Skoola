<?php

declare(strict_types=1);

namespace App\Filament\Resources\Attendances;

use App\Filament\Resources\Attendances\Pages\ManageAttendances;
use App\Models\AcademicYear;
use App\Models\Attendance;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
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
use UnitEnum;

class AttendanceResource extends Resource
{
    protected static ?string $model = Attendance::class;

    protected static ?string $navigationLabel = 'Presensi Siswa';

    protected static ?string $modelLabel = 'Presensi Siswa';

    protected static ?string $pluralModelLabel = 'Presensi Siswa';

    protected static string|UnitEnum|null $navigationGroup = 'Pembelajaran & Asesmen';

    protected static ?int $navigationSort = 3;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedClipboardDocumentCheck;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Pencatatan Presensi Harian')
                    ->description('Catat status kehadiran siswa per tanggal dan rombel')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('tahun_ajaran_id')
                                ->label('Tahun Ajaran')
                                ->relationship('academicYear', 'tahun')
                                ->required()
                                ->default(fn () => AcademicYear::active()->first()?->id),

                            DatePicker::make('tanggal')
                                ->label('Tanggal Presensi')
                                ->default(now())
                                ->required(),
                        ]),

                        Grid::make(2)->schema([
                            Select::make('kelas_id')
                                ->label('Kelas / Rombel')
                                ->relationship('classroom', 'nama_kelas')
                                ->required()
                                ->searchable()
                                ->preload(),

                            Select::make('siswa_id')
                                ->label('Nama Siswa')
                                ->relationship('student', 'nama_lengkap')
                                ->required()
                                ->searchable()
                                ->preload(),
                        ]),

                        Grid::make(2)->schema([
                            Select::make('status')
                                ->label('Status Kehadiran')
                                ->options([
                                    'hadir' => 'Hadir',
                                    'sakit' => 'Sakit',
                                    'izin' => 'Izin',
                                    'alpa' => 'Alpa (Tanpa Keterangan)',
                                ])
                                ->default('hadir')
                                ->required(),

                            TextInput::make('catatan')
                                ->label('Keterangan Tambahan')
                                ->placeholder('Contoh: Izin acara keluarga, Surat dokter terlampir'),
                        ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('tanggal')
                    ->label('Tanggal')
                    ->date('d M Y')
                    ->sortable(),

                TextColumn::make('classroom.nama_kelas')
                    ->label('Kelas')
                    ->badge()
                    ->color('info')
                    ->sortable(),

                TextColumn::make('student.nama_lengkap')
                    ->label('Nama Peserta Didik')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'hadir' => 'success',
                        'izin' => 'info',
                        'sakit' => 'warning',
                        'alpa' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('catatan')
                    ->label('Keterangan')
                    ->placeholder('-')
                    ->searchable(),
            ])
            ->filters([
                SelectFilter::make('kelas_id')
                    ->label('Kelas')
                    ->relationship('classroom', 'nama_kelas'),

                SelectFilter::make('status')
                    ->label('Status Kehadiran')
                    ->options([
                        'hadir' => 'Hadir',
                        'sakit' => 'Sakit',
                        'izin' => 'Izin',
                        'alpa' => 'Alpa',
                    ]),
            ])
            ->recordActions([
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
            'index' => ManageAttendances::route('/'),
        ];
    }
}
