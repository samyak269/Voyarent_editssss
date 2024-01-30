'use client';

import { topBoats } from 'public/data/top-boats';
import { useTimeout } from '@/hooks/use-timeout';
import ListingCardLoader from '@/components/ui/loader/listing-card-loader';
import ListingCard from '@/components/ui/cards/listing';
import SeeMore from '@/components/ui/see-more';
import Section from '@/components/ui/section';
import { useEffect, useState } from 'react';

// (alias) const topBoats: {
//     thumbnail: string[];
//     time: string;
//     caption: string;
//     title: string;
//     slug: string;
//     location: string;
//     price: string;
//     rating: number;
//     ratingCount: string;
//     user: {
//         name: string;
//         avatar: string;
//         slug: string;
//     };
// }[]

function BoatGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {topBoats.slice(0, 8).map((item, index) => (
        <ListingCard
          key={`top-boat-grid-${index}`} //id
          id={`top-boat-grid-${index}`} //id
          slides={item.thumbnail} //images
          time={item.time} // not sure
          caption={item.caption} //model_newtext
          title={item.title} //name
          slug={item.slug} //id
          location={item.location} // not sure
          price={item.price}  // boat price
          ratingCount={item.ratingCount} // not sure
          rating={item.rating} // not sure
          user={item.user} // boat owner may be
        />
      ))}
    </div>
  );
}

export default function TopBoats() {
  const { state } = useTimeout();

  const [topBoats, setTopBoats] = useState(null)

  useEffect(() => {

    fetch('/api/boats/top-boats')
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
        }
      })
      .then((resp) => {
        console.log(resp);
        setTopBoats(resp.data.boats)
      })

  }, [])

  return (
    <Section
      className="group/section container-fluid mt-12 overflow-hidden lg:mt-16"
      title="Top boat rentals"
      description="Unsatiable it considered invitation he traveling insensible."
      headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
      rightElement={<SeeMore />}
    >
      {!state && <ListingCardLoader />}
      {state && <BoatGrid />}
    </Section>
  );
}
