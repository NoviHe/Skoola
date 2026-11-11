<?php

declare(strict_types=1);

namespace App\Filament\Resources\Announcements;

use App\Filament\Resources\Announcements\Pages\ManageAnnouncements;
use App\Models\Announcement;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
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
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use UnitEnum;

class AnnouncementResource extends Resource
{
    protected static ?string $model = Announcement::class;

    protected static ?string $navigationLabel = 'Pengumuman Resmi';

    protected static ?string $modelLabel = 'Pengumuman';

    protected static ?string $pluralModelLabel = 'Pengumuman Resmi';

    protected static string|UnitEnum|null $navigationGroup = 'Warta & Informasi Publik';

    protected static ?int $navigationSort = 2;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMegaphone;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Rincian Pengumuman Resmi')
                    ->description('Sebarkan pengumuman penting kepada siswa, dewan guru, atau wali murid')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('judul')
                                ->label('Perihal / Judul Pengumuman')
                                ->placeholder('Contoh: Jadwal Libur Awal Semester')
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn ($set, $state) => $set('slug', Str::slug((string) $state))),

                            TextInput::make('slug')
                                ->label('URL Slug')
                                ->required()
                                ->unique(ignoreRecord: true),
                        ]),

                        Grid::make(3)->schema([
                            Select::make('target_audiens')
                                ->label('Target Sasaran')
                                ->options([
                                    'Semua' => 'Seluruh Warga Lembaga',
                                    'Siswa' => 'Khusus Peserta Didik',
                                    'Guru' => 'Dewan Guru & Tendik',
                                    'Wali Murid' => 'Orang Tua / Wali Siswa',
                                ])
                                ->required()
                                ->default('Semua'),

                            Select::make('urgensi')
                                ->label('Tingkat Urgensi')
                                ->options([
                                    'Biasa' => 'Informasi Biasa',
                                    'Penting' => 'Penting',
                                    'Mendesak' => 'Mendesak (Darurat)',
                                ])
                                ->required()
                                ->default('Biasa'),

                            Toggle::make('is_active')
                                ->label('Status Aktif')
                                ->default(true)
                                ->helperText('Tampilkan di beranda portal publik'),
                        ]),

                        DateTimePicker::make('published_at')
                            ->label('Waktu Penayangan')
                            ->default(now()),

                        Textarea::make('konten')
                            ->label('Isi Lengkap Pengumuman')
                            ->placeholder('Tuliskan rincian instruksi atau pengumuman secara rinci...')
                            ->rows(6)
                            ->required(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                TextColumn::make('judul')
                    ->label('Perihal')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable()
                    ->limit(50),

                TextColumn::make('target_audiens')
                    ->label('Target')
                    ->badge()
                    ->color('info')
                    ->sortable(),

                TextColumn::make('urgensi')
                    ->label('Urgensi')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Mendesak' => 'danger',
                        'Penting' => 'warning',
                        default => 'gray',
                    })
                    ->sortable(),

                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean()
                    ->sortable(),

                TextColumn::make('published_at')
                    ->label('Tayang')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('target_audiens')
                    ->label('Target Audiens')
                    ->options([
                        'Semua' => 'Semua',
                        'Siswa' => 'Siswa',
                        'Guru' => 'Guru',
                        'Wali Murid' => 'Wali Murid',
                    ]),

                SelectFilter::make('urgensi')
                    ->label('Urgensi')
                    ->options([
                        'Biasa' => 'Biasa',
                        'Penting' => 'Penting',
                        'Mendesak' => 'Mendesak',
                    ]),

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
            'index' => ManageAnnouncements::route('/'),
        ];
    }
}
