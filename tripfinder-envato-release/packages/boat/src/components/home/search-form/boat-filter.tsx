'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryParam } from '@/hooks/use-query-param';
import { JetskiBoatIcon } from '@/components/icons/boat-types/jetski-boat';
import { MotorBoatIcon } from '@/components/icons/boat-types/motor-boat';
import { HouseBoatIcon } from '@/components/icons/boat-types/house-boat';
import { RibBoatIcon } from '@/components/icons/boat-types/rib-boat';
import { SailBoatIcon } from '@/components/icons/sail-boat';
import SelectBox from '@/components/ui/select-box';

const types = [
  {
    label: 'Choose boat type',
    icon: <SailBoatIcon className="h-6 w-6 text-gray" />,
    disabled: true,
  },
  {
    label: 'Sail boat',
    icon: <HouseBoatIcon className="h-auto w-5" />,
  },
  {
    label: 'Fishing boat',
    icon: <MotorBoatIcon className="h-auto w-5" />,
  },
  {
    label: 'Bass boat',
    icon: <JetskiBoatIcon className="h-auto w-5" />,
  },
  {
    label: 'Cabin cruiser',
    icon: <RibBoatIcon className="h-auto w-5" />,
  },
  {
    label: 'Dinghies',
    icon: <HouseBoatIcon className="h-auto w-5" />,
  },
];

export default function BoatFilters() {
  const searchParams = useSearchParams();
  const boatType = searchParams?.get('boatType');
  const { clearFilter, updateQueryparams } = useQueryParam();
  const [selected, setSelected] = useState(types[0]);

  return (
    <SelectBox
      value={selected}
      options={types}
      optionIcon={true}
      onChange={(data: any) => setSelected(data)}
      labelClassName="pointer-events-none absolute left-[60px] top-4 z-10 origin-[0] -translate-y-2 scale-75 transform text-gray-dark duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-4 peer-focus:-translate-y-2 peer-focus:scale-90 peer-focus:text-base peer-focus:text-gray 4xl:text-lg"
      buttonClassName=" block w-full appearance-none  rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2 pl-[25px] pt-6 text-sm font-medium text-gray-dark transition duration-200 focus:outline-none focus:ring-0 md:pb-2.5 md:pt-6 md:text-base lg:rounded-xl 3xl:pb-3 3xl:pt-7 3xl:text-lg "
      arrowIconClassName="right-3"
      clearable={selected.disabled ? false : true}
      onClearClick={(e) => {
        e.stopPropagation();
        setSelected(types[0]);
      }}
    />
  );
}
