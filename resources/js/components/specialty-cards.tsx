import { Specialty } from '@/types';
import Edit from '@/components/specialty-modals/edit';
import Delete from '@/components/specialty-modals/delete';

export default function SpecialtyCards( { specialties }: { specialties: Specialty[] }) {
    return (
        <div className="mt-10">
            <ul
                role="list"
                className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
            >
                {specialties.map((specialty) => (
                    <li
                        key={specialty.id}
                        className="col-span-1 flex rounded-md shadow-xs dark:shadow-none"
                    >
                        <div className="flex flex-1 items-center justify-between truncate rounded-md border border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-800/50">
                            <div className="flex-1 space-y-2 truncate px-4 py-2 text-sm">
                                <p className="font-medium text-neutral-900 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-200">
                                    {specialty.name}
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-400">
                                    Total: {specialty.limit}
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-400">
                                    {specialty.count > 1 ? 'Pacientes' : 'Paciente'}: {specialty.count}
                                </p>
                            </div>
                            <div className="flex shrink-0 items-center justify-center gap-2 pr-2">
                                <Edit specialty={specialty} />
                                <Delete specialty={specialty} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
