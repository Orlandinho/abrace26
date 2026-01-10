import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Patient } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { create, edit, index, show } from '@/routes/patients';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/table';
import { isElder } from '@/lib/utils';
import { SquarePenIcon } from 'lucide-react';
import DeletePatientModal from '@/components/delete-patient-modal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novo Paciente',
        href: index().url,
    },
];

export default function Index({patients}: { patients: Patient[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Paciente" />
            <div className="my-8 flex h-full flex-1 flex-col overflow-x-auto px-2 sm:px-0">
                <div>
                    <div className="mx-auto max-w-5xl rounded-xl bg-neutral-900 p-4">
                        {patients.length < 2 ? (
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold text-neutral-900 dark:text-white">
                                        Ainda não há pacientes cadastrados.
                                    </h1>
                                    <p className="mt-2 hidden text-sm text-neutral-700 lg:block dark:text-neutral-300">
                                        Clique no botão ao lado para cadastrar
                                        um novo paciente.
                                    </p>
                                    <p className="mt-2 text-sm text-neutral-700 sm:block lg:hidden dark:text-neutral-300">
                                        Clique no botão abaixo para cadastrar um
                                        novo paciente.
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
                            //<PatientsTable patients={props.patients} />
                            <>
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-base font-semibold text-neutral-900 dark:text-white">
                                            Pacientes
                                        </h1>
                                        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                                            Lista de todos os pacientes
                                            cadastrados no sistema.
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
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableHeader>Nome</TableHeader>
                                            <TableHeader>Idade</TableHeader>
                                            <TableHeader>Email</TableHeader>
                                            <TableHeader>Contato</TableHeader>
                                            <TableHeader>
                                                <span className="sr-only">
                                                    Edit and Delete
                                                </span>
                                            </TableHeader>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {patients.map((patient) => (
                                            <TableRow key={patient.id}>
                                                <TableCell className="font-medium">
                                                    <Link
                                                        href={show(patient)}
                                                        className={
                                                            'hover:underline'
                                                        }
                                                    >
                                                        {patient.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <span className={
                                                        isElder(patient.age)
                                                            ? 'text-red-400'
                                                            : ''
                                                    }> {patient.age}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {patient.email ??
                                                        'Sem e-mail cadastrado'}
                                                </TableCell>
                                                <TableCell>
                                                    {patient.contact ??
                                                        'Sem contato cadastrado'}
                                                </TableCell>
                                                <TableCell
                                                    className={'flex gap-x-3'}
                                                >
                                                    <Link
                                                        href={edit(patient)}
                                                        className="text-green-600 hover:text-green-400"
                                                    >
                                                        <SquarePenIcon className="size-5">
                                                            <span className="sr-only">
                                                                , {patient.id}
                                                            </span>
                                                        </SquarePenIcon>
                                                    </Link>
                                                    <DeletePatientModal
                                                        patient={patient}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
