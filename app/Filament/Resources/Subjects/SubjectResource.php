<?php

declare(strict_types=1);

namespace App\Filament\Resources\Subjects;

use App\Filament\Resources\Subjects\Pages\ManageSubjects;
use App\Models\InstitutionSetting;
use App\Models\Subject;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use UnitEnum;

class SubjectResource extends Resource
{
    protected static ?string $model = Subject::class;

    protected static ?string $navigationLabel = 'Mata Pelajaran';

    protected static ?string $modelLabel = 'Mata Pelajaran';

    protected static ?string $pluralModelLabel = 'Mata Pelajaran';

    protected static string|UnitEnum|null $navigationGroup = 'Pembelajaran & Asesmen';

    protected static ?int $navigationSort = 1;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBookOpen;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Mata Pelajaran')
                    ->description('Kelola data kurikulum mata pelajaran dan kriteria ketuntasan')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('kode_mapel')
                                ->label('Kode Mapel')
                                ->placeholder('Contoh: MTK, BINDO, PWPB')
                                ->required()
                                ->unique(ignoreRecord: true),

                            TextInput::make('nama_mapel')
                                ->label('Nama Lengkap Mata Pelajaran')
                                ->placeholder('Contoh: Matematika Umum')
                                ->required()
                                ->columnSpan(2),
                        ]),

                        Grid::make(3)->schema([
                            Select::make('kelompok')
                                ->label('Kelompok Mata Pelajaran')
                                ->options([
                                    'Nasional' => 'Umum / Nasional',
                                    'Kemenag' => 'Pendidikan Agama (Kemenag)',
                                    'Peminatan' => 'Peminatan Akademik',
                                    'Kejuruan' => 'Kompetensi Kejuruan',
                                    'Muatan Lokal' => 'Muatan Lokal',
                                ])
                                ->required()
                                ->default('Nasional'),

                            Select::make('jurusan_id')
                                ->label('Khusus Jurusan / Kejuruan')
                                ->relationship('major', 'nama_jurusan')
                                ->nullable()
                                ->visible(fn (): bool => InstitutionSetting::current()->hasMajors())
                                ->helperText('Kosongkan jika berlaku umum untuk seluruh jurusan'),

                            TextInput::make('kkm')
                                ->label('KKM / Kriteria Ketuntasan')
                                ->numeric()
                                ->default(75)
                                ->required(),
                        ]),

                        Toggle::make('is_active')
                            ->label('Status Aktif')
                            ->default(true)
                            ->helperText('Hanya mata pelajaran aktif yang dapat dijadwalkan'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('kode_mapel')
                    ->label('Kode')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('nama_mapel')
                    ->label('Nama Mata Pelajaran')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('kelompok')
                    ->label('Kelompok')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Nasional' => 'primary',
                        'Kemenag' => 'success',
                        'Kejuruan' => 'warning',
                        'Peminatan' => 'info',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('major.nama_jurusan')
                    ->label('Jurusan')
                    ->badge()
                    ->color('gray')
                    ->placeholder('Semua Jurusan')
                    ->visible(fn (): bool => InstitutionSetting::current()->hasMajors()),

                TextColumn::make('kkm')
                    ->label('KKM')
                    ->badge()
                    ->color('gray')
                    ->sortable(),

                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('kelompok')
                    ->label('Kelompok Mapel')
                    ->options([
                        'Nasional' => 'Nasional',
                        'Kemenag' => 'Kemenag',
                        'Peminatan' => 'Peminatan',
                        'Kejuruan' => 'Kejuruan',
                        'Muatan Lokal' => 'Muatan Lokal',
                    ]),

                SelectFilter::make('jurusan_id')
                    ->label('Jurusan')
                    ->relationship('major', 'nama_jurusan')
                    ->visible(fn (): bool => InstitutionSetting::current()->hasMajors()),

                TernaryFilter::make('is_active')
                    ->label('Status Aktif'),
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
            'index' => ManageSubjects::route('/'),
        ];
    }
}
