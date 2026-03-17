import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    alert: {
        type: 'success' | 'failure' | 'warning';
        message: string;
        title: string;
    }
    [key: string]: unknown;
}

export interface Appointment {
    id: number;
    patient: Patient;
    specialty: Specialty;
    status: number;
}

export interface Patient {
    id: number;
    name: string;
    slug: string;
    dob: string;
    age: string;
    allow_contact: boolean;
    contact?: string;
    specialties?: Specialty[];
    pivot?: Pivot[]
}

export interface Specialty {
    id: number;
    name: string;
    slug: string;
    limit: number;
    count: number;
    patient?: Patient;
    pivot?: Pivot[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
