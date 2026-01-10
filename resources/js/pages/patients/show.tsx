import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Patient } from '@/types';
import { Head } from '@inertiajs/react';
import { index } from '@/routes/patients';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novo Paciente',
        href: index().url,
    },
];

export default function Show({ patient }: { patient: Patient }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={patient.name} />
            <div className="my-8 flex h-full flex-1 flex-col overflow-x-auto px-2 sm:px-0">
                <div>
                    <div className="mx-auto max-w-5xl rounded-xl bg-neutral-900 p-4">
                        <div>
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base/7 font-semibold text-neutral-900 dark:text-white">
                                    Paciente {patient.name.split(' ', 1)}
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm/6 text-neutral-500 dark:text-neutral-400">
                                    Personal details and application.
                                </p>
                            </div>
                            <div className="mt-6">
                                <dl className="grid grid-cols-1 sm:grid-cols-2">
                                    <div className="border-t border-neutral-100 px-4 py-6 sm:col-span-1 sm:px-0 dark:border-white/10">
                                        <dt className="text-sm/6 font-medium text-neutral-900 dark:text-white">
                                            Nome Completo
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-neutral-700 sm:mt-2 dark:text-neutral-400">
                                            {patient.name}
                                        </dd>
                                    </div>
                                    <div className="border-t border-neutral-100 px-4 py-6 sm:col-span-1 sm:px-0 dark:border-white/10">
                                        <dt className="text-sm/6 font-medium text-neutral-900 dark:text-white">
                                            Idade
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-neutral-700 sm:mt-2 dark:text-neutral-400">
                                            {patient.age}
                                        </dd>
                                    </div>
                                    {patient.email && (
                                        <div className="border-t border-neutral-100 px-4 py-6 sm:col-span-1 sm:px-0 dark:border-white/10">
                                            <dt className="text-sm/6 font-medium text-neutral-900 dark:text-white">
                                                E-mail
                                            </dt>
                                            <dd className="mt-1 text-sm/6 text-neutral-700 sm:mt-2 dark:text-neutral-400">
                                                {patient.email}
                                            </dd>
                                        </div>
                                    )}
                                    {patient.contact && (
                                        <div className="border-t border-neutral-100 px-4 py-6 sm:col-span-1 sm:px-0 dark:border-white/10">
                                            <dt className="text-sm/6 font-medium text-neutral-900 dark:text-white">
                                                Contato/WhatsApp
                                            </dt>
                                            <dd className="mt-1 text-sm/6 text-neutral-700 sm:mt-2 dark:text-neutral-400">
                                                {patient.contact}
                                            </dd>
                                        </div>
                                    )}
                                    <div className="border-t border-neutral-100 px-4 py-6 sm:col-span-2 sm:px-0 dark:border-white/10">
                                        <dt className="text-sm/6 font-medium text-neutral-900 dark:text-white">
                                            About
                                        </dt>
                                        <dd className="mt-1 text-sm/6 text-neutral-700 sm:mt-2 dark:text-neutral-400">
                                            Fugiat ipsum ipsum deserunt culpa
                                            aute sint do nostrud anim incididunt
                                            cillum culpa consequat. Excepteur
                                            qui ipsum aliquip consequat sint.
                                            Sit id mollit nulla mollit nostrud
                                            in ea officia proident. Irure
                                            nostrud pariatur mollit ad
                                            adipisicing reprehenderit deserunt
                                            qui eu.
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
