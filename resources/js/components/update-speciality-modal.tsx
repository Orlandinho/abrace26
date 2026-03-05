'use client';

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import React, { useState } from 'react';
import { Form } from '@inertiajs/react';
import { update } from '@/routes/specialties';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SquarePen } from 'lucide-react';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { onlyNumbers } from '@/lib/utils';
import { Specialty } from '@/types';

export default function UpdateSpecialityModal({ specialty }: {specialty: Specialty}) {
    const [open, setOpen] = useState(false);
    const [limit, setLimit] = useState(specialty.limit);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(onlyNumbers(e.target.value));
    };

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                className="cursor-pointer"
            >
                <SquarePen className="size-5 text-green-600 hover:text-green-400" />
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
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-neutral-900 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                        >
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                <DialogTitle
                                    as="h3"
                                    className="text-base font-semibold text-neutral-900 dark:text-white"
                                >
                                    Atualizando {specialty.name}
                                </DialogTitle>
                            </div>
                            <Form
                                {...update.form(specialty)}
                                resetOnSuccess
                                onSuccess={() => setOpen(false)}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="relative grid gap-y-2 sm:col-span-6">
                                                <Label htmlFor="name">
                                                    Nome
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    required
                                                    defaultValue={specialty.name}
                                                    maxLength={100}
                                                    autoFocus
                                                    tabIndex={1}
                                                />
                                                <InputError
                                                    message={errors.name || errors.slug}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-6">
                                                <Label htmlFor="limit">
                                                    Limite
                                                </Label>
                                                <Input
                                                    id="limit"
                                                    type="text"
                                                    name="limit"
                                                    required
                                                    value={limit}
                                                    onChange={handleChange}
                                                    inputMode="numeric"
                                                    maxLength={3}
                                                    tabIndex={2}
                                                />
                                                <InputError
                                                    message={errors.limit}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-6 sm:flex sm:flex-row-reverse">
                                            <button
                                                disabled={processing}
                                                type="submit"
                                                className={clsx("relative inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto dark:shadow-none cursor-pointer",
                                                    processing ? 'cursor-not-allowed dark:bg-green-300/75' : 'dark:bg-green-500 dark:hover:bg-green-400')}
                                            >
                                                {processing && (
                                                    <div className="absolute inset-0 grid place-items-center">
                                                        <LoaderCircle className="size-5 animate-spin stroke-primary" />
                                                    </div>
                                                )}
                                                <span className={clsx(processing && 'invisible')}>Atualizar</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-xs inset-ring-1 inset-ring-neutral-300 hover:bg-neutral-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
