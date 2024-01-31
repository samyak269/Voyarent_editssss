'use client';

import { useTimeout } from '@/hooks/use-timeout';
import DestinationCarousel from '@/components/home/destination-block/destination-carousel';
import BlockLoader from '@/components/ui/loader/block-loader';
import Section from '@/components/ui/section';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
export default function DestinationBlock() {

  const { data: countries, isError, isPending, error } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await fetch('/api/destinations/destination-carousel')
      const countries = await response.json()
      return countries.destinations
    }
  })

  const [allDestinations, setAllDestinations] = useState<
    {
      id: string;
      name: string;
      slug: string;
      location: string;
      thumbnail: string;
    }[]>([{
      id: '',
      name: '',
      slug: '',
      location: '',
      thumbnail: ''
    }])

  const { state } = useTimeout();

  // useEffect(() => {
  //   fetch('/api/destinations/destination-carousel')
  //     .then((resp) => {
  //       if (resp.ok) {
  //         return resp.json()
  //       } else {
  //         console.log('something went wrong');

  //       }
  //     })
  //     .then((resp) => {
  //       setAllDestinations(resp.destinations)
  //     })
  // }, [])

  return (
    <Section
      title="Top destinations for boat rentals"
      description="Unsatiable it considered invitation he traveling insensible."
      className="lg:container-fluid mt-12 pl-4 sm:pl-6 lg:mt-16"
      headerClassName="mb-4 md:mb-5 xl:mb-6"
    >
      {!state && <BlockLoader />}
      {state && <DestinationCarousel data={allDestinations} />}
    </Section>
  );
}
