<?php

declare(strict_types=1);

namespace App\Filament\Resources\PpdbApplicants\Pages;

use App\Filament\Resources\PpdbApplicants\PpdbApplicantResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManagePpdbApplicants extends ManageRecords
{
    protected static string $resource = PpdbApplicantResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->label('Pendaftaran Manual'),
        ];
    }
}
