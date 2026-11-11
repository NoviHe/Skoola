<?php

declare(strict_types=1);

namespace App\Filament\Resources\Teachers;

use App\Filament\Resources\Teachers\Pages\ManageTeachers;
use App\Models\Teacher;
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
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use UnitEnum;

class TeacherResource extends Resource
{
    protected static ?string $model = Teacher::class;

    protected static ?string $navigationLabel = 'Guru & Tendik';

    protected static ?string $modelLabel = 'Guru / Tendik';

    protected static ?string $pluralModelLabel = 'Guru & Tenaga Kependidikan';

    protected static string|UnitEnum|null $navigationGroup = 'Master Akademik';

    protected static ?int $navigationSort = 2;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedAcademicCap;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Identitas Pendidik / Tendik')
                    ->description('Kelola data identitas dan gelar pendidik')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('nama_lengkap')
                                ->label('Nama Lengkap (tanpa gelar)')
                                ->required(),
                            TextInput::make('gelar_depan')
                                ->label('Gelar Depan')
                                ->placeholder('Contoh: Dr., Drs.'),
                            TextInput::make('gelar_belakang')
                                ->label('Gelar Belakang')
                                ->placeholder('Contoh: S.Pd., M.Kom.'),
                        ]),
                        Grid::make(3)->schema([
                            Select::make('jenis_kelamin')
                                ->label('Jenis Kelamin')
                                ->options([
                                    'L' => 'Laki-laki',
                                    'P' => 'Perempuan',
                                ])
                                ->default('L')
                                ->required(),
                            Select::make('user_id')
                                ->label('Tautkan Akun Login')
                                ->relationship('user', 'name')
                                ->searchable()
                                ->preload()
                                ->nullable()
                                ->helperText('Opsional jika pendidik memiliki akses sistem'),
                            Select::make('status_kepegawaian')
                                ->label('Status Kepegawaian')
                                ->options([
                                    'PNS' => 'PNS (Pegawai Negeri Sipil)',
                                    'PPPK' => 'PPPK',
                                    'GTY' => 'Guru Tetap Yayasan (GTY)',
                                    'GTT' => 'Guru Tidak Tetap (GTT)',
                                    'Honorer' => 'Honorer',
                                    'Tenaga Kependidikan' => 'Tenaga Kependidikan',
                                ])
                                ->required()
                                ->default('PNS'),
                        ]),
                    ]),

                Section::make('Nomor Registrasi & Bidang Tugas')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('nip')
                                ->label('NIP')
                                ->placeholder('Nomor Induk Pegawai'),
                            TextInput::make('nuptk')
                                ->label('NUPTK')
                                ->placeholder('Nomor Unik Pendidik & Tendik'),
                            TextInput::make('npk')
                                ->label('NPK')
                                ->placeholder('Nomor Pendidik Kemenag (Madrasah)'),
                        ]),
                        TextInput::make('bidang_studi_utama')
                            ->label('Mata Pelajaran / Bidang Tugas Utama')
                            ->placeholder('Contoh: Pemrograman Web, Matematika, PAI'),
                    ]),

                Section::make('Kontak & Tempat Tinggal')
                    ->schema([
                        TextInput::make('telepon')
                            ->label('Nomor Telepon / WhatsApp')
                            ->tel()
                            ->placeholder('081234567890'),
                        Textarea::make('alamat')
                            ->label('Alamat Lengkap')
                            ->rows(2),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('nama_lengkap')
                    ->label('Nama Pendidik')
                    ->description(fn (Teacher $record): ?string => ($record->gelar_depan || $record->gelar_belakang)
                        ? trim(($record->gelar_depan ? $record->gelar_depan.' ' : '').$record->nama_lengkap.($record->gelar_belakang ? ', '.$record->gelar_belakang : ''))
                        : null
                    )
                    ->searchable()
                    ->sortable(),

                TextColumn::make('nip')
                    ->label('NIP / NUPTK')
                    ->formatStateUsing(fn ($state, Teacher $record): string => $record->nip ?? $record->nuptk ?? '-')
                    ->description(fn (Teacher $record): ?string => $record->nip && $record->nuptk ? 'NUPTK: '.$record->nuptk : null)
                    ->searchable(),

                TextColumn::make('bidang_studi_utama')
                    ->label('Mata Pelajaran')
                    ->badge()
                    ->color('info')
                    ->searchable(),

                TextColumn::make('jenis_kelamin')
                    ->label('L/P')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'L' => 'primary',
                        'P' => 'warning',
                        default => 'gray',
                    }),

                TextColumn::make('status_kepegawaian')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'PNS' => 'success',
                        'PPPK' => 'info',
                        default => 'gray',
                    }),

                TextColumn::make('telepon')
                    ->label('Kontak')
                    ->searchable(),
            ])
            ->filters([
                SelectFilter::make('jenis_kelamin')
                    ->label('Jenis Kelamin')
                    ->options([
                        'L' => 'Laki-laki',
                        'P' => 'Perempuan',
                    ]),

                SelectFilter::make('status_kepegawaian')
                    ->label('Status Pegawai')
                    ->options([
                        'PNS' => 'PNS',
                        'PPPK' => 'PPPK',
                        'GTY' => 'GTY',
                        'GTT' => 'GTT',
                        'Honorer' => 'Honorer',
                        'Tenaga Kependidikan' => 'Tenaga Kependidikan',
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
            'index' => ManageTeachers::route('/'),
        ];
    }
}
