<?php

declare(strict_types=1);

namespace App\Filament\Resources\Galleries;

use App\Filament\Resources\Galleries\Pages\ManageGalleries;
use App\Models\Gallery;
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
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use UnitEnum;

class GalleryResource extends Resource
{
    protected static ?string $model = Gallery::class;

    protected static ?string $navigationLabel = 'Galeri Dokumentasi';

    protected static ?string $modelLabel = 'Dokumentasi Galeri';

    protected static ?string $pluralModelLabel = 'Galeri Dokumentasi';

    protected static string|UnitEnum|null $navigationGroup = 'Warta & Informasi Publik';

    protected static ?int $navigationSort = 3;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Dokumentasi Foto Kegiatan & Sarana')
                    ->schema([
                        TextInput::make('judul')
                            ->label('Judul Dokumentasi')
                            ->placeholder('Contoh: Kunjungan Industri Siswa Tingkat XI')
                            ->required(),

                        Grid::make(2)->schema([
                            Select::make('kategori')
                                ->label('Kategori')
                                ->options([
                                    'Kegiatan' => 'Kegiatan Pembelajaran & Acara',
                                    'Fasilitas' => 'Sarana & Prasarana',
                                    'Prestasi' => 'Pemberian Penghargaan',
                                    'Ekstrakurikuler' => 'Aktivitas Ekstrakurikuler',
                                ])
                                ->required()
                                ->default('Kegiatan'),

                            DatePicker::make('tanggal_kegiatan')
                                ->label('Tanggal Kegiatan')
                                ->default(now()),
                        ]),

                        TextInput::make('foto')
                            ->label('Tautan Gambar / URL Foto')
                            ->placeholder('https://... atau path gambar')
                            ->required(),

                        Textarea::make('deskripsi')
                            ->label('Deskripsi Dokumentasi')
                            ->rows(3),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordAction(EditAction::class)
            ->columns([
                ImageColumn::make('foto')
                    ->label('Foto')
                    ->circular(false),

                TextColumn::make('judul')
                    ->label('Judul')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('kategori')
                    ->label('Kategori')
                    ->badge()
                    ->color('primary')
                    ->sortable(),

                TextColumn::make('tanggal_kegiatan')
                    ->label('Tanggal')
                    ->date('d M Y')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('kategori')
                    ->label('Kategori')
                    ->options([
                        'Kegiatan' => 'Kegiatan',
                        'Fasilitas' => 'Fasilitas',
                        'Prestasi' => 'Prestasi',
                        'Ekstrakurikuler' => 'Ekstrakurikuler',
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
            'index' => ManageGalleries::route('/'),
        ];
    }
}
