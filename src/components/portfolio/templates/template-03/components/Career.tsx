import React from 'react';
import { Briefcase } from 'lucide-react';
import { CustomIcon } from './CustomIcon';

function CareerItem({ careerItem }: { careerItem: any }) {
    return (
        <li className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <CustomIcon name={careerItem.logo || 'briefcase'} />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {careerItem.company}
                </dd>
                <dt className="sr-only">Title</dt>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                    {careerItem.title}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                    className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                    aria-label={`${careerItem.start} until ${careerItem.end}`}
                >
                    {careerItem.start} - {careerItem.end}
                </dd>
            </dl>
        </li>
    )
}

export default function Career({ items }: { items?: any[] }) {
    const displayList = (items || []).map(item => ({
        company: item.companyName,
        title: item.title,
        logo: 'briefcase',
        start: item.startDate ? new Date(item.startDate).getFullYear().toString() : '',
        end: item.endDate ? new Date(item.endDate).getFullYear().toString() : 'Present'
    }));

    if (displayList.length === 0) return null;

    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 bg-white dark:bg-zinc-900/50">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 items-center">
                <Briefcase className="h-5 w-5 text-zinc-400" />
                <span className="ml-3">Work</span>
            </h2>
            <ol className="mt-6 space-y-4">
                {displayList.map((careerItem, careerItemIndex) => (
                    <CareerItem key={careerItemIndex} careerItem={careerItem} />
                ))}
            </ol>
        </div>
    )
}
