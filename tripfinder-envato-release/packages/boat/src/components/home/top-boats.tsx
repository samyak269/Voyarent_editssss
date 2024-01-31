'use client';

import ListingCardLoader from '@/components/ui/loader/listing-card-loader';
import ListingCard from '@/components/ui/cards/listing';
import SeeMore from '@/components/ui/see-more';
import Section from '@/components/ui/section';
import { useQuery } from '@tanstack/react-query'

export default function TopBoats() {

  const { isPending, isError, data: query } = useQuery({
    queryKey: ['top-boats'],
    queryFn: async () => {
      const boatInfoResp = await fetch('/api/boats/top-boats')
      const boatInfo = await boatInfoResp.json()
      return boatInfo.data.boats
    }
  })

  if (isPending) return <h1>Loading...</h1>
  if (isError) return <h1>Something went wrong...</h1>

  return (
    <Section
      className="group/section container-fluid mt-12 overflow-hidden lg:mt-16"
      title="Top boat rentals"
      description="Unsatiable it considered invitation he traveling insensible."
      headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
      rightElement={<SeeMore />}
    >
      {!query && <ListingCardLoader />}
      {query && <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
        {query.map((item: any, index: number) => (
          < ListingCard
            key={`top-boat-grid-${index}`} //id
            id={`top-boat-grid-${index}`} //id
            slides={item.imagesUrls} //images
            time={''} // not sure
            caption={item.model_newtext} //model_newtext
            title={item.name} //name
            slug={item.id} //id
            location={item.location.state} // not sure
            price={'$' + item.price}  // boat price
            ratingCount={'not sure rating'} // not sure
            rating={3} // not sure
            user={'sid the greate warrior'} // boat owner may be
          />
        ))}
      </div>
      }
    </Section>
  )
}
