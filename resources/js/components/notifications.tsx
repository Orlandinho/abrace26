'use client'

import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'
import {
    CheckCircleIcon,
    CircleXIcon,
    TriangleAlertIcon,
    XIcon,
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function Notifications() {
    const [show, setShow] = useState(false)
    const { alert } = usePage<SharedData>().props
    type AlertType = 'success' | 'failure' | 'warning';

    const setIconColor: Record<AlertType, string> = {
        success: 'text-green-600',
        failure: 'text-red-600',
        warning: 'text-yellow-600',
    };

    const setIcon: Record<AlertType, React.ElementType> = {
        success: CheckCircleIcon,
        failure: CircleXIcon,
        warning: TriangleAlertIcon,
    }

    const Icon = setIcon[alert?.type]

    useEffect(() => {
        if (!alert) return;

        const startTimer = setTimeout(() => setShow(true), 0);

        const hideTimer = setTimeout(() => setShow(false), 5000);

        return () => {
            clearTimeout(startTimer);
            clearTimeout(hideTimer);
        };
    }, [alert]);

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            {alert && (
                <div
                    aria-live="assertive"
                    className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
                >
                    <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                        <Transition show={show}>
                            <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg outline-1 outline-black/5 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0 dark:bg-neutral-800 dark:-outline-offset-1 dark:outline-white/10">
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <Icon aria-hidden="true" className={"size-6 " + setIconColor[alert.type]} />
                                        </div>
                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                            <p className="text-sm font-medium text-neutral-900 dark:text-white">{ alert.title }</p>
                                            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                                { alert.message }
                                            </p>
                                        </div>
                                        <div className="ml-4 flex shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShow(false)
                                                }}
                                                className="inline-flex rounded-md text-neutral-400 hover:text-neutral-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:hover:text-white dark:focus:outline-indigo-500"
                                            >
                                                <span className="sr-only">Close</span>
                                                <XIcon aria-hidden="true" className="size-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            )}
        </>
    )
}
