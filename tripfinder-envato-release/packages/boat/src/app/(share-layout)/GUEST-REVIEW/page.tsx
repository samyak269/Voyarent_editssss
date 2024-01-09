import GuestReviews from "@/components/guest-reviews/guest-reviews";
import SubscriptionBlock from "@/components/subscription/subscription-block";



export default function page() {
    return (
      <div>
        <GuestReviews/>
        <SubscriptionBlock sectionClassName="4xl:!px-16" />
      </div>
    );
  }