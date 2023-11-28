import { vendorData } from 'public/data/listing-details';
import RelatedListingBlock from '@/components/listing-details/related-listings/related-listings-block';
import ListingDetails from '@/components/listing-details/listing-details-block';
import SubscriptionBlock from '@/components/subscription/subscription-block';
import GallaryBlock from '@/components/listing-details/gallary-block';

export default function ListingDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  return (
    <>
      <div className="container-fluid w-full 3xl:!px-12">
        <GallaryBlock images={vendorData.gallary} />
        <ListingDetails />
        <RelatedListingBlock />
      </div>
      <SubscriptionBlock sectionClassName="3xl:!px-12 4xl:!px-12" />
    </>
  );
}
