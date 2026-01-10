import React from 'react';

export function Table({children}: { children: React.ReactNode}) {
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                        <table className="relative min-w-full divide-y divide-neutral-300 dark:divide-white/15">
                            {children}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function TableHead({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'thead'>) {
    return (
        <thead
            {...props}
            className={'text-neutral-500 dark:text-neutral-400 ' + className}
        />
    );
}

export function TableHeader({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'th'>) {
    return (
        <th
            {...props}
            scope="col"
            className={
                'px-3 py-3.5 text-left text-sm font-semibold first:pr-3 first:pl-4 last:text-right ' +
                className
            }
        />
    );
}

export function TableBody({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'tbody'>) {
    return (
        <tbody
            {...props}
            className={'divide-y divide-neutral-200 bg-white dark:divide-white/10 dark:bg-neutral-800/50 ' + className}
        />);
}

export function TableRow({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'tr'>) {
    return (
        <tr {...props}
            className={'bg-white dark:bg-neutral-800/50 ' + className}
        />
    );
}

export function TableCell({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'td'>) {
    return (
        <td
            {...props}
            className={
                'px-3 py-4 text-sm whitespace-nowrap text-neutral-500 first:pr-3 first:pl-4 first:font-medium last:text-right dark:text-neutral-400 first:dark:text-white ' +
                className
            }
        />
    );
}
