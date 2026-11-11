<?php

declare(strict_types=1);

namespace App\Filament\Resources\Majors;

use App\Filament\Resources\Majors\Pages\ManageMajors;
use App\Models\InstitutionSetting;
use App\Models\Major;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use UnitEnum;

class MajorResource extends Resource
{
    protected static ?string $model = Major::class;

    protected static ?string $navigationLabel = 'Jurusan / Peminatan';

    protected static ?string $modelLabel = 'Jurusan / Peminatan';

    protected static ?string $pluralModelLabel = 'Jurusan & Peminatan';

    protected static string|UnitEnum|null $navigationGroup = 'Master Akademik';

    protected static ?int $navigationSort = 1;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSquare3Stack3d;

    /**
     * Sembunyikan navigasi jika jenjang saat ini (SD/SMP) tidak memiliki jurusan.
     */
    public static function canViewAny(): bool
    {
        return InstitutionSetting::current()->hasMajors();
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Pokok Keahlian')
                    ->description('Kelola data kompetensi keahlian atau peminatan akademik')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('kode_jurusan')
                                ->label('Kode Jurusan')
                                ->placeholder('Contoh: RPL, TKJ, MIPA')
                                ->required()
                                ->unique(ignoreRecord: true),
                            TextInput::make('nama_jurusan')
                                ->label('Nama Lengkap Jurusan')
                                ->placeholder('Contoh: Rekayasa Perangkat Lunak')
                                ->required()
                                ->columnSpan(2),
                        ]),
                        Grid::make(2)->schema([
                            TextInput::make('singkatan')
                                ->label('Singkatan')
                                ->placeholder('RPL'),
                            Toggle::make('is_active')
                                ->label('Status Aktif')
                                ->default(true)
                                ->helperText('Hanya jurusan aktif yang dapat dipilih pada pendaftaran dan kelas'),
                        ]),
                    ]),

                Section::make('Profil & Prospek Lulusan')
                    ->schema([
                        Textarea::make('deskripsi')
                            ->label('Deskripsi Program')
                            ->rows(2),
                        Textarea::make('visi_misi')
                            ->label('Visi & Misi Jurusan')
                            ->rows(2),
                        Textarea::make('prospek_kerja')
                            ->label('Peluang Kerja / Karir Lulusan')
                            ->rows(2),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('kode_jurusan')
                    ->label('Kode')
                    ->badge()
                    ->color('primary')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('nama_jurusan')
                    ->label('Nama Program Keahlian / Jurusan')
                    ->weight('bold')
                    ->searchable(),
                TextColumn::make('singkatan')
                    ->label('Singkatan')
                    ->searchable(),
                TextColumn::make('classrooms_count')
                    ->counts('classrooms')
                    ->label('Jml Kelas')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
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
            'index' => ManageMajors::route('/'),
        ];
    }
}
