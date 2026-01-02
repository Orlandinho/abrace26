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
    if (!value) return "";

    // Remove tudo que não for número
    const digits = value.replace(/\D/g, "");

    // Limita a 11 dígitos
    const limited = digits.substring(0, 11);

    // Aplica a formatação dinamicamente
    if (limited.length <= 10) {
        // Formato Fixo: (11) 4444-4444
        return limited
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        // Formato Celular: (11) 99999-9999
        return limited
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    }
}
