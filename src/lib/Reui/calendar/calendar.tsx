'use client';

import * as React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import cn from '../../utils';
import { buttonVariants } from '../button/buttonVariants';

function Calendar({ className, classNames, showOutsideDays = true, ...props }: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'relative flex flex-row gap-4',
        month: 'w-full',
        month_caption: 'relative mx-10 mb-1 flex h-8 items-center justify-center z-20',
        caption_label: 'text-2xl font-medium',
        nav: 'absolute top-0 flex w-full justify-between z-10',
        button_previous: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 text-[var(--date-picker-btn-color)] hover:text-[var(--date-picker-btn-color-hover)] p-0',
        ),
        button_next: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 text-[var(--date-picker-btn-color)] hover:text-[var(--date-picker-btn-color-hover)] p-0',
        ),
        weekday: 'size-8 p-0 text-2xl font-medium text-[var(--date-picker-weekday-color)]',
        day_button:
          'cursor-pointer font-bold relative flex size-10 items-center justify-center whitespace-nowrap rounded-md p-0 text-[var(--date-picker-day-text-color)] transition-200 group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 group-data-disabled:cursor-not-allowed focus-visible:z-10 hover:not-in-data-selected:bg-[var(--date-picker-day-hover-bg)] group-data-selected:bg-[var(--date-picker-day-selected-bg)] hover:not-in-data-selected:text-[var(--date-picker-day-hover-text-color)] group-data-selected:text-[var(--date-picker-day-selected-text-color)] group-data-disabled:text-[var(--date-picker-day-disabled-text-color)] group-data-disabled:line-through group-data-outside:text-[var(--date-picker-day-outside-text-color)] group-data-selected:group-data-outside:text-[var(--date-picker-day-selected-outside-text-color)] outline-none focus-visible:ring-[var(--date-picker-day-focus-ring-color)] focus-visible:ring-[3px] group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-[.range-middle]:group-data-selected:bg-[var(--date-picker-range-middle-bg)] group-[.range-middle]:group-data-selected:text-[var(--date-picker-range-middle-text-color)]',
        day: 'group size-8 px-0 py-px text-lg',
        range_start: 'range-start',
        range_end: 'range-end',
        range_middle: 'range-middle',
        today:
          '*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 rtl:*:after:translate-x-1/2 *:after:rounded-full *:after:bg-[var(--date-picker-today-indicator-bg)] [&[data-selected]:not(.range-middle)>*]:after:bg-[var(--date-picker-today-indicator-selected-bg)] [&[data-disabled]>*]:after:bg-[var(--date-picker-today-indicator-disabled-bg)] *:after:transition-colors',
        outside: 'text-[var(--date-picker-outside-day-text-color)] data-selected:bg-[var(--date-picker-outside-day-selected-bg)] data-selected:text-[var(--date-picker-outside-day-selected-text-color)]',
        hidden: 'invisible',
        week_number: 'size-8 p-0 text-md font-medium text-[var(--date-picker-week-number-text-color)]',
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === 'left') {
            return <ChevronLeft className="h-4 w-4 rtl:rotate-180" />;
          } else {
            return <ChevronRight className="h-4 w-4 rtl:rotate-180" />;
          }
        },
      }}
      {...props}
    />
  );
}

export { Calendar };
