import { Link } from '@inertiajs/react';
import {
    Building2,
    CalendarDays,
    Globe,
    LayoutGrid,
    ShieldCheck,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard Ringkasan',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Panel Admin (Filament)',
        href: '/admin',
        icon: ShieldCheck,
    },
    {
        title: 'Profil Lembaga',
        href: '/admin/institution-settings',
        icon: Building2,
    },
    {
        title: 'Tahun Ajaran',
        href: '/admin/academic-years',
        icon: CalendarDays,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Portal Depan',
        href: '/',
        icon: Globe,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
