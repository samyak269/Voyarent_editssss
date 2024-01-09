import Comment from "@/components/owner-comments/comment";
import SubscriptionBlock from "@/components/subscription/subscription-block";



export default function page() {
    return (
      <div>
        <Comment/>
        <SubscriptionBlock sectionClassName="4xl:!px-16" />
      </div>
    );
  }