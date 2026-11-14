<?php

declare(strict_types=1);

namespace App\Filament\Resources\PpdbWaves;

use App\Filament\Resources\PpdbWaves\Pages\ManagePpdbWaves;
use App\Models\AcademicYear;
use App\Models\PpdbWave;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
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
use Filament\Tables\Table;
use UnitEnum;

class PpdbWaveResource extends Resource
{
    protected static ?string $model = PpdbWave::class;

    protected static ?string $navigationLabel = 'Gelombang PPDB';

    protected static ?string $modelLabel = 'Gelombang PPDB';

    protected static ?string $pluralModelLabel = 'Gelombang PPDB';

    protected static string|UnitEnum|null $navigationGroup = 'PPDB Online';

    protected static ?int $navigationSort = 1;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCalendar;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Gelombang Pendaftaran')
                    ->description('Tentukan periode buka dan tutup jadwal pendaftaran PPDB')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('tahun_ajaran_id')
                                ->label('Tahun Ajaran')
                                ->relationship('academicYear', 'tahun')
                                ->default(fn () => AcademicYear::active()->first()?->id)
                                ->required(),

                            TextInput::make('kode_gelombang')
                                ->label('Kode Gelombang')
                                ->placeholder('Contoh: GEL-1-2026')
                                ->unique(ignoreRecord: true),
                        ]),

                        TextInput::make('nama_gelombang')
                            ->label('Nama Gelombang PPDB')
                            ->placeholder('Contoh: Gelombang 1 - Jalur Prestasi & Afirmasi')
                            ->required(),

                        Grid::make(3)->schema([
                            DatePicker::make('tanggal_buka')
                                ->label('Tanggal Buka')
                                ->required(),

                            DatePicker::make('tanggal_tutup')
                                ->label('Tanggal Tutup')
                                ->required(),

                            TextInput::make('kuota')
                                ->label('Kuota Calon Siswa')
                                ->numeric()
                                ->placeholder('Contoh: 150')
                                ->helperText('Target daya tampung'),
                        ]),

                        Textarea::make('deskripsi')
                            ->label('Deskripsi / Persyaratan Khusus')
                            ->placeholder('Keterangan ketentuan atau persyaratan khusus gelombang ini')
                            ->rows(3),

                        Toggle::make('is_active')
                            ->label('Status Aktif')
                            ->helperText('Jika dinonaktifkan, pendaftaran untuk gelombang ini ditutup secara manual')
                            ->default(true),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('nama_gelombang')
                    ->label('Nama Gelombang')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('kode_gelombang')
                    ->label('Kode')
                    ->badge()
                    ->color('gray'),

                TextColumn::make('academicYear.tahun')
                    ->label('Tahun Ajaran')
                    ->sortable(),

                TextColumn::make('tanggal_buka')
                    ->label('Tanggal Buka')
                    ->date('d M Y')
                    ->sortable(),

                TextColumn::make('tanggal_tutup')
                    ->label('Tanggal Tutup')
                    ->date('d M Y')
                    ->sortable(),

                TextColumn::make('kuota')
                    ->label('Kuota')
                    ->numeric()
                    ->badge()
                    ->color('info')
                    ->placeholder('Tanpa Batas'),

                TextColumn::make('applicants_count')
                    ->label('Pendaftar')
                    ->counts('applicants')
                    ->badge()
                    ->color('success')
                    ->sortable(),

                IconColumn::make('is_active')
                    ->label('Status Aktif')
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
            'index' => ManagePpdbWaves::route('/'),
        ];
    }
}
