<?php

declare(strict_types=1);

namespace App\Filament\Resources\Classrooms;

use App\Filament\Resources\Classrooms\Pages\ManageClassrooms;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\InstitutionSetting;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
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

class ClassroomResource extends Resource
{
    protected static ?string $model = Classroom::class;

    protected static ?string $navigationLabel = 'Rombongan Belajar (Kelas)';

    protected static ?string $modelLabel = 'Rombel / Kelas';

    protected static ?string $pluralModelLabel = 'Rombongan Belajar (Kelas)';

    protected static string|UnitEnum|null $navigationGroup = 'Master Akademik';

    protected static ?int $navigationSort = 3;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBuildingOffice2;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Pokok Rombongan Belajar')
                    ->description('Tentukan nama kelas, jenjang tingkat, dan tahun ajaran aktif')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('tahun_ajaran_id')
                                ->label('Tahun Ajaran')
                                ->relationship('academicYear', 'tahun')
                                ->required()
                                ->default(fn () => AcademicYear::active()->first()?->id),

                            Select::make('tingkat')
                                ->label('Tingkat / Tingkat Kelas')
                                ->options(function (): array {
                                    $levels = InstitutionSetting::current()->gradeLevels();

                                    return array_combine($levels, array_map(fn ($lvl) => "Tingkat {$lvl}", $levels));
                                })
                                ->required(),
                        ]),

                        Grid::make(2)->schema([
                            TextInput::make('nama_kelas')
                                ->label('Nama Kelas / Rombel')
                                ->placeholder('Contoh: X RPL 1, VII-A, 1-A')
                                ->required(),

                            Select::make('jurusan_id')
                                ->label('Jurusan / Peminatan')
                                ->relationship('major', 'nama_jurusan')
                                ->nullable()
                                ->visible(fn (): bool => InstitutionSetting::current()->hasMajors())
                                ->helperText('Hanya berlaku untuk SMK/MAK/SMA'),
                        ]),

                        Grid::make(2)->schema([
                            Select::make('guru_id')
                                ->label('Wali Kelas')
                                ->relationship('homeroomTeacher', 'nama_lengkap')
                                ->searchable()
                                ->preload()
                                ->nullable()
                                ->helperText('Guru yang ditugaskan sebagai wali kelas'),

                            TextInput::make('kapasitas')
                                ->label('Daya Tampung Siswa')
                                ->numeric()
                                ->default(36)
                                ->required()
                                ->helperText('Kapasitas maksimal kursi siswa dalam rombel ini'),
                        ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('nama_kelas')
                    ->label('Nama Kelas')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('tingkat')
                    ->label('Tingkat')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn ($state): string => "Tingkat {$state}")
                    ->sortable(),

                TextColumn::make('major.nama_jurusan')
                    ->label('Jurusan')
                    ->badge()
                    ->color('primary')
                    ->visible(fn (): bool => InstitutionSetting::current()->hasMajors())
                    ->placeholder('-'),

                TextColumn::make('academicYear.tahun')
                    ->label('Tahun Ajaran')
                    ->sortable(),

                TextColumn::make('homeroomTeacher.nama_lengkap')
                    ->label('Wali Kelas')
                    ->placeholder('Belum Ditentukan')
                    ->searchable(),

                TextColumn::make('students_count')
                    ->counts('students')
                    ->label('Siswa Terdaftar')
                    ->badge()
                    ->color('success')
                    ->suffix(fn (Classroom $record): string => ' / '.$record->kapasitas.' Kursi'),
            ])
            ->filters([
                SelectFilter::make('tahun_ajaran_id')
                    ->label('Tahun Ajaran')
                    ->relationship('academicYear', 'tahun'),

                SelectFilter::make('tingkat')
                    ->label('Tingkat')
                    ->options(function (): array {
                        $levels = InstitutionSetting::current()->gradeLevels();

                        return array_combine($levels, array_map(fn ($lvl) => "Tingkat {$lvl}", $levels));
                    }),

                SelectFilter::make('jurusan_id')
                    ->label('Jurusan')
                    ->relationship('major', 'nama_jurusan')
                    ->visible(fn (): bool => InstitutionSetting::current()->hasMajors()),
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
            'index' => ManageClassrooms::route('/'),
        ];
    }
}
