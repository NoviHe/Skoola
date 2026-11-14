<?php

declare(strict_types=1);

namespace App\Filament\Resources\PpdbWaves\Pages;

use App\Filament\Resources\PpdbWaves\PpdbWaveResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManagePpdbWaves extends ManageRecords
{
    protected static string $resource = PpdbWaveResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->label('Buka Gelombang Baru'),
        ];
    }
}
