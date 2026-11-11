<?php

declare(strict_types=1);

namespace App\Filament\Resources\Schedules;

use App\Filament\Resources\Schedules\Pages\ManageSchedules;
use App\Models\AcademicYear;
use App\Models\Schedule;
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

class ScheduleResource extends Resource
{
    protected static ?string $model = Schedule::class;

    protected static ?string $navigationLabel = 'Jadwal Pelajaran';

    protected static ?string $modelLabel = 'Jadwal Pelajaran';

    protected static ?string $pluralModelLabel = 'Jadwal Pelajaran';

    protected static string|UnitEnum|null $navigationGroup = 'Pembelajaran & Asesmen';

    protected static ?int $navigationSort = 2;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCalendar;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Penetapan Rombel & Waktu Belajar')
                    ->description('Tentukan rombongan belajar, mata pelajaran, dan alokasi jam mengajar')
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
                            Select::make('mata_pelajaran_id')
                                ->label('Mata Pelajaran')
                                ->relationship('subject', 'nama_mapel')
                                ->required()
                                ->searchable()
                                ->preload(),

                            Select::make('guru_id')
                                ->label('Guru Pengampu')
                                ->relationship('teacher', 'nama_lengkap')
                                ->required()
                                ->searchable()
                                ->preload(),
                        ]),

                        Grid::make(3)->schema([
                            Select::make('hari')
                                ->label('Hari')
                                ->options([
                                    'Senin' => 'Senin',
                                    'Selasa' => 'Selasa',
                                    'Rabu' => 'Rabu',
                                    'Kamis' => 'Kamis',
                                    'Jumat' => 'Jumat',
                                    'Sabtu' => 'Sabtu',
                                ])
                                ->required(),

                            TextInput::make('jam_mulai')
                                ->label('Jam Mulai')
                                ->type('time')
                                ->required(),

                            TextInput::make('jam_selesai')
                                ->label('Jam Selesai')
                                ->type('time')
                                ->required(),
                        ]),

                        TextInput::make('ruangan')
                            ->label('Ruang Kelas / Laboratorium')
                            ->placeholder('Contoh: Ruang X RPL 1, Lab RPL'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('hari')
                    ->label('Hari')
                    ->badge()
                    ->color('primary')
                    ->sortable(),

                TextColumn::make('jam_mulai')
                    ->label('Waktu KBM')
                    ->formatStateUsing(fn ($state, Schedule $record): string => substr((string) $record->jam_mulai, 0, 5).' - '.substr((string) $record->jam_selesai, 0, 5))
                    ->sortable(),

                TextColumn::make('classroom.nama_kelas')
                    ->label('Kelas')
                    ->badge()
                    ->color('info')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('subject.nama_mapel')
                    ->label('Mata Pelajaran')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('teacher.nama_lengkap')
                    ->label('Guru Pengampu')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('ruangan')
                    ->label('Ruangan')
                    ->placeholder('Reguler')
                    ->searchable(),
            ])
            ->filters([
                SelectFilter::make('kelas_id')
                    ->label('Kelas')
                    ->relationship('classroom', 'nama_kelas'),

                SelectFilter::make('hari')
                    ->label('Hari')
                    ->options([
                        'Senin' => 'Senin',
                        'Selasa' => 'Selasa',
                        'Rabu' => 'Rabu',
                        'Kamis' => 'Kamis',
                        'Jumat' => 'Jumat',
                        'Sabtu' => 'Sabtu',
                    ]),

                SelectFilter::make('guru_id')
                    ->label('Guru Pengampu')
                    ->relationship('teacher', 'nama_lengkap'),
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
            'index' => ManageSchedules::route('/'),
        ];
    }
}
