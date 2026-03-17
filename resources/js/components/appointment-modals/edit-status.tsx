'use client';

import { update } from '@/routes/appointments';
import { Appointment } from '@/types';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { TriangleAlertIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function EditStatus({ appointment }: { appointment: Appointment }) {
    const [open, setOpen] = useState(false);
    const setBgColor: Record<Appointment['status'], string> = {
        0: 'bg-red-500 hover:bg-red-400',
        1: 'bg-amber-600 hover:bg-amber-500',
        2: 'bg-green-600 hover:bg-green-500',
    };
    const setTextColor: Record<Appointment['status'], string> = {
        0: 'text-red-500 hover:text-red-400',
        1: 'text-amber-600 hover:text-amber-500',
        2: 'text-green-600 hover:text-green-500',
    };

    const setButtonText: Record<Appointment['status'], string> = {
        0: 'Aguardando',
        1: 'Em andamento',
        2: 'Encerrada',
    }



    return (
        <div>
            <button
                disabled={appointment.status === 2}
                onClick={() => setOpen(true)}
                className={cn(
                    'inline-flex w-full cursor-pointer justify-center rounded-md px-3 py-1.5 text-xs font-semibold text-white shadow-xs sm:w-auto dark:shadow-none',
                    setBgColor[appointment.status],
                    appointment.status === 2 && 'cursor-not-allowed',
                )}
            >
                {setButtonText[appointment.status]}
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-neutral-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-neutral-900/50"
                />

                <div className="fixed top-0 z-10 w-screen overflow-y-auto md:inset-0">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-neutral-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                        >
                            <div className="sm:flex sm:items-start">
                                <div
                                    className={cn(
                                        'mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10',
                                        appointment.status === 0
                                            ? 'bg-green-100 dark:bg-red-500/10'
                                            : 'bg-amber-100 dark:bg-amber-500/10',
                                    )}
                                >
                                    <TriangleAlertIcon
                                        aria-hidden="true"
                                        className={cn(
                                            'size-6',
                                            setTextColor[appointment.status],
                                        )}
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold text-neutral-900 dark:text-white"
                                    >
                                        Atenção!
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            Deseja mudar o status da consulta{' '}
                                            <span
                                                className={cn(
                                                    'font-bold text-blue-500',
                                                    setTextColor[
                                                        appointment.status
                                                    ],
                                                )}
                                            >
                                                {' '}
                                                {
                                                    appointment.specialty.name
                                                }{' '}
                                            </span>{' '}
                                            de
                                            <span
                                                className={cn(
                                                    'font-bold text-blue-500',
                                                    setTextColor[
                                                        appointment.status
                                                    ],
                                                )}
                                            >
                                                {' '}
                                                {appointment.patient.name}{' '}
                                            </span>{' '}
                                            para{' '}
                                            <span
                                                className={cn(
                                                    'font-bold text-blue-500',
                                                    setTextColor[
                                                        appointment.status
                                                    ],
                                                )}
                                            >
                                                {' '}
                                                {appointment.status === 0
                                                    ? 'em andamento'
                                                    : 'encerrada'}
                                                ?
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <Link
                                    as="button"
                                    method="patch"
                                    href={update(appointment.id)}
                                    preserveScroll
                                    onSuccess={() => setOpen(false)}
                                    className={cn("inline-flex w-full cursor-pointer justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto dark:shadow-none", setBgColor[appointment.status])}
                                >
                                    {appointment.status === 0 ? 'Atualizar' : 'Encerrar'}
                                </Link>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-xs inset-ring-1 inset-ring-neutral-300 hover:bg-neutral-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
