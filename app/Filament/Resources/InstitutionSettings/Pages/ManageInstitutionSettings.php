<?php

namespace App\Filament\Resources\InstitutionSettings\Pages;

use App\Filament\Resources\InstitutionSettings\InstitutionSettingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageInstitutionSettings extends ManageRecords
{
    protected static string $resource = InstitutionSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
