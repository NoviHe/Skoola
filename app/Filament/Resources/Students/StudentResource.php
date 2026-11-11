<?php

declare(strict_types=1);

namespace App\Filament\Resources\Students;

use App\Filament\Resources\Students\Pages\ManageStudents;
use App\Models\Student;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
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

class StudentResource extends Resource
{
    protected static ?string $model = Student::class;

    protected static ?string $navigationLabel = 'Peserta Didik (Siswa)';

    protected static ?string $modelLabel = 'Peserta Didik';

    protected static ?string $pluralModelLabel = 'Peserta Didik (Siswa)';

    protected static string|UnitEnum|null $navigationGroup = 'Master Akademik';

    protected static ?int $navigationSort = 4;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserGroup;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Identitas Pokok Siswa')
                    ->description('Nomor identitas kependidikan dan penempatan rombongan belajar')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('nis')
                                ->label('NIS (Nomor Induk Lokal)')
                                ->placeholder('Contoh: 20260001'),

                            TextInput::make('nisn')
                                ->label('NISN (Nasional Kemdikbud/Kemenag)')
                                ->placeholder('10 digit angka')
                                ->maxLength(10),

                            TextInput::make('nik')
                                ->label('NIK Kependudukan')
                                ->placeholder('16 digit NIK')
                                ->maxLength(16),
                        ]),

                        Grid::make(2)->schema([
                            TextInput::make('nama_lengkap')
                                ->label('Nama Lengkap Siswa')
                                ->required(),

                            TextInput::make('nama_panggilan')
                                ->label('Nama Panggilan'),
                        ]),

                        Grid::make(3)->schema([
                            Select::make('kelas_id')
                                ->label('Rombel / Kelas')
                                ->relationship('classroom', 'nama_kelas')
                                ->searchable()
                                ->preload()
                                ->nullable()
                                ->helperText('Penempatan rombongan belajar saat ini'),

                            Select::make('jenis_kelamin')
                                ->label('Jenis Kelamin')
                                ->options([
                                    'L' => 'Laki-laki',
                                    'P' => 'Perempuan',
                                ])
                                ->default('L')
                                ->required(),

                            Select::make('status')
                                ->label('Status Kesiswaan')
                                ->options([
                                    'aktif' => 'Aktif',
                                    'lulus' => 'Lulus',
                                    'pindah' => 'Pindah Keluar',
                                    'drop_out' => 'Drop Out (DO)',
                                ])
                                ->default('aktif')
                                ->required(),
                        ]),

                        Grid::make(3)->schema([
                            TextInput::make('tempat_lahir')
                                ->label('Tempat Lahir'),

                            DatePicker::make('tanggal_lahir')
                                ->label('Tanggal Lahir'),

                            Select::make('agama')
                                ->label('Agama')
                                ->options([
                                    'Islam' => 'Islam',
                                    'Kristen' => 'Kristen',
                                    'Katolik' => 'Katolik',
                                    'Hindu' => 'Hindu',
                                    'Buddha' => 'Buddha',
                                    'Konghucu' => 'Konghucu',
                                ])
                                ->default('Islam')
                                ->required(),
                        ]),
                    ]),

                Section::make('Data Orang Tua & Wali')
                    ->description('Informasi data keluarga dan kontak penanggung jawab')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('nama_ayah')
                                ->label('Nama Ayah Kandung'),

                            TextInput::make('pekerjaan_ayah')
                                ->label('Pekerjaan Ayah'),

                            TextInput::make('nama_ibu')
                                ->label('Nama Ibu Kandung'),

                            TextInput::make('pekerjaan_ibu')
                                ->label('Pekerjaan Ibu'),

                            TextInput::make('nama_wali')
                                ->label('Nama Wali (Opsional)'),

                            TextInput::make('telepon_wali')
                                ->label('Nomor Telepon Wali')
                                ->tel(),
                        ]),
                    ]),

                Section::make('Kontak & Alamat Domisili')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('nomor_telepon')
                                ->label('Nomor Telepon / WhatsApp Siswa')
                                ->tel(),

                            TextInput::make('email')
                                ->label('Alamat Email')
                                ->email(),
                        ]),

                        Textarea::make('alamat_lengkap')
                            ->label('Alamat Lengkap Tempat Tinggal')
                            ->rows(2),

                        Grid::make(3)->schema([
                            TextInput::make('desa_kelurahan')
                                ->label('Kelurahan / Desa'),

                            TextInput::make('kecamatan')
                                ->label('Kecamatan'),

                            TextInput::make('kabupaten_kota')
                                ->label('Kota / Kabupaten'),

                            TextInput::make('provinsi')
                                ->label('Provinsi'),

                            TextInput::make('kode_pos')
                                ->label('Kode Pos'),

                            Select::make('user_id')
                                ->label('Tautkan Akun Login Portal')
                                ->relationship('user', 'name')
                                ->searchable()
                                ->preload()
                                ->nullable()
                                ->helperText('Opsional jika siswa memiliki akun portal'),
                        ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('nisn')
                    ->label('NISN / NIS')
                    ->description(fn (Student $record): ?string => $record->nis ? 'NIS: '.$record->nis : null)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('nama_lengkap')
                    ->label('Nama Siswa')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('classroom.nama_kelas')
                    ->label('Kelas')
                    ->badge()
                    ->color('info')
                    ->placeholder('Belum Ada Kelas')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('jenis_kelamin')
                    ->label('L/P')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'L' => 'primary',
                        'P' => 'warning',
                        default => 'gray',
                    }),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'aktif' => 'success',
                        'lulus' => 'info',
                        'pindah' => 'warning',
                        'drop_out' => 'danger',
                        default => 'gray',
                    }),

                TextColumn::make('nomor_telepon')
                    ->label('Kontak')
                    ->searchable(),
            ])
            ->filters([
                SelectFilter::make('kelas_id')
                    ->label('Kelas')
                    ->relationship('classroom', 'nama_kelas'),

                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'aktif' => 'Aktif',
                        'lulus' => 'Lulus',
                        'pindah' => 'Pindah',
                        'drop_out' => 'Drop Out',
                    ]),

                SelectFilter::make('jenis_kelamin')
                    ->label('Jenis Kelamin')
                    ->options([
                        'L' => 'Laki-laki',
                        'P' => 'Perempuan',
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
            'index' => ManageStudents::route('/'),
        ];
    }
}
