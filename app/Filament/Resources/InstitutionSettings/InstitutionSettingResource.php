<?php

declare(strict_types=1);

namespace App\Filament\Resources\InstitutionSettings;

use App\Filament\Resources\InstitutionSettings\Pages\ManageInstitutionSettings;
use App\Models\InstitutionSetting;
use BackedEnum;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
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

class InstitutionSettingResource extends Resource
{
    protected static ?string $model = InstitutionSetting::class;

    protected static ?string $navigationLabel = 'Profil Lembaga';

    protected static ?string $modelLabel = 'Pengaturan Lembaga';

    protected static ?string $pluralModelLabel = 'Pengaturan Lembaga';

    protected static string|UnitEnum|null $navigationGroup = 'Pengaturan & Sistem';

    protected static ?int $navigationSort = 1;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBuildingLibrary;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Identitas Satuan Pendidikan')
                    ->description('Sesuaikan profil dan tingkatan jenjang sekolah/madrasah')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('nama_institusi')
                                ->label('Nama Lembaga / Sekolah')
                                ->placeholder('Contoh: SMK Negeri 1 Padaherang / SMA 1 X')
                                ->required()
                                ->columnSpan(1),
                            Select::make('jenjang')
                                ->label('Jenjang Satuan Pendidikan')
                                ->options(InstitutionSetting::educationalTiers())
                                ->required()
                                ->columnSpan(1),
                        ]),
                        Grid::make(3)->schema([
                            TextInput::make('npsn')
                                ->label('NPSN')
                                ->placeholder('Nomor Pokok Sekolah Nasional'),
                            TextInput::make('nsm')
                                ->label('NSM (Madrasah)')
                                ->placeholder('Khusus MI / MTs / MA / MAK'),
                            Select::make('kurikulum_aktif')
                                ->label('Kurikulum Acuan')
                                ->options([
                                    'merdeka' => 'Kurikulum Merdeka',
                                    'k13' => 'Kurikulum 2013 (K13)',
                                    'kombinasi' => 'Kombinasi / Transisi',
                                ])
                                ->required(),
                        ]),
                    ]),

                Section::make('Pimpinan & Kontak Lembaga')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('kepala_sekolah')
                                ->label('Nama Kepala Sekolah / Madrasah')
                                ->placeholder('Nama lengkap beserta gelar'),
                            TextInput::make('nip_kepala_sekolah')
                                ->label('NIP / NPK Kepala')
                                ->placeholder('Nomor identitas pegawai'),
                        ]),
                        Grid::make(3)->schema([
                            TextInput::make('telepon')
                                ->label('Nomor Telepon')
                                ->tel(),
                            TextInput::make('email')
                                ->label('Alamat Email')
                                ->email(),
                            TextInput::make('website')
                                ->label('Website Resmi')
                                ->url(),
                        ]),
                        Textarea::make('alamat')
                            ->label('Alamat Lengkap Lembaga')
                            ->rows(3),
                    ]),

                Section::make('Konfigurasi Fitur & Modul')
                    ->description('Aktifkan atau nonaktifkan fitur sesuai kebutuhan jenjang')
                    ->schema([
                        Grid::make(3)->schema([
                            Toggle::make('has_jurusan')
                                ->label('Fitur Peminatan / Jurusan')
                                ->helperText('Aktifkan untuk SMA, MA, SMK, dan MAK'),
                            Toggle::make('fitur_ppdb')
                                ->label('Modul PPDB Daring')
                                ->helperText('Pendaftaran peserta didik baru daring'),
                            Toggle::make('fitur_pkl')
                                ->label('Modul PKL / Vokasi')
                                ->helperText('Khusus jenjang kejuruan SMK / MAK'),
                        ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama_institusi')
                    ->label('Nama Lembaga')
                    ->weight('bold')
                    ->searchable(),
                TextColumn::make('jenjang')
                    ->badge()
                    ->color('primary')
                    ->sortable(),
                TextColumn::make('kurikulum_aktif')
                    ->label('Kurikulum')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'merdeka' => 'Kurikulum Merdeka',
                        'k13' => 'K13',
                        default => ucfirst($state),
                    }),
                TextColumn::make('npsn')
                    ->label('NPSN')
                    ->searchable(),
                TextColumn::make('kepala_sekolah')
                    ->label('Kepala Sekolah')
                    ->searchable(),
                IconColumn::make('has_jurusan')
                    ->label('Jurusan')
                    ->boolean(),
                IconColumn::make('fitur_ppdb')
                    ->label('PPDB')
                    ->boolean(),
                IconColumn::make('fitur_pkl')
                    ->label('PKL')
                    ->boolean(),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageInstitutionSettings::route('/'),
        ];
    }
}
