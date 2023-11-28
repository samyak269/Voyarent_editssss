'use client';

import { useState } from 'react';
import clsx from 'clsx';
import DatePicker from 'react-datepicker';
import type { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '@/components/ui/form-fields/input';

const calendarContainerClasses = {
  base: '[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md',
  monthContainer: {
    padding: '[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3',
  },
};

const prevNextButtonClasses = {
  base: '[&.react-datepicker>button]:items-baseline [&.react-datepicker>button]:top-7',
  border:
    '[&.react-datepicker>button]:border [&.react-datepicker>button]:border-solid [&.react-datepicker>button]:border-gray-300 [&.react-datepicker>button]:rounded-md',
  size: '[&.react-datepicker>button]:h-[22px] [&.react-datepicker>button]:w-[22px]',
  children: {
    position: '[&.react-datepicker>button>span]:top-0',
    border:
      '[&.react-datepicker>button>span]:before:border-t-[1.5px] [&.react-datepicker>button>span]:before:border-r-[1.5px] [&.react-datepicker>button>span]:before:border-gray-400',
    size: '[&.react-datepicker>button>span]:before:h-[7px] [&.react-datepicker>button>span]:before:w-[7px]',
  },
};

const timeOnlyClasses = {
  base: '[&.react-datepicker--time-only>div]:pr-0 [&.react-datepicker--time-only>div]:w-full [&.react-datepicker--time-only>div>div]:w-full',
};

export interface DateTimeProps<selectsRange extends boolean | undefined>
  extends Omit<ReactDatePickerProps, 'selectsRange' | 'onChange'> {
  /** Pass function in onChange prop to handle selecting value */
  onChange(
    date: selectsRange extends false | undefined
      ? Date | null
      : [Date | null, Date | null],
    event: React.SyntheticEvent<any> | undefined
  ): void;
  /** Whether range selecting is enabled */
  selectsRange?: selectsRange;
  /** Pass input props to style input */
  startIcon?: React.ReactNode;
  startIconClassName?: string;
  endIcon?: React.ReactNode;
  label?: string;
  error?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

/** We used `react-datepicker` package to build DateTime component.
 * See their [official documentation](https://reactdatepicker.com/) for more info.
 */

const DateTime = ({
  label,
  customInput,
  showPopperArrow = false,
  dateFormat = 'd MMMM yyyy',
  selectsRange = false,
  onCalendarOpen,
  onCalendarClose,
  calendarClassName,
  startIcon,
  startIconClassName,
  endIcon,
  error,
  inputClassName,
  labelClassName,
  className,
  ...props
}: DateTimeProps<boolean>) => {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const handleCalenderOpen = () => setIsCalenderOpen(true);
  const handleCalenderClose = () => setIsCalenderOpen(false);

  return (
    <div className={clsx(className)}>
      <label
        className={clsx(
          'block   text-base font-bold text-gray-dark',
          labelClassName
        )}
      >
        {label}
      </label>
      <DatePicker
        customInput={
          customInput || (
            <Input
              className="mt-0 [&>label>div]:!p-0"
              inputClassName={inputClassName}
              size="DEFAULT"
              startIcon={startIcon}
              startIconClassName={startIconClassName}
              error={error}
            />
          )
        }
        className="mt-2"
        showPopperArrow={showPopperArrow}
        dateFormat={dateFormat}
        selectsRange={selectsRange}
        onCalendarOpen={onCalendarOpen || handleCalenderOpen}
        onCalendarClose={onCalendarClose || handleCalenderClose}
        calendarClassName={clsx(
          calendarContainerClasses.base,
          calendarContainerClasses.monthContainer.padding,
          prevNextButtonClasses.base,
          prevNextButtonClasses.border,
          prevNextButtonClasses.size,
          prevNextButtonClasses.children.position,
          prevNextButtonClasses.children.border,
          prevNextButtonClasses.children.size,
          timeOnlyClasses.base,
          calendarClassName
        )}
        {...props}
      />
    </div>
  );
};

DateTime.displayName = 'DateTime';
export default DateTime;
