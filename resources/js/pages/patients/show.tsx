import AppLayout from '@/layouts/app-layout';
import { Appointment, type BreadcrumbItem, Patient } from '@/types';
import { Head } from '@inertiajs/react';
import { index } from '@/routes/patients';
import EditStatus from '@/components/appointment-modals/edit-status';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novo Paciente',
        href: index().url,
    },
];

export default function Show({ appointments, patient }: { appointments: Appointment[], patient: Patient }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={patient.name} />
            <div className="my-8 flex h-full flex-1 flex-col overflow-x-auto px-2 sm:px-0">
                <div>
                    <div className="mx-auto max-w-5xl rounded-xl bg-neutral-900 p-4">
                        <div>
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base/7 font-semibold text-neutral-900 dark:text-white">
                                    Paciente{' '}
                                    {patient.name.split(' ', 1)}
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm/6 text-neutral-500 dark:text-neutral-400">
                                    Informações pessoais e estado das consultas
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
                                    {patient.contact && (
                                        <div className="border-t border-neutral-100 px-4 py-6 sm:col-span-2 sm:px-0 dark:border-white/10">
                                            <dt className="text-sm/6 font-medium text-neutral-900 dark:text-white">
                                                Contato/WhatsApp
                                            </dt>
                                            <dd className="mt-1 text-sm/6 text-neutral-700 sm:mt-2 dark:text-neutral-400">
                                                {
                                                    patient.contact
                                                }
                                            </dd>
                                        </div>
                                    )}
                                    {appointments &&
                                        appointments.length > 0 && (
                                            <div className="border-t border-neutral-100 px-4 py-6 sm:col-span-2 sm:px-0 dark:border-white/10">
                                                <dt className="text-sm/6 font-medium text-neutral-900 dark:text-white">
                                                    Consultas
                                                </dt>
                                                <dd className="mt-1 text-sm/6 text-neutral-700 sm:mt-2 dark:text-neutral-400">
                                                    <ul>
                                                        {appointments.map(
                                                            (appointment) => (
                                                                <li key={ appointment.id } className="grid grid-cols-4 gap-x-4 py-2" >
                                                                    <div className="col-span-1">
                                                                        { appointment.specialty.name }
                                                                    </div>
                                                                    <div className="col-span-1">
                                                                        <EditStatus appointment={appointment} />
                                                                    </div>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </dd>
                                            </div>
                                        )}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
