import { ChevronDownIcon, SquarePenIcon } from 'lucide-react';
import { Patient } from '@/types';
import { Link } from '@inertiajs/react';
import { create, edit, show } from '@/routes/patients';
import { isElder } from '@/lib/utils';
import DeletePatientModal from '@/components/delete-patient-modal';

export default function PatientsTable({ patients }: { patients: Patient[]}) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-neutral-900 dark:text-white">
                        Pacientes
                    </h1>
                    <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                        Lista de todos os pacientes cadastrados no sistema.
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
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="relative min-w-full divide-y divide-neutral-300 dark:divide-white/15">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-neutral-900 sm:pl-0 dark:text-white"
                                    >
                                        <a
                                            href="#"
                                            className="group inline-flex"
                                        >
                                            Nome
                                            <span className="invisible ml-2 flex-none rounded-sm text-neutral-400 group-hover:visible group-focus:visible dark:text-neutral-500">
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="size-5"
                                                />
                                            </span>
                                        </a>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900 dark:text-white"
                                    >
                                        <a
                                            href="#"
                                            className="group inline-flex"
                                        >
                                            Idade
                                            <span className="ml-2 flex-none rounded-sm bg-neutral-100 text-neutral-900 group-hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:group-hover:bg-neutral-700">
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="size-5"
                                                />
                                            </span>
                                        </a>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900 dark:text-white"
                                    >
                                        <a
                                            href="#"
                                            className="group inline-flex"
                                        >
                                            Email
                                            <span className="invisible ml-2 flex-none rounded-sm text-neutral-400 group-hover:visible group-focus:visible dark:text-neutral-500">
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="invisible ml-2 size-5 flex-none rounded-sm text-neutral-400 group-hover:visible group-focus:visible dark:text-neutral-500"
                                                />
                                            </span>
                                        </a>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900 dark:text-white"
                                    >
                                        <a
                                            href="#"
                                            className="group inline-flex"
                                        >
                                            Contato/WhatsApp
                                            <span className="invisible ml-2 flex-none rounded-sm text-neutral-400 group-hover:visible group-focus:visible dark:text-neutral-500">
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="invisible ml-2 size-5 flex-none rounded-sm text-neutral-400 group-hover:visible group-focus:visible dark:text-neutral-500"
                                                />
                                            </span>
                                        </a>
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pr-0 pl-3"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 bg-white dark:divide-white/10 dark:bg-neutral-900">
                                {patients.map((patient) => (
                                    <tr key={patient.id}>
                                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-neutral-900 sm:pl-0 dark:text-white">
                                            <Link href={show(patient)} className="hover:underline">
                                                {patient.name}
                                            </Link>
                                        </td>
                                        <td className={"px-3 py-4 text-sm whitespace-nowrap " + (isElder(patient.age) ? "text-red-400" : "text-neutral-500 dark:text-neutral-400")}>
                                            {patient.age}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                                            {patient.email ?? 'Sem e-mail cadastrado'}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                                            {patient.contact ?? 'Sem contato cadastrado'}
                                        </td>
                                        <td className="py-4 pr-4 flex gap-x-3 pl-3 text-right text-sm whitespace-nowrap sm:pr-0">
                                            <Link
                                                href={edit(patient)}
                                                className="text-green-600 hover:text-green-400"
                                            >
                                                <SquarePenIcon className="size-5" >
                                                    <span className="sr-only">
                                                        , {patient.id}
                                                    </span>
                                                </SquarePenIcon>
                                            </Link>
                                            <DeletePatientModal patient={patient} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
