<?php

declare(strict_types=1);

namespace App\Filament\Resources\Articles;

use App\Filament\Resources\Articles\Pages\ManageArticles;
use App\Models\Article;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DateTimePicker;
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
use Illuminate\Support\Str;
use UnitEnum;

class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;

    protected static ?string $navigationLabel = 'Berita & Artikel';

    protected static ?string $modelLabel = 'Warta / Artikel';

    protected static ?string $pluralModelLabel = 'Berita & Artikel';

    protected static string|UnitEnum|null $navigationGroup = 'Warta & Informasi Publik';

    protected static ?int $navigationSort = 1;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedNewspaper;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi & Naskah Publikasi')
                    ->description('Kelola publikasi berita, rilis kegiatan, dan artikel edukasi sekolah')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('judul')
                                ->label('Judul Artikel')
                                ->placeholder('Masukkan judul berita atau artikel yang menarik')
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn ($set, $state) => $set('slug', Str::slug((string) $state))),

                            TextInput::make('slug')
                                ->label('URL Slug')
                                ->required()
                                ->unique(ignoreRecord: true),
                        ]),

                        Grid::make(3)->schema([
                            Select::make('kategori')
                                ->label('Kategori Warta')
                                ->options([
                                    'Berita' => 'Berita Sekolah',
                                    'Artikel' => 'Artikel Pendidikan',
                                    'Opini' => 'Opini Pendidik / Siswa',
                                    'Tutorial' => 'Tutorial & Kiat Praktis',
                                ])
                                ->required()
                                ->default('Berita'),

                            Select::make('status')
                                ->label('Status Publikasi')
                                ->options([
                                    'draft' => 'Draft (Disimpan)',
                                    'published' => 'Published (Tayang)',
                                ])
                                ->required()
                                ->default('published'),

                            DateTimePicker::make('published_at')
                                ->label('Waktu Penayangan')
                                ->default(now()),
                        ]),

                        TextInput::make('thumbnail')
                            ->label('Tautan Thumbnail / Foto Utama')
                            ->placeholder('https://... atau path gambar')
                            ->helperText('Gambar resolusi landscape 16:9 disarankan'),

                        Textarea::make('ringkasan')
                            ->label('Ringkasan Cuplikan (Excerpt)')
                            ->placeholder('Ringkasan 1-2 kalimat pengantar artikel untuk cuplikan portal')
                            ->rows(2),

                        Textarea::make('konten')
                            ->label('Isi Lengkap Naskah Berita')
                            ->placeholder('Tuliskan naskah berita secara lengkap...')
                            ->rows(8)
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
                    ->label('Judul Berita')
                    ->weight(FontWeight::Bold)
                    ->searchable()
                    ->sortable()
                    ->limit(50),

                TextColumn::make('kategori')
                    ->label('Kategori')
                    ->badge()
                    ->color('primary')
                    ->sortable(),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('published_at')
                    ->label('Tayang')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),

                TextColumn::make('views')
                    ->label('Views')
                    ->badge()
                    ->color('info')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('kategori')
                    ->label('Kategori')
                    ->options([
                        'Berita' => 'Berita',
                        'Artikel' => 'Artikel',
                        'Opini' => 'Opini',
                        'Tutorial' => 'Tutorial',
                    ]),

                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'published' => 'Published',
                        'draft' => 'Draft',
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
            'index' => ManageArticles::route('/'),
        ];
    }
}
