'use client';

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import React, { useRef, useState } from 'react';
import { Form } from '@inertiajs/react';
import { update } from '@/routes/patients';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { LoaderCircle, SquarePen } from 'lucide-react';
import { clsx } from 'clsx';
import { cn, formatHeight, formatPhone, formatWeight } from '@/lib/utils';
import { Patient, Specialty } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';

export default function Edit({ patient, specialties } : { patient: Patient, specialties?: Specialty[] }) {

    const [open, setOpen] = useState(false);
    const [phone, setPhone] = useState(patient.contact ?? '');
    const [allowContact, setAllowContact] = useState(patient.allow_contact ?? 0);
    const [height, setHeight] = useState(patient.height ??'');
    const [weight, setWeight] = useState(patient.weight ?? '');
    const firstInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setPhone(formatPhone(e.target.value));
    };

    const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(formatHeight(e.target.value));
    };

    const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(formatWeight(e.target.value));
    };

    const selectedIds = (patient.specialties ?? []).map((s) => s.id);

    const canSelect = (specialty: Specialty) => {
        return specialty.count >= specialty.limit &&
            !selectedIds.includes(specialty.id);
    }

    const closeModal = () => {
        setOpen(false);
        setPhone('');
    }

    return (
        <div>
            <button onClick={() => setOpen(true)} className="cursor-pointer">
                <SquarePen className="size-5 text-green-600 hover:text-green-400" />
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
                            key={patient.id}
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-92 sm:w-full sm:max-w-xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-neutral-900 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                        >
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                <DialogTitle
                                    as="h3"
                                    className="text-base font-semibold text-neutral-900 dark:text-white"
                                >
                                    Atualizando dados de {patient.name}
                                </DialogTitle>
                            </div>
                            <Form
                                {...update.form(patient)}
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
                                                    defaultValue={patient.name}
                                                    maxLength={100}
                                                    ref={firstInputRef}
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
                                                    defaultValue={patient.dob}
                                                    required
                                                    tabIndex={2}
                                                />
                                                <InputError
                                                    message={errors.dob}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-2">
                                                <Label htmlFor="height">
                                                    Altura
                                                </Label>
                                                <Input
                                                    id="height"
                                                    type="text"
                                                    name="height"
                                                    suffix="m"
                                                    value={height}
                                                    tabIndex={3}
                                                    maxLength={4}
                                                    inputMode="numeric"
                                                    onChange={handleHeight}
                                                />
                                                <InputError
                                                    message={errors.dob}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-2">
                                                <Label htmlFor="weight">
                                                    Peso
                                                </Label>
                                                <Input
                                                    id="weight"
                                                    type="text"
                                                    suffix="kg"
                                                    name="weight"
                                                    value={weight}
                                                    tabIndex={4}
                                                    inputMode="numeric"
                                                    maxLength={6}
                                                    onChange={handleWeight}
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
                                                        checked={
                                                            Boolean(allowContact)
                                                        }
                                                        value={1}
                                                        onCheckedChange={(
                                                            checked: boolean,
                                                        ) => {
                                                            setAllowContact(
                                                                checked
                                                            );
                                                        }}
                                                        tabIndex={5}
                                                    />
                                                    <Label htmlFor="allow_contact">
                                                        Permite guardar o
                                                        contato?
                                                    </Label>
                                                </div>
                                            </div>

                                            {Boolean(allowContact) && <div className="relative grid gap-y-2 sm:col-span-3">
                                                <Label
                                                    className={allowContact ? '' : 'text-neutral-400'}
                                                    htmlFor="contact">
                                                    Celular/WhatsApp
                                                </Label>
                                                <Input
                                                    id="contact"
                                                    type="text"
                                                    name="contact"
                                                    className={allowContact ? 'cursor-text' : 'cursor-not-allowed'}
                                                    value={phone}
                                                    required={allowContact}
                                                    maxLength={10}
                                                    onChange={handleChange}
                                                    tabIndex={6}
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
                                                        <div className="grid grid-cols-1 grid-cols-4 gap-x-6 gap-y-4 rounded-lg border border-neutral-200 dark:border-neutral-800 px-4 py-3 sm:grid-cols-3">
                                                            {specialties.map(
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
                                                                                    id={
                                                                                        specialty.name
                                                                                    }
                                                                                    name="specialties[]"
                                                                                    value={
                                                                                        specialty.id
                                                                                    }
                                                                                    disabled={canSelect(specialty)}
                                                                                    defaultChecked={selectedIds.includes(
                                                                                        specialty.id
                                                                                    )}
                                                                                    tabIndex={
                                                                                        7
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
                                                                                    canSelect(specialty)
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
                                                tabIndex={8}
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
                                                    Atualizar
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                tabIndex={9}
                                                onClick={() => closeModal()}
                                                className="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-xs inset-ring-1 inset-ring-neutral-300 hover:bg-neutral-50 sm:mt-0 sm:w-auto hover:bg-neutral-100 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
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
