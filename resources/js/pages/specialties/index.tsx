import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Specialty } from '@/types';
import { Head } from '@inertiajs/react';
import { index } from '@/routes/specialties';
import Create from '@/components/specialty-modals/create';
import SpecialtyCards from '@/components/specialty-cards';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lista de Especialidades',
        href: index().url,
    },
];

export default function Index({specialties}: { specialties: Specialty[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Especialidades" />
            <div className="my-8 flex h-full flex-1 flex-col overflow-x-auto px-2 sm:px-0">
                <div>
                    <div className="mx-auto max-w-5xl rounded-xl dark:bg-neutral-900 bg-neutral-100 p-4">
                        {specialties.length < 1 ? (
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto text-neutral-700 dark:text-neutral-300">
                                    <h1 className="text-base font-semibold">
                                        Ainda não há especialidades cadastradas.
                                    </h1>
                                    <p className="mt-2 hidden text-sm lg:block">
                                        Clique no botão ao lado para cadastrar
                                        uma nova especialidade.
                                    </p>
                                    <p className="mt-2 text-sm sm:block lg:hidden">
                                        Clique no botão abaixo para cadastrar
                                        uma nova especialidade.
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                    <Create />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-base font-semibold text-neutral-900 dark:text-white">
                                            Especialidades
                                        </h1>
                                        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                                            Lista de todas as especialidades
                                            cadastradas no sistema.
                                        </p>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                        <Create />
                                    </div>
                                </div>

                                <SpecialtyCards specialties={specialties} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
