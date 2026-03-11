import { GraduationCap as LucideGraduationCap } from 'lucide-react';
import { CustomIcon } from './CustomIcon';

function EducationItem({ educationItem }: { educationItem: any }) {
    return (
        <li className="flex gap-4 text-zinc-900 dark:text-zinc-100">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <CustomIcon name={educationItem.logo || 'education'} />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">School</dt>
                <dd className="w-full flex-none text-sm font-medium">
                    {educationItem.school}
                </dd>
                <dt className="sr-only">Major</dt>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                    {educationItem.major}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                    className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                    aria-label={`${educationItem.start} until ${educationItem.end}`}
                >
                    {educationItem.start} - {educationItem.end}
                </dd>
            </dl>
        </li>
    )
}

export default function Education({ items }: { items?: any[] }) {
    const displayList = (items || []).map(item => ({
        school: item.schoolName,
        major: item.degreeName + (item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ''),
        logo: 'education',
        start: item.startDate ? new Date(item.startDate).getFullYear().toString() : '',
        end: item.endDate ? new Date(item.endDate).getFullYear().toString() : 'Present'
    }));

    if (displayList.length === 0) return null;

    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 bg-white dark:bg-zinc-900/50">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 items-center">
                <LucideGraduationCap className="h-5 w-5 text-zinc-400" />
                <span className="ml-3">Education</span>
            </h2>
            <ol className="mt-6 space-y-4">
                {displayList.map((educationItem, educationItemIndex) => (
                    <EducationItem key={educationItemIndex} educationItem={educationItem} />
                ))}
            </ol>
        </div>
    )
}
