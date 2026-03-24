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
    return value.replace(/\D/g, '');
}
