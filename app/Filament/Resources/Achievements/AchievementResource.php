<?php

declare(strict_types=1);

namespace App\Filament\Resources\Achievements;

use App\Filament\Resources\Achievements\Pages\ManageAchievements;
use App\Models\Achievement;
use BackedEnum;
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
use UnitEnum;

class AchievementResource extends Resource
{
    protected static ?string $model = Achievement::class;

    protected static ?string $navigationLabel = 'Prestasi Lembaga';

    protected static ?string $modelLabel = 'Prestasi';

    protected static ?string $pluralModelLabel = 'Prestasi Lembaga & Siswa';

    protected static string|UnitEnum|null $navigationGroup = 'Warta & Informasi Publik';

    protected static ?int $navigationSort = 4;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedTrophy;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Rekam Jejak Prestasi Kejuaraan')
                    ->description('Pencatatan prestasi lomba akademik dan non-akademik siswa maupun guru')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('judul_prestasi')
                                ->label('Nama Kejuaraan / Prestasi')
                                ->placeholder('Contoh: Juara 1 LKS Bidang Web Technologies')
                                ->required(),

                            TextInput::make('nama_peraih')
                                ->label('Nama Siswa / Tim Peraih')
                                ->placeholder('Contoh: Ahmad Fadhilah & Tim')
                                ->required(),
                        ]),

                        Grid::make(3)->schema([
                            Select::make('tingkat')
                                ->label('Tingkat Kejuaraan')
                                ->options([
                                    'Kecamatan' => 'Kecamatan',
                                    'Kabupaten/Kota' => 'Kabupaten / Kota',
                                    'Provinsi' => 'Provinsi',
                                    'Nasional' => 'Nasional',
                                    'Internasional' => 'Internasional',
                                ])
                                ->required()
                                ->default('Kabupaten/Kota'),

                            Select::make('peringkat')
                                ->label('Pencapaian / Peringkat')
                                ->options([
                                    'Juara 1' => 'Juara 1 (Emas)',
                                    'Juara 2' => 'Juara 2 (Perak)',
                                    'Juara 3' => 'Juara 3 (Perunggu)',
                                    'Harapan 1' => 'Juara Harapan 1',
                                    'Finalis' => 'Finalis Utama',
                                ])
                                ->required()
                                ->default('Juara 1'),

                            TextInput::make('tahun')
                                ->label('Tahun Perolehan')
                                ->default((string) date('Y'))
                                ->required(),
                        ]),

                        Grid::make(2)->schema([
                            TextInput::make('penyelenggara')
                                ->label('Instansi Penyelenggara')
                                ->placeholder('Contoh: Kemdikbudristek / Dinas Pendidikan'),

                            TextInput::make('foto')
                                ->label('Tautan / URL Foto Piagam/Piala')
                                ->placeholder('https://... atau path gambar'),
                        ]),

                        Textarea::make('deskripsi')
                            ->label('Catatan & Ringkasan Keberhasilan')
                            ->rows(3),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('judul_prestasi')
                    ->label('Kejuaraan')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('nama_peraih')
                    ->label('Peraih')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('peringkat')
                    ->label('Peringkat')
                    ->badge()
                    ->color('warning')
                    ->sortable(),

                TextColumn::make('tingkat')
                    ->label('Tingkat')
                    ->badge()
                    ->color('primary')
                    ->sortable(),

                TextColumn::make('tahun')
                    ->label('Tahun')
                    ->badge()
                    ->color('gray')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('tingkat')
                    ->label('Tingkat')
                    ->options([
                        'Kecamatan' => 'Kecamatan',
                        'Kabupaten/Kota' => 'Kabupaten/Kota',
                        'Provinsi' => 'Provinsi',
                        'Nasional' => 'Nasional',
                        'Internasional' => 'Internasional',
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
            'index' => ManageAchievements::route('/'),
        ];
    }
}
