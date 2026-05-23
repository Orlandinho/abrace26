'use client';

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import React, { useRef, useState } from 'react';
import { Form } from '@inertiajs/react';
import { update } from '@/routes/triage';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { Patient } from '@/types';
import {
    formatHeight,
    formatPression,
    formatWeight,
    onlyNumbers,
} from '@/lib/utils';

export default function TriagemEdit({ patient } : { patient: Patient }) {

    const [open, setOpen] = useState(false);
    const firstInputRef = useRef<HTMLInputElement>(null);

    const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = formatHeight(e.target.value);
    };

    const handleWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = formatWeight(e.target.value);
    };

    const handlePression = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = formatPression(e.target.value);
    }

    const handleGlicemia = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = onlyNumbers(e.target.value);
    };

    const handleBreath = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = onlyNumbers(e.target.value);
    };

    const handlePulse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = onlyNumbers(e.target.value);
    };

    const handleTemperature = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = formatWeight(e.target.value);
    };

    const closeModal = () => {
        setOpen(false);
    }

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                type="button"
                className="block shrink-0 cursor-pointer rounded-md bg-amber-600 px-3 py-2 text-center text-sm font-semibold whitespace-nowrap text-white shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 dark:focus-visible:outline-amber-500"
            >
                Inserir Triagem
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
                            className="relative w-92 transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-neutral-900 dark:outline dark:-outline-offset-1 dark:outline-white/10"
                        >
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                <DialogTitle
                                    as="h3"
                                    className="text-base font-semibold text-neutral-900 dark:text-white"
                                >
                                    Atualizando dados de triagem de{' '}
                                    {patient.name}
                                </DialogTitle>
                            </div>
                            <Form
                                {...update.form(patient)}
                                onSuccess={() => closeModal()}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="relative grid gap-y-2 sm:col-span-2">
                                                <Label htmlFor="height">
                                                    Altura
                                                </Label>
                                                <Input
                                                    id="height"
                                                    type="text"
                                                    name="height"
                                                    suffix="m"
                                                    defaultValue={
                                                        patient.height ?? ''
                                                    }
                                                    maxLength={4}
                                                    ref={firstInputRef}
                                                    tabIndex={1}
                                                    onChange={handleHeight}
                                                />
                                                <InputError
                                                    message={errors.height}
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
                                                    name="weight"
                                                    suffix="kg"
                                                    defaultValue={
                                                        patient.weight ?? ''
                                                    }
                                                    maxLength={6}
                                                    tabIndex={2}
                                                    onChange={handleWeight}
                                                />
                                                <InputError
                                                    message={errors.weight}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-2">
                                                <Label htmlFor="pression">
                                                    Pressão Arterial
                                                </Label>
                                                <Input
                                                    id="pression"
                                                    type="text"
                                                    name="pression"
                                                    suffix="mmHg"
                                                    defaultValue={
                                                        patient.pression ?? ''
                                                    }
                                                    maxLength={7}
                                                    tabIndex={3}
                                                    onChange={handlePression}
                                                />
                                                <InputError
                                                    message={errors.pression}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-2">
                                                <Label htmlFor="glicemia">
                                                    Glicemia
                                                </Label>
                                                <Input
                                                    id="glicemia"
                                                    type="text"
                                                    name="glicemia"
                                                    suffix="mg/dL"
                                                    defaultValue={
                                                        patient.glicemia ?? ''
                                                    }
                                                    maxLength={3}
                                                    tabIndex={4}
                                                    onChange={handleGlicemia}
                                                />
                                                <InputError
                                                    message={errors.glicemia}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-2">
                                                <Label htmlFor="temperature">
                                                    Temperatura
                                                </Label>
                                                <Input
                                                    id="temperature"
                                                    type="text"
                                                    name="temperature"
                                                    suffix="ºC"
                                                    defaultValue={
                                                        patient.temperature ??
                                                        ''
                                                    }
                                                    maxLength={4}
                                                    tabIndex={5}
                                                    onChange={handleTemperature}
                                                />
                                                <InputError
                                                    message={errors.temperature}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-2">
                                                <Label htmlFor="breath">
                                                    Frequência Respiratória
                                                </Label>
                                                <Input
                                                    id="breath"
                                                    type="text"
                                                    name="breath"
                                                    suffix="ipm"
                                                    defaultValue={
                                                        patient.breath ?? ''
                                                    }
                                                    maxLength={2}
                                                    tabIndex={6}
                                                    onChange={handleBreath}
                                                />
                                                <InputError
                                                    message={errors.breath}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-2">
                                                <Label htmlFor="pulse">
                                                    Pulso
                                                </Label>
                                                <Input
                                                    id="pulse"
                                                    type="text"
                                                    name="pulse"
                                                    suffix="bpm"
                                                    defaultValue={
                                                        patient.pulse ?? ''
                                                    }
                                                    maxLength={3}
                                                    tabIndex={7}
                                                    onChange={handlePulse}
                                                />
                                                <InputError
                                                    message={errors.pulse}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>
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
                                                    Inserir Dados
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => closeModal()}
                                                className="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-xs inset-ring-1 inset-ring-neutral-300 hover:bg-neutral-50 hover:bg-neutral-100 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
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
