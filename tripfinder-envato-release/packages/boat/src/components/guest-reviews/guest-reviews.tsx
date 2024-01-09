'use client';

import Text from '@/components/ui/typography/text';

export default function GuestReviews() {
    return (
      <div className="container-fluid w-full !max-w-[1248px] pt-12 lg:pt-20 2xl:pb-8 3xl:px-0 3xl:pt-24">
        <div className="text-center">
        <Text tag="h2" className="text-xl md:!text-2xl xl:!text-3xl">
            GUEST REVIEW
        </Text>
        <br></br>
        <Text tag="h2" className="text-xl md:!text-2xl xl:!text-1xl">
        Write a Review
        </Text>
          <Text className="mt-2 text-sm lg:mt-3">
          After the end of your trip, fill out the questionnaire we will send you.
          <br></br>
          Writing reviews about your trip helps other people choose which cruise ship to charter. If you're writing a review, be sure to mention any features that made your trip unique. If you had a bad experience, be sure to let the owners know what happened. This helps them improve their services and boat listings and attract new customers. It also makes it easier for other guests to find a place where they feel comfortable. Rate the boat, crew, hygiene and locations visited. You also have the option to add photos and videos from your trip. Write your comments and share your impressions and experience with other guests. In this way you will help future guests in their choice as well as the owners to make their services more attractive.
          </Text>
        </div>
        </div>


  );
}
