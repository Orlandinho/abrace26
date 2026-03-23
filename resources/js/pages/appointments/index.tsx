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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { isElder } from '@/lib/utils';
import { index } from '@/routes/appointments';
import { Appointment, type BreadcrumbItem } from '@/types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Novo Paciente',
        href: index().url,
    },
];

export default function Index({ appointments }: { appointments: Appointment[] }) {

    const [specialtyFilter, setSpecialtyFilter] = useState("all");
    const [search, setSearch] = useState('');

    const uniqueSpecialties = useMemo(() => {
        const names = appointments.map(a => a.specialty.name).filter(Boolean);

        return Array.from(new Set(names)).sort();
    }, [appointments]);

    const filteredAppointments = useMemo(() => {
        if (specialtyFilter === 'all') return appointments;

        return appointments.filter(
            (app) => app.specialty.name === specialtyFilter,
        );
    }, [specialtyFilter, appointments]);

    const categories = [
        {
            title: 'Consultas Em Andamento',
            total: filteredAppointments.filter((a) => [0, 1].includes(a.status))
                .length,
            appointments: filteredAppointments.filter((a) =>
                [0, 1].includes(a.status),
            ),
        },
        {
            title: 'Consultas Encerradas',
            total: filteredAppointments.filter((a) => a.status === 2).length,
            appointments: filteredAppointments
                .filter((a) => a.status === 2)
                .sort((a, b) => {
                    const dataA = new Date(a.completed);
                    const dataB = new Date(b.completed);

                    return dataB.getTime() - dataA.getTime();
                }),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Consultas" />
            <div className="my-8 flex h-full flex-1 flex-col overflow-x-auto px-2 sm:px-0">
                <div>
                    <div className="mx-auto max-w-5xl rounded-xl bg-neutral-100 p-4 dark:bg-neutral-900">
                        {filteredAppointments.length < 1 ? (
                            <div className="sm:flex sm:items-center">
                                <div className="text-neutral-900 sm:flex-auto dark:text-neutral-100">
                                    <h1 className="text-base font-semibold">
                                        Ainda não há consultas cadastrados.
                                    </h1>
                                </div>
                            </div>
                        ) : (
                            <>
                                <TabGroup>
                                    <TabList className="mb-4 flex justify-around gap-4">
                                        {categories.map(({ title, total }) => (
                                            <Tab
                                                key={title}
                                                className="cursor-pointer rounded-xl px-3 py-2 text-sm/6 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-black data-[hover]:bg-black/5 data-[selected]:bg-black/10 data-[selected]:data-[hover]:bg-black/10 dark:data-[focus]:outline-white dark:data-[hover]:bg-white/5 dark:data-[selected]:bg-white/10 dark:data-[selected]:data-[hover]:bg-white/10"
                                            >
                                                <h1 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                                    {title}
                                                </h1>
                                                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                                    Total: {total}
                                                </p>
                                            </Tab>
                                        ))}
                                    </TabList>

                                    <div className="my-4 sm:ml-1">
                                        <Select
                                            value={specialtyFilter}
                                            onValueChange={setSpecialtyFilter}
                                        >
                                            <SelectTrigger className="w-full max-w-60">
                                                <SelectValue placeholder="Selecione uma especialidade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Especialidades
                                                    </SelectLabel>
                                                    <SelectItem
                                                        key={'all'}
                                                        value={'all'}
                                                    >
                                                        Todas
                                                    </SelectItem>
                                                    {uniqueSpecialties.map(
                                                        (specialty) => (
                                                            <SelectItem
                                                                key={specialty}
                                                                value={
                                                                    specialty
                                                                }
                                                            >
                                                                {specialty}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <TabPanels>
                                        {categories.map(
                                            ({ title, appointments }) => (
                                                <TabPanel key={title}>
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
