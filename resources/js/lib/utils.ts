import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    //return resolveUrl(url1) === resolveUrl(url2);
    return resolveUrl(url1).includes(resolveUrl(url2));
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function isElder(age: string): boolean {
    const ageParsed: number = parseInt(age.split(" ")[0]);
    return ageParsed >= 60;
}

export function formatPhone(value : string): string {
    if (!value) return '';

    const digits = value.replace(/\D/g, '');

    const limited = digits.substring(0, 9);

    return limited.replace(/^(\d{4,5})(\d{4}).*/, '$1-$2');
}

export function onlyNumbers(value: string): number | string {
    if (!value) return '';

    return value.replace(/\D/g, '');
}

export function formatHeight(value: string): string {
    if (!value) return '';

    const digits = value.replace(/\D/g, '');

    if (digits.length > 1) {
        return `${digits[0]},${digits.slice(1, 3)}`;
    }

    return digits;
}

export function formatPression(value: string): string {

    // 1. Remove tudo que não for número ou barra
    value = value.replace(/[^0-9/]/g, "");

    // 2. Impede a barra como primeiro caractere
    if (value.startsWith('/')) {
        value = value.substring(1);
    }

    // 3. Garante apenas uma única barra
    const partes = value.split('/');
    if (partes.length > 2) {
        // Mantém a primeira parte, a primeira barra e junta o resto sem barras
        value = partes[0] + '/' + partes.slice(1).join('').replace(/\//g, '');
    }

    return value;
}

export function formatWeight(value: string): string {
    let cleanValue = value.replace(/\./g, ',').replace(/[^\d,]/g, '');

    if (cleanValue.startsWith(',')) {
        cleanValue = cleanValue.replace(',', '');
    }

    const parts = cleanValue.split(',');

    if (parts.length > 1) {
        cleanValue = `${parts[0]},${parts.slice(1).join('').substring(0, 2)}`;
    }

    return cleanValue;
}
