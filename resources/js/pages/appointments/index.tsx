import Delete from '@/components/appointment-modals/delete';
import UpdateStatus from '@/components/appointment-modals/edit-status';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/table';
import AppLayout from '@/layouts/app-layout';
import { isElder } from '@/lib/utils';
import { index } from '@/routes/appointments';
import { Appointment, type BreadcrumbItem } from '@/types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novo Paciente',
        href: index().url,
    },
];

export default function Dashboard({
    appointments,
}: {
    appointments: Appointment[];
}) {
    const categories = [
        {
            title: 'Em Andamento',
            description: 'Lista de todas as consultas em andamento no sistema.',
            appointments: appointments.filter((a) => [0, 1].includes(a.status)),
        },
        {
            title: 'Encerradas',
            description: 'Lista de todas as consultas encerradas no sistema.',
            appointments: appointments.filter((a) => a.status === 2),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Consultas" />
            <div className="my-8 flex h-full flex-1 flex-col overflow-x-auto px-2 sm:px-0">
                <div>
                    <div className="mx-auto max-w-5xl rounded-xl bg-neutral-900 p-4">
                        {appointments.length < 1 ? (
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold text-neutral-900 dark:text-white">
                                        Ainda não há consultas cadastrados.
                                    </h1>
                                </div>
                            </div>
                        ) : (
                            <>
                                <TabGroup>
                                    <TabList className="mb-4 flex justify-center gap-4">
                                        {categories.map(
                                            ({ title, description }) => (
                                                <Tab
                                                    key={title}
                                                    className="rounded-xl px-3 py-1 text-sm/6 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-black data-[hover]:bg-black/5 data-[selected]:bg-black/10 data-[selected]:data-[hover]:bg-black/10 dark:data-[focus]:outline-white dark:data-[hover]:bg-white/5 dark:data-[selected]:bg-white/10 dark:data-[selected]:data-[hover]:bg-white/10"
                                                >
                                                    <h1 className="text-base font-semibold text-neutral-900 dark:text-white">
                                                        {title}
                                                    </h1>
                                                    <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                                                        {description}
                                                    </p>
                                                </Tab>
                                            ),
                                        )}
                                    </TabList>

                                    <TabPanels>
                                        {categories.map(
                                            ({ title, appointments }) => (
                                                <TabPanel
                                                    key={title}
                                                >
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableHeader>
                                                                    Nome
                                                                </TableHeader>
                                                                <TableHeader>
                                                                    Idade
                                                                </TableHeader>
                                                                <TableHeader>
                                                                    Especialidade
                                                                </TableHeader>
                                                                <TableHeader>
                                                                    Status
                                                                </TableHeader>
                                                                <TableHeader>
                                                                    <span className="sr-only">
                                                                        Delete
                                                                    </span>
                                                                </TableHeader>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {appointments.map(
                                                                (
                                                                    appointment,
                                                                ) => (
                                                                    <TableRow
                                                                        key={
                                                                            appointment.id
                                                                        }
                                                                    >
                                                                        <TableCell className="font-medium">
                                                                            {
                                                                                appointment
                                                                                    .patient
                                                                                    .name
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <span
                                                                                className={
                                                                                    isElder(
                                                                                        appointment
                                                                                            .patient
                                                                                            .age,
                                                                                    )
                                                                                        ? 'text-red-400'
                                                                                        : ''
                                                                                }
                                                                            >
                                                                                {' '}
                                                                                {
                                                                                    appointment
                                                                                        .patient
                                                                                        .age
                                                                                }
                                                                            </span>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                appointment
                                                                                    .specialty
                                                                                    .name
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <UpdateStatus
                                                                                appointment={
                                                                                    appointment
                                                                                }
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell className="flex gap-x-3">
                                                                            <Delete
                                                                                appointment={
                                                                                    appointment
                                                                                }
                                                                            />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ),
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </TabPanel>
                                            ),
                                        )}
                                    </TabPanels>
                                </TabGroup>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
