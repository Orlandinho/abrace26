import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Patient, Specialty } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { index, show } from '@/routes/patients';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/table';
import { isElder } from '@/lib/utils';
import Delete from '@/components/patient-modals/delete';
import Create from '@/components/patient-modals/create';
import Edit from '@/components/patient-modals/edit';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novo Paciente',
        href: index().url,
    },
];

export default function Index({ patients, specialties }: { patients: Patient[], specialties?: Specialty[] }) {
    const [search, setSearch] = useState('');

    const filteredPatients = useMemo(() => {
        // Se não houver busca, retorna a lista original
        if (!search.trim()) return patients;

        const lowerCaseSearch = search.toLowerCase();

        return patients.filter((p) => {
            // Busca por Nome ou CPF (ou qualquer outro campo relevante)
            return (
                p.name.toLowerCase().includes(lowerCaseSearch)
            );
        });
    }, [search, patients]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pacientes" />
            <div className="my-8 flex h-full flex-1 flex-col overflow-x-auto px-2 sm:px-0">
                <div>
                    <div className="mx-auto max-w-5xl rounded-xl bg-neutral-100 p-4 dark:bg-neutral-900">
                        {patients.length < 1 ? (
                            <div className="sm:flex sm:items-center">
                                <div className="text-neutral-800 sm:flex-auto dark:text-neutral-300">
                                    <h1 className="text-base font-semibold">
                                        Ainda não há pacientes cadastrados.
                                    </h1>
                                    <p className="mt-2 hidden text-sm lg:block">
                                        Clique no botão ao lado para cadastrar
                                        um novo paciente.
                                    </p>
                                    <p className="mt-2 text-sm text-neutral-800 sm:block lg:hidden dark:text-neutral-300">
                                        Clique no botão abaixo para cadastrar um
                                        novo paciente.
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                    <Create specialties={specialties} />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8 sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                            Pacientes
                                        </h1>
                                        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                                            Lista de todos os pacientes
                                            cadastrados no sistema.
                                        </p>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 flex">
                                        <Create specialties={specialties} />
                                        <Input className='max-w-48 ml-4'
                                               placeholder='Pesquisar paciente...'
                                               value={search}
                                               onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {filteredPatients.length < 1 ? (
                                    <p className="text-neutral-800 dark:text-neutral-300">Não há pacientes com esse nome</p>
                                ) :
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableHeader>Nome</TableHeader>
                                            <TableHeader>Idade</TableHeader>
                                            <TableHeader>Contato</TableHeader>
                                            <TableHeader>Consultas</TableHeader>
                                            <TableHeader>
                                                <span className="sr-only">
                                                    Edit and Delete
                                                </span>
                                            </TableHeader>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredPatients.map((patient) => (
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
                                                    <span
                                                        className={
                                                            isElder(patient.age)
                                                                ? 'text-red-400'
                                                                : ''
                                                        }
                                                    >
                                                        {' '}
                                                        {patient.age}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {patient.contact ??
                                                        'Sem contato cadastrado'}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        patient.specialties
                                                            ?.length
                                                    }
                                                </TableCell>
                                                <TableCell className="flex gap-x-3">
                                                    <Edit
                                                        patient={patient}
                                                        specialties={
                                                            specialties
                                                        }
                                                    />
                                                    <Delete patient={patient} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
