import { GraduationCap } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-indigo-600 text-white">
                <GraduationCap className="size-5" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-foreground">
                    {name || 'Skoola'}
                </span>
                <span className="truncate text-[10px] leading-none text-muted-foreground">
                    Sistem Manajemen Sekolah
                </span>
            </div>
        </>
    );
}
