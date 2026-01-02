import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { create, index } from '@/routes/patients';

import PatientsTable from '@/components/patients-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novo Paciente',
        href: index().url,
    },
];

export default function Index({...props}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Paciente" />
            <div className="my-8 flex h-full flex-1 flex-col overflow-x-auto px-2 sm:px-0">
                <div>
                    <div className="mx-auto max-w-5xl rounded-xl bg-neutral-900 p-4">
                        {props.patients.length < 2 ? (
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold text-neutral-900 dark:text-white">
                                        Ainda não há pacientes cadastrados.
                                    </h1>
                                    <p className="mt-2 hidden lg:block text-sm text-neutral-700 dark:text-neutral-300">
                                        Clique no botão ao lado para cadastrar um novo paciente.
                                    </p>
                                    <p className="mt-2 sm:block lg:hidden text-sm text-neutral-700 dark:text-neutral-300">
                                        Clique no botão abaixo para cadastrar um novo paciente.
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                    <Link
                                        href={create().url}
                                        type="button"
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                                    >
                                        Novo paciente
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <PatientsTable patients={props.patients} />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
