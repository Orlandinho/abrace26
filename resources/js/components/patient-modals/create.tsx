'use client';

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import React, { useRef, useState } from 'react';
import { Form } from '@inertiajs/react';
import { store } from '@/routes/patients';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { cn, formatPhone } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Specialty } from '@/types';

export default function Create({ specialties } : { specialties?: Specialty[] }) {
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState('');
    const [allowContact, setAllowContact] = useState(false);
    const firstInputRef = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhone(e.target.value));
    };

    const closeModal = () => {
        setOpen(false);
        setPhone('');
    }

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                type="button"
                className="block cursor-pointer rounded-md bg-amber-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 dark:focus-visible:outline-amber-500"
            >
                Novo Paciente
            </button>
            <Dialog
                open={open}
                initialFocus={firstInputRef}
                onClose={setOpen}
                className="relative z-10"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-neutral-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-neutral-900/50"
                />

                <div className="fixed top-0 z-10 w-screen overflow-y-auto md:inset-0">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative w-92 transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-neutral-900 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                        >
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                <DialogTitle
                                    as="h3"
                                    className="text-base font-semibold text-neutral-900 dark:text-white"
                                >
                                    Novo Paciente
                                </DialogTitle>
                            </div>
                            <Form
                                {...store.form()}
                                resetOnSuccess
                                onSuccess={() => closeModal()}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="relative grid gap-y-2 sm:col-span-6">
                                                <Label htmlFor="name">
                                                    Nome
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    required
                                                    ref={firstInputRef}
                                                    maxLength={100}
                                                    tabIndex={1}
                                                />
                                                <InputError
                                                    message={errors.name}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-3">
                                                <Label htmlFor="dob">
                                                    Data de Nascimento
                                                </Label>
                                                <Input
                                                    id="dob"
                                                    type="date"
                                                    name="dob"
                                                    required
                                                    tabIndex={2}
                                                />
                                                <InputError
                                                    message={errors.dob}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-3">
                                                <div className="flex items-center space-x-3">
                                                    <Checkbox
                                                        id="allow_contact"
                                                        name="allow_contact"
                                                        onCheckedChange={(
                                                            checked: boolean,
                                                        ) => {
                                                            setAllowContact(
                                                                checked
                                                            );
                                                        }}
                                                        value={1}
                                                        tabIndex={3}
                                                    />
                                                    <Label htmlFor="allow_contact">
                                                        Permite guardar o
                                                        contato?
                                                    </Label>
                                                </div>
                                            </div>

                                            {allowContact && <div className="relative grid gap-y-2 sm:col-span-3">
                                                <Label htmlFor="contact">
                                                    Celular/WhatsApp
                                                </Label>
                                                <Input
                                                    id="contact"
                                                    type="text"
                                                    name="contact"
                                                    value={phone}
                                                    maxLength={15}
                                                    required={allowContact}
                                                    onChange={handleChange}
                                                    tabIndex={4}
                                                />
                                                <InputError
                                                    message={errors.contact}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>}

                                            {(specialties && specialties.length > 0) && (
                                                <div className="relative grid gap-y-2 sm:col-span-6">
                                                    <fieldset>
                                                        <legend className="mb-4 text-sm leading-none font-medium">
                                                            Lista de
                                                            Especialidades
                                                        </legend>
                                                        <div className="grid grid-cols-1 grid-cols-4 gap-x-6 gap-y-4 rounded-lg border border-neutral-200 px-4 py-3 sm:grid-cols-3">
                                                            {specialties?.map(
                                                                (specialty) => (
                                                                    <div
                                                                        key={
                                                                            specialty.id
                                                                        }
                                                                        className="col-span-2 flex gap-3 sm:col-span-1"
                                                                    >
                                                                        <div className="flex h-6 shrink-0 items-center">
                                                                            <div className="group grid size-4 grid-cols-1">
                                                                                <Checkbox
                                                                                    disabled={
                                                                                        specialty.count >=
                                                                                        specialty.limit
                                                                                    }
                                                                                    id={
                                                                                        specialty.name
                                                                                    }
                                                                                    name="specialties[]"
                                                                                    value={
                                                                                        specialty.id
                                                                                    }
                                                                                    tabIndex={
                                                                                        5
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-sm/6">
                                                                            <label
                                                                                htmlFor={
                                                                                    specialty.name
                                                                                }
                                                                                className={cn(
                                                                                    'font-medium dark:text-white',
                                                                                    specialty.count >=
                                                                                        specialty.limit
                                                                                        ? 'text-neutral-400 dark:text-white/35'
                                                                                        : 'text-neutral-900 dark:text-white',
                                                                                )}
                                                                            >
                                                                                {
                                                                                    specialty.name
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </fieldset>
                                                    <InputError
                                                        message={errors.contact}
                                                        className="absolute top-full mt-1"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-6 sm:flex sm:flex-row-reverse">
                                            <button
                                                disabled={processing}
                                                className={clsx(
                                                    'relative inline-flex w-full cursor-pointer justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto dark:shadow-none',
                                                    processing
                                                        ? 'cursor-not-allowed dark:bg-green-300/75'
                                                        : 'dark:bg-green-500 dark:hover:bg-green-400',
                                                )}
                                            >
                                                {processing && (
                                                    <div className="absolute inset-0 grid place-items-center">
                                                        <LoaderCircle className="size-5 animate-spin stroke-primary" />
                                                    </div>
                                                )}
                                                <span
                                                    className={clsx(
                                                        processing &&
                                                            'invisible',
                                                    )}
                                                >
                                                    Cadastrar
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => closeModal()}
                                                className="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-xs inset-ring-1 inset-ring-neutral-300 hover:bg-neutral-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20 hover:bg-neutral-100"
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
