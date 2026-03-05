import { SquarePen, Trash } from 'lucide-react';
import { Specialty } from '@/types';
import UpdateSpecialityModal from '@/components/update-speciality-modal';
import DeleteSpecialtyModal from '@/components/delete-specialty-modal';

export default function SpecialtyCards( {specialties}: { specialties: Specialty[]}) {
    return (
        <div className="mt-16">
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
                            <div className="flex-1 truncate px-4 py-2 text-sm space-y-2">
                                <p
                                    className="font-medium text-neutral-900 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-200"
                                >
                                    {specialty.name}
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-400">
                                    Total: {specialty.limit}
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-400">
                                    Pacientes: 0
                                </p>
                            </div>
                            <div className="shrink-0 flex justify-center items-center gap-2 pr-2">
                                <UpdateSpecialityModal specialty={specialty} />
                                <DeleteSpecialtyModal specialty={specialty} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
