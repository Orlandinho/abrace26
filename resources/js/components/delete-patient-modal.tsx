'use client';

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { TriangleAlertIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { Patient } from '@/types';
import { Link } from '@inertiajs/react';
import { destroy } from '@/routes/patients';

export default function DeletePatientModal(props: {patient: Patient}) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                className="rounded-md cursor-pointer text-sm font-semibold text-neutral-900 dark:text-white"
            >
                <TrashIcon className="size-5 text-red-600 hover:text-red-400" />
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-neutral-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-neutral-900/50"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-neutral-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                        >
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10 dark:bg-red-500/10">
                                    <TriangleAlertIcon
                                        aria-hidden="true"
                                        className="size-6 text-red-600 dark:text-red-400"
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
                                            Os dados de <span className="font-bold text-red-500"> {props.patient.name} </span> serão excluídos permanentemente! Deseja prosseguir com esta ação?
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <Link
                                    as="button"
                                    onClick={() => setOpen(false)}
                                    method="delete"
                                    href={destroy(props.patient.id)}
                                    preserveScroll
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto dark:bg-red-500 dark:shadow-none dark:hover:bg-red-400"
                                >
                                    Excluir
                                </Link>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-xs inset-ring-1 inset-ring-neutral-300 hover:bg-neutral-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
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
