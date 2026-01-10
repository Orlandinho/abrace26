import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Patient } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { index, update } from '@/routes/patients';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { formatPhone } from '@/lib/utils'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novo Paciente',
        href: index().url,
    },
];

export default function Edit({ patient }: { patient: Patient }) {

    const [phone, setPhone] = useState(patient.contact);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhone(e.target.value));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={patient.name} />
            <div className="my-8 flex h-full flex-1 flex-col overflow-x-auto">
                <div>
                    <Form
                        {...update.form(patient)}
                        className="mx-auto max-w-5xl rounded-xl bg-neutral-900 p-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div>
                                    <div className="border-b border-neutral-900/10 pb-12 dark:border-white/10">
                                        <h2 className="text-base/7 font-semibold text-neutral-900 dark:text-white">
                                            Dados de {patient.name}
                                        </h2>
                                        <p className="mt-1 text-sm/6 text-neutral-600 dark:text-neutral-400">
                                            Apenas nome e data de nascimento são
                                            obrigatórios.
                                        </p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-6">
                                            <div className="relative grid gap-y-2 sm:col-span-3">
                                                <Label htmlFor="name">
                                                    Nome
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    defaultValue={patient.name}
                                                    maxLength={150}
                                                    autoFocus
                                                    tabIndex={1}
                                                />
                                                <InputError
                                                    message={errors.name}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="grid gap-y-2 sm:col-span-3">
                                                <Label htmlFor="dob">
                                                    Data de Nascimento
                                                </Label>
                                                <Input
                                                    id="dob"
                                                    type="date"
                                                    name="dob"
                                                    defaultValue={patient.dob}
                                                    tabIndex={2}
                                                />
                                                <InputError
                                                    message={errors.dob}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="relative grid gap-y-2 sm:col-span-3">
                                                <Label htmlFor="contact">
                                                    Celular/WhatsApp
                                                </Label>
                                                <Input
                                                    id="contact"
                                                    type="text"
                                                    name="contact"
                                                    value={phone}
                                                    maxLength={15}
                                                    onChange={handleChange}
                                                    tabIndex={3}
                                                />
                                                <InputError
                                                    message={errors.contact}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>

                                            <div className="grid gap-y-2 sm:col-span-3">
                                                <Label htmlFor="email">
                                                    E-mail
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    defaultValue={patient.email}
                                                    maxLength={150}
                                                    tabIndex={4}
                                                />
                                                <InputError
                                                    message={errors.email}
                                                    className="absolute top-full mt-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button
                                        type="button"
                                        className="text-sm/6 font-semibold text-neutral-900 dark:text-white"
                                    >
                                        Cancelar
                                    </button>
                                    <Button
                                        type="submit"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner />}
                                        Atualizar
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
