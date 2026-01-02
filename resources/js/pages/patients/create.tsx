import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { create } from '@/routes/patients';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { store } from '@/routes/patients';
import React, { useState } from 'react';
import { formatPhone } from '@/lib/utils'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novo Paciente',
        href: create().url,
    },
];

export default function Create() {

    const [phone, setPhone] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhone(e.target.value));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Paciente" />
            <div className="my-8 flex h-full flex-1 flex-col overflow-x-auto">
                <div>
                    <Form
                        {...store.form()}
                        className="mx-auto max-w-5xl rounded-xl bg-neutral-900 p-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div>
                                    <div className="border-b border-neutral-900/10 pb-12 dark:border-white/10">
                                        <h2 className="text-base/7 font-semibold text-neutral-900 dark:text-white">
                                            Dados Pessoais
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
                                        Cancel
                                    </button>
                                    <Button
                                        type="submit"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner />}
                                        Salvar
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
